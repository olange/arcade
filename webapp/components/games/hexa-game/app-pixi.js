import * as PIXI from 'pixi.js';

import { RotatingSprite } from './sprites.js';
import { CircleButton, TextButton } from './buttons.js';
import { HexagonGrid, HexagonGroupFromLayout } from './hexagrids-and-groups.js';

import {
  HexagonCRKeyboard,
  CircleOnHexagonCRKeyboard,
  RotatingSpriteOnHexagonCRKeyboard,
} from './shapes.js';
import { Circle, Hexagon, Square } from './shapes.js';

/**
 * Creates an Application
 * @param {*} options - standard PIXI.Application options
 */
export class AppPixi extends PIXI.Application {
  constructor(options) {
    super(options);
    console.log(`AppPixi › options`, options);

    this.gridVisible = true;
    this.vertical = true;

    this.addSprites(options);

    const hexagonSide = 30;
    this.addHexagonGrids(hexagonSide, options);
    this.addKeyboardMovableShapes(hexagonSide);
    this.addHexagonGroups(hexagonSide);
    this.addButtons(options);

    this.updateHexagonCollections();

    this.addShapeSamples();
  }

  addSprites(options) {
    const sprite1 = new RotatingSprite({
      x: 0,
      y: 0,
      imageURL: '/assets/open-wc-logo-180x180.png',
    });
    this.stage.addChild(sprite1);
    this.ticker.add(() => sprite1.rotate(0.01));
  }

  addButtons(options) {
    const button1 = new TextButton({
      onClick: (text) => {
        //console.log(text);
        this.gridVisible = !this.gridVisible;
        this.updateHexagonCollections();
      },
      x: options.width - 50,
      y: 50,
      text: 'grid',
    });
    this.stage.addChild(button1);

    const button2 = new TextButton({
      onClick: (text) => {
        //console.log(text);
        this.vertical = !this.vertical;
        this.updateHexagonCollections();
      },
      x: options.width - 50,
      y: 100,
      text: 'v/h',
    });
    this.stage.addChild(button2);

    const button3 = new CircleButton({
      onClick: (text) => {
        console.log('button3', text);
      },
      x: options.width - 50,
      y: 150,
      radius: 20,
      text: 'demo',
      fillcolor: '0xbb0000',
    });
    this.stage.addChild(button3);
  }

  addHexagonGrids(hexagonSide, options) {
    this.gridVert = new HexagonGrid({
      //   cols: 20,
      //   rows: 20,
      width: options.width,
      height: options.height,
      side: hexagonSide,
      vertical: true,
      fillcolor: null,
      strokecolor: 0xff00ff,
    });
    this.gridHor = new HexagonGrid({
      //   cols: 22,
      //   rows: 20,
      width: options.width,
      height: options.height,
      side: hexagonSide,
      vertical: false,
      fillcolor: null,
      strokecolor: 0xffff00,
    });
  }

  addKeyboardMovableShapes(hexagonSide) {
    this.verticalMovableHexagon = new HexagonCRKeyboard({
      col: 7,
      row: 5,
      side: hexagonSide,
      vertical: true,
      strokecolor: 0xaa0000,
      fillcolor: 0xaa0000,
    });
    this.horizontalMovableHexagon = new HexagonCRKeyboard({
      col: 7,
      row: 5,
      side: hexagonSide,
      vertical: false,
      strokecolor: 0xaa0000,
      fillcolor: 0xaa0000,
    });

    this.verticalMovableCircle = new CircleOnHexagonCRKeyboard({
      col: 9,
      row: 5,
      side: hexagonSide,
      radius: 20,
      vertical: true,
      strokecolor: 0xaa0000,
      fillcolor: 0xaa0000,
    });
    this.horizontalMovableCircle = new CircleOnHexagonCRKeyboard({
      col: 9,
      row: 5,
      side: hexagonSide,
      radius: 20,
      vertical: false,
      strokecolor: 0xaa0000,
      fillcolor: 0xaa0000,
    });

    this.verticalMovableRotatingSprite = new RotatingSpriteOnHexagonCRKeyboard({
      col: 11,
      row: 5,
      side: hexagonSide,
      vertical: true,
      imageURL: '/assets/open-wc-logo-180x180.png',
      size: 40,
    });
    this.ticker.add(() => this.verticalMovableRotatingSprite.rotate(0.01));
    this.horizontalMovableRotatingSprite = new RotatingSpriteOnHexagonCRKeyboard(
      {
        col: 11,
        row: 5,
        side: hexagonSide,
        vertical: false,
        imageURL: '/assets/open-wc-logo-180x180.png',
        size: 40,
      },
    );
    this.ticker.add(() => this.horizontalMovableRotatingSprite.rotate(0.01));
  }

  addHexagonGroups(hexagonSide) {
    this.hexagonGroupVertical = new HexagonGroupFromLayout({
      side: hexagonSide,
      vertical: true,
      fillcolor: 0x009900,
    });
    this.hexagonGroupHorizontal = new HexagonGroupFromLayout({
      side: hexagonSide,
      vertical: false,
      fillcolor: 0x0000ff,
    });
  }

  addShapeSamples() {
    const circle = new Circle({
      x: 100,
      y: 400,
      radius: 50,
      fillcolor: 0x00ff00,
      strokecolor: 0xffffff,
    });
    this.stage.addChild(circle);

    const square = new Square({
      x: 100,
      y: 400,
      side: 88,
      fillcolor: 0x000000,
      strokecolor: 0xffff00,
    });
    this.stage.addChild(square);

    const hexagon = new Hexagon({
      x: 100,
      y: 400,
      side: 50,
      vertical: true,
      fillcolor: 0x770000,
      strokecolor: 0x99ff00,
    });
    this.stage.addChild(hexagon);
  }

  /**
   * switch grid visibility and hexagon orientations (v/h)
   */
  updateHexagonCollections() {
    if (this.gridVisible) {
      if (this.vertical) {
        this.stage.removeChild(this.gridHor);
        this.stage.addChild(this.gridVert);
      } else {
        this.stage.removeChild(this.gridVert);
        this.stage.addChild(this.gridHor);
      }
    } else {
      this.stage.removeChild(this.gridVert);
      this.stage.removeChild(this.gridHor);
    }
    if (this.vertical) {
      this.stage.removeChild(this.hexagonGroupHorizontal);
      this.stage.addChild(this.hexagonGroupVertical);
    } else {
      this.stage.removeChild(this.hexagonGroupVertical);
      this.stage.addChild(this.hexagonGroupHorizontal);
    }
    if (this.vertical) {
      this.stage.removeChild(this.horizontalMovableHexagon);
      this.stage.addChild(this.verticalMovableHexagon);
      this.stage.removeChild(this.horizontalMovableCircle);
      this.stage.addChild(this.verticalMovableCircle);
      this.stage.removeChild(this.horizontalMovableRotatingSprite);
      this.stage.addChild(this.verticalMovableRotatingSprite);
    } else {
      this.stage.removeChild(this.verticalMovableHexagon);
      this.stage.addChild(this.horizontalMovableHexagon);
      this.stage.removeChild(this.verticalMovableCircle);
      this.stage.addChild(this.horizontalMovableCircle);
      this.stage.removeChild(this.verticalMovableRotatingSprite);
      this.stage.addChild(this.horizontalMovableRotatingSprite);
    }

    //horizontalMovableRotatingSprite
  }
}
