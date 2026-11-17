---
title: 'Bringing Flecs to C3'
description: 'What it took to build idiomatic C3 bindings for the Flecs entity component system, and why the library bundles its own C sources.'
pubDate: 2026-11-05
lang: en
translation: flecs-para-c3
tags: ['C3', 'Flecs', 'ECS', 'systems programming']
---

[C3](https://c3-lang.org/) is a modern systems language with slices, modules, compile-time generics, and a familiar C ABI. [Flecs](https://www.flecs.dev) is a fast entity component system written in C. Putting them together sounded like a weekend binding exercise. It turned into a lesson in API design.

The result is **flecsC3**: idiomatic C3 bindings for Flecs 4.1.6. The library bundles the amalgamated Flecs C sources, so a project can depend on it without installing Flecs system-wide.

## Why bindings instead of raw C calls?

You can call C from C3 directly. That is not the problem. The problem is that the resulting code looks like C with C3 syntax sprinkled on top: manual type IDs, unsafe pointers everywhere, and query construction through strings or macros.

C3 gives us better tools. Components are ordinary structs. Slices carry length. Compile-time generics and aliases let the binding infer a query from a system callback's parameter types. The goal was to make this read like C3:

```c3
import flecs;

struct Position { float x; float y; }
struct Velocity { float x; float y; }

fn void move(Position[] pos, Velocity[] vel)
{
    foreach (i, &p : pos)
    {
        p.x += vel[i].x;
        p.y += vel[i].y;
    }
}

fn int main()
{
    World world = flecs::create();
    defer world.fini();

    Entity e = world.entity("player");
    world.add(Position, e);
    world.set(Velocity, e, { .x = 1, .y = 2 });
    world.set(Position, e, { .x = 0, .y = 0 });

    world.system("Move", &move);
    world.progress(0);

    Position* p = world.get(Position, e);
    io::printfn("(%.1f, %.1f)", p.x, p.y);

    Query q = world.query_expr("Position, Velocity");
    defer q.fini();
    return 0;
}
```

The `system` call takes the function directly. The binding reads the two slice parameters, infers that the system needs `Position` and `Velocity`, and registers the query. No builder chain, no manual term array.

## What the binding covers

The API surface is deliberately broad rather than a minimal wrapper. It includes worlds, components, pairs, queries, iteration, systems, observers, events, prefabs, timers, the pipeline, JSON, reflection, scripts, metrics, alerts, units, the REST server, and logging.

That breadth matters because Flecs is not just a container of arrays. Its pairs and relationships, prefabs, and pipelines are the reason people choose it. A binding that only supports `add`, `get` and a query loop would force users back into C for everything interesting.

Component types are registered lazily and cached per world, so the same C3 struct can be used across multiple worlds. Iteration yields typed field arrays:

```c3
Iter it = q.iter(&world);
while (it.next())
{
    Position* p = it.field(Position, 0);
    foreach (idx, entity : it.entities())
    {
        p[idx].x += 1;
    }
}
```

## The hard parts

C macros do not map cleanly to C3. Flecs uses macros for component registration, query declarations and some convenience APIs. Each one had to become a function, an alias, or a compile-time construct with the same behavior.

Naming was the second problem. C3 modules and Flecs both use short, generic names. The binding has to keep the C API recognizable while making the C3 side feel native. The current split is a `World` type with methods, plus module-level helpers for things that are genuinely free functions.

The third problem was packaging. Flecs is normally built as part of the application, with compile-time options that change the ABI. The binding bundles the amalgamated `flecs.c` and compiles it alongside the C3 project, which keeps the dependency self-contained but means the build needs a C compiler on `PATH`.

Memory and lifetimes are still C. The binding makes the common path safer, but it does not pretend to be a garbage-collected API. `defer` is your friend.

## Status

flecsC3 requires `c3c` 0.8.x or newer and a C compiler. Add it to your project's dependency search path, list `flecs` as a dependency, and run `c3c run`.

It is open source and still evolving: [github.com/MiguelCock/flecsC3](https://github.com/MiguelCock/flecsC3). The README has the full API table and a quickstart example. If you use C3 and want an ECS without writing C glue, this is for you.
