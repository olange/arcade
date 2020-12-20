import {
  makeCircle,
  makeSquare,
  makeHexagon,
  makeHexaGrid,
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

    this.hexaSprite = new HexaSprite(0, 0, "assets/7-hexagons.png");
    this.stage.addChild(this.hexaSprite);

    //this.stage.addChild(makeHexagon(40, 440, 40, true, 0xffffff, 0xff0000));

    let r = 40;

    for (let hexagon of makeHexaGrid(15, 9, 0, 0, r, true, null, 0xffaa00)) {
      //console.log("hexagon", hexagon);
      this.stage.addChild(hexagon);
    }
    for (let hexagon of makeHexaGrid(
      16,
      3,
      0 * r,
      15 * r,
      r,
      false,
      0xffa500,
      0xff0000
    )) {
      this.stage.addChild(hexagon);
    }

    app.ticker.add((delta) => {
      // delta is 1 if running at 100% performance
      // creates frame-independent transformation
      this.hexaSprite.rotation += 0.02 * delta;
    });
  }
}

//========================================================================
// draw circles

app.stage.addChild(makeCircle(40, 600, 40));

//===================================
// draw squares

app.stage.addChild(makeSquare(100, 560, 80));

//========================================================================
// draw hexagons

app.stage.addChild(makeHexagon(40, 440, 40, true, 0xffffff, 0xff0000));
app.stage.addChild(makeHexagon(120, 440, 40, true, 0xffffff, 0x00ff00));
app.stage.addChild(makeHexagon(200, 440, 40, true, 0xffffff, 0x0000ff));

app.stage.addChild(makeHexagon(40, 520, 40, false, 0xff0000, 0xffffff));
app.stage.addChild(makeHexagon(120, 520, 40, false, 0x00ff00, 0xffffff));
app.stage.addChild(makeHexagon(200, 520, 40, false, 0x0000ff, 0xffffff));

//========================================================================
// draw hexa grids

let r = 40;

for (let hexagon of makeHexaGrid(5, 6, 0, 0, r, true, null, 0x0000aa)) {
  app.stage.addChild(hexagon);
}
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
