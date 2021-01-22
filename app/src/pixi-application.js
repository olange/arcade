import { LitElement, customElement, html, css } from 'lit-element';

import { Application, Graphics } from 'pixi.js';
import {
  Circle,
  Hexagon,
  HexagonCR,
  HexagonCRKeyboard,
  Square,
} from './pixi-shapes.js';

import { HexagonCRGrid } from './pixi-hexagrids.js';

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

    const hexagonSide = 20;

    this.addSquares();
    this.addCircles();

    const vertical = false;
    this.addHexagons(hexagonSide, vertical);
    this.addHexagonCRGrid(hexagonSide, vertical);
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

  addHexagons(side, vertical) {
    this.stage.addChild(new Hexagon(0, 0, side, vertical, 0xffaa66, null));
    // this.stage.addChild(new Hexagon(300, 50, side, vertical, 0xffaa66, null));

    this.stage.addChild(new HexagonCR(3, 1, side, vertical, 0x00aa66, null));
    this.stage.addChild(new HexagonCR(3, 2, side, vertical, 0x00aa66, null));
    this.stage.addChild(new HexagonCR(3, 3, side, vertical, 0x00aa66, null));
    this.stage.addChild(new HexagonCR(3, 4, side, vertical, 0x00aa66, null));
    this.stage.addChild(new HexagonCR(4, 4, side, vertical, 0x00aa66, null));
    this.stage.addChild(new HexagonCR(5, 4, side, vertical, 0x00aa66, null));

    this.stage.addChild(
      new HexagonCRKeyboard(7, 7, side, vertical, 0xaabbcc, null),
    );
  }

  addHexagonCRGrid(hexagonSide, vertical) {
    this.stage.addChild(
      new HexagonCRGrid(20, 20, hexagonSide, vertical, null, 0xff00ff),
    );
  }
}
