import * as PIXI from 'pixi.js';

/**
 * Creates a rotating sprite
 * @param {*} options.x - center.x
 * @param {*} options.y - center.y
 * @param {*} options.imageUrl
 */
export class RotatingSprite extends PIXI.Sprite {
  constructor(options) {
    console.log(`RotatingSprite`, options);
    super(PIXI.Texture.from(options.imageURL));
    this.x = options.x;
    this.y = options.y;
    this.anchor.set(0.5);
    if (options.size !== undefined) {
      this.width = options.size;
      this.height = options.size;
    }
  }
  rotate(delta) {
    this.rotation += delta;
  }
}
