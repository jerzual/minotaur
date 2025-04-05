# Minotaur

![Minotaur logo](https://github.com/jerzual/minotaur/raw/master/src/images/minotaur.gif 'Logo Title Text 1')

An attempt at making an old school dungeon crawler.

## Features

- A procedurally generated labyrinth, composed of rooms and corridors.
- Rooms, are combat arenas, corridors are rest/peaceful spaces.
- The goal is to kill the final boss.
- You only have magic spells and small melee weapons.
- Isometric view, with a hand-drawn look.
- Items and loot are randomly placed in the dungeon.
- Metroid-vania style, you can't access all the dungeon at the beginning.

## Technical stuff

Like a lot of my projects the main goal here is to experiment with technology and  paradigms.
Here is what I was playing with this project :

- Browser 3D thanks to WebGL and Three.js.
- React for the game UI, whatever works for the 3D scene.
- Local-first, no backend, no server, everything is stored in the browser.

## Graphics

I really love how the hand-drawn look from [ways.unseen](https://linktr.ee/ways.unseen) looks, and I'll try to get something similar.

See these for inspiration :
- <https://www.threads.net/@ways.unseen/post/C8R69AWN6_b>
- <https://www.threads.net/@ways.unseen/post/DBD_KtzN6KF>

Design rule : black and white, with a touch of red for health bar and decoration.

## Current Progress

There's a dungeon generator in place, also first draft of UI/ Three.js renderer. Nothing fixed in stone.

