# Explore PIXI v5

## Objectives

1. draw a hexagonal grid OK
2. add interactions and animations OK
3. find code patterns for using and/or extending PIXI

## View

    1. launch a server, e.g. python -m http.server 9000
    2. or, in VSCode, install and launch extension LivePreview

## Features

`export class TextButton extends PIXI.Text`

Useable as a pushbutton, potentially also draggable.

`export class AppCircles extends PIXI.Application`

Animation morphed from [ES6 + PIXI.JS TEST by Yutaka Moriya](https://codepen.io/yutakam80/pen/EVodQJ),
added class AppCircles.

`menuApplication = new PIXI.Application`

Lets the user swap between two (potentially more) PIXI Applications.

Draggable hexagons and Hexagrids inspired by [Dragable hexagon by pixi.js by zeakd](https://codepen.io/zeakd/pen/NdMBgB).
