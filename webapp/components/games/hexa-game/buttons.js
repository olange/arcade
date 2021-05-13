import * as PIXI from 'pixi.js';
import { Circle } from './shapes.js';

/**
 * Provides onClick behavior for subclasses
 * On click event calls onClick(text)
 *
 * @param {*} options.onClick - callback(text)
 * @param {*} options.* - other arguments for the superclass
 */
export let ClickMixin = (superclass) =>
  class extends superclass {
    constructor(options) {
      //console.log("ClickMixin", options);
      super(options);
      this.interactive = true;
      this.buttonMode = true;

      // IN arcade ONLY THIS DOES NOT RESPOND
      this.on('click', () => {
        console.log('ClickMixin', 'click');
        options.onClick(this.text);
      });

      this.on('pointerdown', () => {
        console.log('ClickMixin', 'pointerdown');
        options.onClick(this.text);
      });
    }
  };

/**
 * Displays the text
 */
export class Text extends PIXI.Text {
  constructor(options) {
    super(options.text, {
      font: 'bold 32px Helvetica',
      fill: '#0077ff',
    });
    this.anchor.set(0.5);
    this.x = options.x;
    this.y = options.y;
  }
}

/**
 * Creates a text pushbutton
 * On click event calls onClick
 * @param {*} options.onClick - callback(text)
 * @param {*} options.x - center.x
 * @param {*} options.y - center.y
 * @param {*} options.text - button text + identifier in callback
 */
export class TextButton extends ClickMixin(Text) {
  constructor(options) {
    console.log('TextButton', options);
    super(options);
  }
}

/**
 * Creates a circle pushbutton
 * On click event calls onClick
 *
 * @param {*} options.onClick - callback()
 * @param {*} options.x
 * @param {*} options.y
 * @param {*} options.radius
 * @param {*} options.fillcolor
 * @param {*} options.strokecolor
 */
export class CircleButton extends ClickMixin(Circle) {
  constructor(options) {
    console.log('CircleButton', options);
    super(options);
  }
}
