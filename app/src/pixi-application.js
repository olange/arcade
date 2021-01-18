import { LitElement, customElement, html, css } from 'lit-element';

import { Application, Graphics } from 'pixi.js';
import { Circle, Hexagon, Square } from './pixi-shapes.js';

/*
import {
  makeCircle,
  makeHexaGrid,
  makeHexagon,
  makeSquare,
} from './pixi-graphics';

const aw = 1000;
const ah = 600;
const app = new Application({
  width: aw,
  height: ah,
  backgroundColor: 0x304050,
  antialias: true,
  autoDensity: true, // !!!
  resolution: 2,
});

// ---------------------------------------------
// draw circles, squares, hexagons and hexagrids
// ---------------------------------------------

app.stage.addChild(makeCircle(40, 40, 40, 0xff0000));
app.stage.addChild(makeCircle(40, 100, 40, 0x33cc33));

const ss = 80;
app.stage.addChild(makeSquare(0, 0, ss, null, 0xffffff));
app.stage.addChild(makeSquare(0, ah - ss, ss, null, 0xffffff));
app.stage.addChild(makeSquare(aw - ss, ah - ss, ss, null, 0xffffff));
app.stage.addChild(makeSquare(aw - ss, 0, ss, null, 0xffffff));

// ---------------
// draw hexa grids
// ---------------
let r = 40;

for (let hexagon of makeHexaGrid(5, 6, 0, 0, r, true, null, 0x00aa00)) {
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
  0xff0000,
)) {
  app.stage.addChild(hexagon);
}
*/

export class PixiApplication extends Application {
  constructor(options) {
    super({
      ...options,
      antialias: true,
      autoDensity: true, // !!!
      resolution: 2,
    });

    this.renderer.view.style.border = '1px solid #ee0000';

    console.log(
      'PixiApplication renderer.view w h',
      this.renderer.view.width,
      this.renderer.view.height,
      'resolution:',
      this.renderer.resolution,
    );
    console.log(
      'PixiApplication screen w h',
      this.screen.width,
      this.screen.height,
    );
    this.addSquares();
    this.addCircles();
    this.addHexagons();
  }

  addSquares() {
    const ss = 80;
    this.stage.addChild(new Square(0, 0, ss, null, 0xffffff));
    this.stage.addChild(new Square(0, this.screen.height, ss, null, 0xffffff));
    this.stage.addChild(
      new Square(this.screen.width, this.screen.height, ss, null, 0xffffff),
    );
    this.stage.addChild(new Square(this.screen.width, 0, ss, null, 0xffffff));
  }

  addCircles() {
    const r = 8;
    this.stage.addChild(new Circle(0, 0, r, 0xff0000, 0xffffff));
    this.stage.addChild(
      new Circle(0, this.screen.height, r, 0xff0000, 0xffffff),
    );
    this.stage.addChild(
      new Circle(this.screen.width, this.screen.height, r, 0xff0000, 0xffffff),
    );
    this.stage.addChild(
      new Circle(this.screen.width, 0, r, 0xff0000, 0xffffff),
    );
  }

  addHexagons() {
    const side = 40;
    this.stage.addChild(new Hexagon(40, 340, side, true, 0xffaa66, null));
  }
  /*
      // add HexaSprite
  
      this.hexaSprite = new HexaSprite(0, 0, "assets/7-hexagons.png");
      this.stage.addChild(this.hexaSprite);
  
      this.ticker.add((delta) => {
        // delta is 1 if running at 100% performance
        // creates frame-independent transformation
        this.hexaSprite.rotation += 0.02 * delta;
      });
  
      let side = 40;
  
      // add horizontal grid
      let horizontalGrid = new HexaGrid(15, 6, 0, 0, side, false, null, 0x00cc77);
      this.stage.addChild(horizontalGrid);
  
      // add vertical grid
      let verticalGrid = new HexaGrid(
        16,
        4,
        0,
        12 * side,
        side,
        true,
        null,
        0xff5522
      );
      this.stage.addChild(verticalGrid);
  
      let dragHexagons = new DragSnapHexagonCluster(true, 0xff5522);
      this.stage.addChild(dragHexagons);
  
      let dragHexagons3 = new DragSnapHexagonCluster(false, 0x00cc77);
      this.stage.addChild(dragHexagons3);
  
      // add more objects
  
      this.stage.addChild(new Circle(100, 100, 50, 0x222222, 0x778899));
      this.stage.addChild(new DraggableCircle(100, 200, 50, 0x22ff22, 0xffffff));
  
      this.stage.addChild(new Square(200, 100, 100, 0xbbbbbb, 0x778899));
      this.stage.addChild(new DraggableSquare(200, 200, 100, 0xaa2222, 0xffffff));
  
      // this.stage.addChild(new Hexagon(40, 540, 40, true, 0xffffff, 0xff0000));
      // this.stage.addChild(new Hexagon(120, 540, 40, true, 0xffffff, 0x00ff00));
      // this.stage.addChild(new Hexagon(200, 540, 40, true, 0xffffff, 0x0000ff));
  
      // this.stage.addChild(new Hexagon(40, 620, 40, false, 0xff0000, 0xffffff));
      // this.stage.addChild(new Hexagon(120, 620, 40, false, 0x00ff00, 0xffffff));
      // this.stage.addChild(new Hexagon(200, 620, 40, false, 0x0000ff, 0xffffff));
  
      // this.stage.addChild(
      //   new DragSnapHexagon(40, 720, 40, false, 0xff0000, 0xffffff)
      // );
  
      this.stage.addChild(
        new DragSnapHexagon(120, 720, 40, false, 0x0099ff, 0xffffff)
      );
  
      this.stage.addChild(
        new SnappingHexagon(120, 650, 40, false, 0x0099ff, 0xffffff)
      );
  
      this.stage.addChild(
        new DragSnapHexagon(200, 720, 40, true, 0xff00ff, 0xffffff)
      );
  
      this.stage.addChild(
        new SnappingHexagon(280, 720, 40, true, 0xff00ff, 0xffffff)
      );
    }
    */
}
