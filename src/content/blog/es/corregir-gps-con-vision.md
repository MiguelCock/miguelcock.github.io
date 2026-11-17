---
title: 'Corregir el GPS con visión y un filtro de Kalman'
description: 'Cómo 4U lleva un GPS de 5–20 m a menos de 5 m usando embeddings de reconocimiento de lugares y un filtro de Kalman unscented.'
pubDate: 2026-11-12
lang: es
translation: correcting-gps-with-vision
tags: ['accesibilidad', 'visión por computador', 'FastAPI', 'Flutter']
---

El GPS de un teléfono tiene un error de entre cinco y veinte metros. Si vas caminando a un salón de clase, es molesto. Si no puedes ver el camino frente a ti, no es suficientemente bueno.

Esa fue la restricción detrás de **4U**, una app de navegación para personas ciegas y con baja visión que construí con la Universidad Icesi. El objetivo no era inventar hardware nuevo de posicionamiento indoor. Era sacar precisión útil del teléfono que la gente ya lleva en el bolsillo.

## ¿Por qué no usar solo el GPS?

El posicionamiento indoor dedicado existe: beacons BLE, LIDAR, ultra-wideband. Funciona, pero instalar y mantener eso en un campus completo es caro. Además, solo cubre los lugares donde alguien se acordó de instalar hardware.

El GPS tiene el problema contrario. Está en todas partes, pero se desvía. Los edificios, los árboles y la orientación de la antena del teléfono agregan error. Una persona parada en una puerta puede aparecer a veinte metros, al otro lado de una pared.

La corrección tenía que ser barata, local y funcionar con la cámara que el teléfono ya tiene.

## Puntos ancla y reconocimiento visual de lugares

El enfoque empieza con un levantamiento de información una sola vez. Un administrador camina el campus y fotografía **puntos ancla**: entradas, intersecciones, ascensores, escaleras. Cada foto se guarda con sus coordenadas exactas.

Cuando el usuario navega, la app toma una foto en vivo. Esa imagen pasa por un modelo de reconocimiento de lugares —un embedding EigenPlaces con ResNet50— y se compara contra las fotos de puntos ancla indexadas en **Qdrant**. La coincidencia más cercana le da al sistema una estimación visual de dónde está el usuario.

No es un sistema completo de SLAM visual. Es una corrección discreta y gruesa: "la cámara probablemente está mirando esta entrada". Con eso basta para jalar un GPS que se está desviando de vuelta hacia la realidad.

## Fusionar dos señales ruidosas

La coincidencia visual y el GPS crudo son inciertos, así que el sistema los fusiona con un **filtro de Kalman unscented**. El filtro sigue la posición y el offset que cambia lentamente en las mediciones del teléfono. A lo largo de una caminata aprende que ese teléfono particular tiende a estar unos metros al norte de la verdad, y lo compensa.

La fusión también maneja el desacuerdo. Si la coincidencia visual es débil, el filtro se apoya en el GPS. Si el GPS salta pero la cámara coincide con fuerza, confía más en la imagen. El resultado es una posición lo suficientemente estable para dar instrucciones como "en unos diez pasos, gira a la izquierda".

La planeación de rutas corre sobre un grafo de caminabilidad que los administradores construyen entre puntos ancla. La guía usa el giroscopio y la dirección de caminata, no solo la brújula, porque un teléfono inclinado no debería cambiar la instrucción.

## El stack

4U es un monorepo de Python y Dart:

- **Flutter** para la app móvil, con roles de usuario y administrador en un solo código.
- **Siete microservicios FastAPI** detrás de un único API gateway.
- **Supabase** para Postgres y almacenamiento.
- **Qdrant** para búsqueda vectorial.
- **PyTorch** para el modelo de embeddings.
- **AWS EC2** y **GitHub Actions** para el despliegue.

La arquitectura importa por una razón simple: la recolección de imágenes, la gestión del mapa, las rutas, los usuarios, las sesiones, el entrenamiento y el posicionamiento cambian a velocidades distintas. Separarlos mantuvo el código entendible.

## Cómo se vieron los números

En una sesión de demo registrada, el GPS crudo tuvo un error medio de **3,2 m** y un p90 de **4,0 m**. Después de la corrección, el error medio fue de **0,4 m** y el p90 de **0,4 m**. La posición corregida estuvo más cerca que la cruda en el **100% de los ticks**.

Eso es una sesión, no un benchmark controlado entre dispositivos y climas. No lo pondría en una ficha técnica sin una evaluación más grande. Pero muestra que la idea funciona: una cámara de teléfono más un mapa de puntos ancla puede apretar bastante el GPS.

## Lo que aprendí

La fusión de sensores se trata menos de las ecuaciones y más de los modos de falla. Un filtro perfecto con una base de puntos ancla mala sigue estando mal. Las herramientas de administración no eran un side quest; eran el producto. Si capturar y verificar un punto toma demasiado tiempo, el mapa nunca se construye.

Las pruebas de accesibilidad también cambiaron el diseño. Las instrucciones habladas tienen que ser cortas, repetibles y predecibles. "Gira a la izquierda en diez pasos" sirve. "Continúa aproximadamente al noroeste" no.

El código es open source: [github.com/MiguelCock/4u](https://github.com/MiguelCock/4u). La guía de administración y las notas de tuning están en el repositorio, incluidas las partes que todavía necesitan trabajo.
