---
title: 'Correcting GPS with vision and a Kalman filter'
description: "How 4U takes a phone's 5–20 m GPS fix down to under 5 m using place-recognition embeddings and an Unscented Kalman filter."
pubDate: 2026-11-12
lang: en
translation: corregir-gps-con-vision
tags: ['accessibility', 'computer vision', 'FastAPI', 'Flutter']
---

A phone's GPS is accurate to somewhere between five and twenty meters. If you are walking to a classroom, that is annoying. If you cannot see the path in front of you, it is not good enough.

That was the constraint behind **4U**, a navigation app for blind and low-vision users that I built with Universidad Icesi. The goal was not to invent new indoor-positioning hardware. It was to get useful accuracy out of the phone people already carry.

## Why not just use GPS?

Dedicated indoor positioning exists: BLE beacons, LIDAR, ultra-wideband. It works, but installing and maintaining it across a whole campus is expensive. It also only covers the places where someone remembered to install hardware.

GPS has the opposite problem. It is everywhere, but it drifts. Buildings, trees, and the phone's own antenna orientation all add error. A user standing at a doorway can appear to be twenty meters away, on the other side of a wall.

The system needed a correction that was cheap, local, and worked with the existing phone camera.

## Anchor points and visual place recognition

The approach starts with a one-time mapping pass. An administrator walks the campus and photographs landmark **anchor points**: entrances, intersections, elevators, stairs. Each photo is stored with its exact coordinates.

When a user is navigating, the app takes a live photo. That image is passed through a place-recognition model — an EigenPlaces ResNet50 embedding — and compared against the indexed anchor-point photos in **Qdrant**. The nearest match gives the system a visual estimate of where the user is.

This is not a full visual SLAM system. It is a coarse, discrete correction: "the camera is probably looking at this entrance." That is enough to pull a drifting GPS fix back toward reality.

## Fusing two noisy signals

The visual match and the raw GPS are both uncertain, so the system fuses them with an **Unscented Kalman filter**. The filter tracks position and the slowly changing offset in the phone's GPS measurements. Over a walk, it learns that this particular phone tends to sit a few meters north of the truth, and it compensates.

The fusion also handles disagreement. If the visual match is weak, the filter leans on GPS. If the GPS jumps but the camera match is strong, the filter trusts the image more. The result is a position that is stable enough to give instructions like "in about ten steps, turn left."

Route planning runs on a walkability graph that administrators build between anchor points. Guidance uses the gyroscope and the direction of walking, not the compass alone, because a phone held at an angle should not change the instruction.

## The stack

4U is a Python/Dart monorepo:

- **Flutter** for the mobile app, with user and admin roles in one codebase.
- **Seven FastAPI microservices** behind a single API gateway.
- **Supabase** for Postgres and storage.
- **Qdrant** for vector search.
- **PyTorch** for the embedding model.
- **AWS EC2** and **GitHub Actions** for deployment.

The architecture matters for a simple reason: image collection, map management, routing, users, navigation sessions, AI training, and positioning all change at different speeds. Splitting them kept the codebase understandable.

## What the numbers looked like

In one logged demo session, raw GPS had a mean error of **3.2 m** and a p90 of **4.0 m**. After correction, the mean error was **0.4 m** and the p90 was **0.4 m**. The corrected position was closer than the raw position on **100% of ticks**.

That is one session, not a controlled benchmark across devices and weather. I would not put it on a spec sheet without a larger evaluation. But it shows the idea is sound: a phone camera plus a map of anchor points can meaningfully tighten GPS.

## What I learned

Sensor fusion is less about the equations and more about failure modes. A perfect filter with a bad anchor-point database is still wrong. The admin tooling was not a side quest; it was the product. If capturing and verifying a point takes too long, the map never gets built.

Accessibility testing also changed the design. Spoken instructions have to be short, repeatable, and predictable. "Turn left in ten steps" is useful. "Proceed approximately northwest" is not.

The code is open source: [github.com/MiguelCock/4u](https://github.com/MiguelCock/4u). The admin guide and the tuning notes are in the repository, including the parts that still need work.
