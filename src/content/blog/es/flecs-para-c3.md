---
title: 'Llevar Flecs a C3'
description: 'Lo que tomó construir bindings idiomáticos de C3 para el entity component system Flecs, y por qué la librería incluye sus propias fuentes C.'
pubDate: 2026-11-05
lang: es
translation: flecs-bindings-for-c3
tags: ['C3', 'Flecs', 'ECS', 'programación de sistemas']
---

[C3](https://c3-lang.org/) es un lenguaje de sistemas moderno con slices, módulos, genéricos en tiempo de compilación y una ABI compatible con C. [Flecs](https://www.flecs.dev) es un entity component system rápido escrito en C. Ponerlos juntos sonaba a un ejercicio de bindings de fin de semana. Terminó siendo una lección de diseño de APIs.

El resultado es **flecsC3**: bindings idiomáticos de C3 para Flecs 4.1.6. La librería incluye las fuentes C amalgamadas de Flecs, así que un proyecto puede depender de ella sin instalar Flecs de forma global.

## ¿Por qué bindings y no llamadas C directas?

Puedes llamar C desde C3 directamente. Ese no es el problema. El problema es que el código resultante parece C con sintaxis de C3 encima: IDs de tipo manuales, punteros inseguros por todas partes y queries construidas con strings o macros.

C3 nos da mejores herramientas. Los componentes son structs normales. Los slices llevan longitud. Los genéricos y alias en tiempo de compilación permiten que el binding infiera una query a partir de los tipos de parámetro de un callback de sistema. La meta era que esto se leyera como C3:

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

La llamada a `system` recibe la función directamente. El binding lee los dos parámetros slice, infiere que el sistema necesita `Position` y `Velocity`, y registra la query. Sin cadenas de builder, sin arrays de términos manuales.

## Qué cubre el binding

La superficie de la API es amplia a propósito, no un wrapper mínimo. Incluye mundos, componentes, pares, queries, iteración, sistemas, observers, eventos, prefabs, timers, el pipeline, JSON, reflexión, scripts, métricas, alertas, unidades, el servidor REST y logging.

Esa amplitud importa porque Flecs no es solo un contenedor de arrays. Sus pares y relaciones, prefabs y pipelines son la razón por la que la gente lo elige. Un binding que solo soportara `add`, `get` y un loop de query obligaría a los usuarios a volver a C para todo lo interesante.

Los tipos de componente se registran de forma lazy y se cachean por mundo, así que el mismo struct de C3 se puede usar en varios mundos. La iteración entrega arrays de campos tipados:

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

## Las partes difíciles

Las macros de C no se mapean limpiamente a C3. Flecs usa macros para registrar componentes, declarar queries y algunas APIs de conveniencia. Cada una tuvo que convertirse en función, alias o construcción en tiempo de compilación con el mismo comportamiento.

Los nombres fueron el segundo problema. Los módulos de C3 y Flecs usan nombres cortos y genéricos. El binding tiene que mantener la API de C reconocible mientras hace que el lado de C3 se sienta nativo. La división actual es un tipo `World` con métodos, más helpers a nivel de módulo para cosas que de verdad son funciones libres.

El tercer problema fue el empaquetado. Flecs normalmente se compila como parte de la aplicación, con opciones en tiempo de compilación que cambian la ABI. El binding incluye `flecs.c` amalgamado y lo compila junto al proyecto de C3, lo que mantiene la dependencia autocontenida pero exige un compilador de C en el `PATH`.

La memoria y los tiempos de vida siguen siendo C. El binding hace el camino común más seguro, pero no pretende ser una API con garbage collector. `defer` es tu amigo.

## Estado

flecsC3 requiere `c3c` 0.8.x o superior y un compilador de C. Agrégalo al search path de dependencias de tu proyecto, lista `flecs` como dependencia y corre `c3c run`.

Es open source y sigue evolucionando: [github.com/MiguelCock/flecsC3](https://github.com/MiguelCock/flecsC3). El README tiene la tabla completa de la API y un ejemplo de quickstart. Si usas C3 y quieres un ECS sin escribir pegamento en C, esto es para ti.
