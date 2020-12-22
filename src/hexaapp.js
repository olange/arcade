import {
  Circle2,
  Square,
  makeHexaGrid,
  DragHexagons,
  Hexagon0,
  DraggableHexagon2,
} from "./hexagons.js";

// PIXI.utils.sayHello();
// Create the application
const app = new PIXI.Application({
  width: 800,
  height: 800,
  backgroundColor: 0xcccccc,
  antialias: true,
});

// // Add the view to the DOM
// document.body.appendChild(app.view);

class HexaSprite extends PIXI.Sprite {
  constructor(x, y, imageFilePath) {
    super(PIXI.Texture.from(imageFilePath));

    this.anchor.set(0.5);
    this.x = x;
    this.y = y;
  }
}

// let hexa = RotatingSprite.from("assets/7-hexagons.png");
// app.stage.addChild(hexa);

export class HexaApplication extends PIXI.Application {
  constructor(options) {
    super({
      ...options,
      antialias: true,
      autoDensity: true, // !!!
      resolution: 2,
    });

    //this.renderer.plugins.interaction.moveWhenInside = true; // NBG!

    this.hexaSprite = new HexaSprite(0, 0, "assets/7-hexagons.png");
    this.stage.addChild(this.hexaSprite);

    // this.stage.addChild(makeHexagon(0, 0, 40, false, 0xffffff, 0xff0000));

    let r = 40;

    // horizontal
    for (let hexagon of makeHexaGrid(15, 8, 0, 0, r, false, null, 0xffaa00)) {
      //console.log("hexagon", hexagon);
      this.stage.addChild(hexagon);
    }
    // vertical
    for (let hexagon of makeHexaGrid(
      16,
      3,
      0 * r,
      15 * r,
      r,
      true,
      null,
      0x00ff00
    )) {
      this.stage.addChild(hexagon);
    }

    app.ticker.add((delta) => {
      // delta is 1 if running at 100% performance
      // creates frame-independent transformation
      this.hexaSprite.rotation += 0.02 * delta;
    });

    let dragHexagons = new DragHexagons();
    this.stage.addChild(dragHexagons);

    let circle2 = new Circle2(100, 200, 100, 0x222222, 0x778899);
    this.stage.addChild(circle2);

    this.stage.addChild(new Square(100, 400, 80, 0xbbbbbb, 0x778899));

    this.stage.addChild(new Hexagon0(40, 540, 40, true, 0xffffff, 0xff0000));
    this.stage.addChild(new Hexagon0(120, 540, 40, true, 0xffffff, 0x00ff00));
    this.stage.addChild(new Hexagon0(200, 540, 40, true, 0xffffff, 0x0000ff));

    this.stage.addChild(new Hexagon0(40, 620, 40, false, 0xff0000, 0xffffff));
    this.stage.addChild(new Hexagon0(120, 620, 40, false, 0x00ff00, 0xffffff));
    this.stage.addChild(new Hexagon0(200, 620, 40, false, 0x0000ff, 0xffffff));

    this.stage.addChild(
      new DraggableHexagon2(40, 720, 40, false, 0xff0000, 0xffffff)
    );
  }
}

//========================================================================
// draw circles

//===================================
// draw squares

//========================================================================
// draw hexagons

//========================================================================
// draw hexa grids

let r = 40;

// vertical
for (let hexagon of makeHexaGrid(5, 6, 0, 0, r, true, null, 0x0000aa)) {
  app.stage.addChild(hexagon);
}

// horizontal
for (let hexagon of makeHexaGrid(
  6,
  5,
  10 * r,
  0,
  r,
  false,
  0xffa500,
  0xff0000
)) {
  app.stage.addChild(hexagon);
}
