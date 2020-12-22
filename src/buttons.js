/**
 * Create a text button
 * @param x, y: position of the button center
 * @param text: button text
 * @param fncButtonUp(text): callback on buttonUp
 *
 * Usage example:
 *  app.stage.addChild(
 *      new TextButton(350, 30, "five", (text) => console.log(text))
 *  );
 */
export class TextButton extends PIXI.Text {
  constructor(x, y, text, fncButtonUp) {
    super(text, {
      font: "bold 32px Roboto",
      fill: "#e74c3c",
    });
    this.x = x;
    this.y = y;
    this.fncButtonUp = fncButtonUp;

    this.anchor.set(0.5);
    this.interactive = true;
    this.buttonMode = true;
    this.on("pointerdown", this.onButtonDown)
      .on("pointerup", this.onButtonUp)
      .on("pointerupoutside", this.onButtonUp)
      .on("pointerover", this.onButtonOver)
      .on("pointerout", this.onButtonOut);
  }

  onButtonDown() {
    this.isdown = true;
    this.alpha = 0.8;
    //console.log("down");
  }

  onButtonUp() {
    this.isdown = false;
    this.alpha = 1.0;
    //console.log("up", this.text);
    if (typeof this.fncButtonUp === "function") {
      this.fncButtonUp(this.text);
    }
  }

  onButtonOver() {
    this.isOver = true;
    this.alpha = 0.8;
    //console.log("over");
  }

  onButtonOut() {
    this.isOver = false;
    this.alpha = 1.0;
    //console.log("out");
  }
}

/**
 * Displays the text
 */
export class Text extends PIXI.Text {
  constructor(x, y, text) {
    super(text, {
      font: "bold 32px Helvetica",
      fill: "#0077ff",
    });
    this.x = x;
    this.y = y;
  }
}

/**
 * Provides pushbutton behavior for subclasses
 * On buttonUp calls fncButtonUp
 */
export let PushbuttonMixin = (superclass) =>
  class extends superclass {
    constructor(onClick, ...rest) {
      //console.log("PushbuttonMixin", ...arguments);
      super(...rest);
      this.onClick = onClick;
      try {
        this.anchor.set(0.5);
      } catch (error) {}
      this.interactive = true;
      this.buttonMode = true;
      this.on("click", this.onButtonUp);
    }

    onButtonDown() {
      this.isdown = true;
      this.alpha = 0.8;
      //console.log("down");
    }

    onButtonUp() {
      this.isdown = false;
      this.alpha = 1.0;
      //console.log("up", this.text);
      if (typeof this.onClick === "function") {
        this.onClick(this.text);
      }
    }

    onButtonOver() {
      this.isOver = true;
      this.alpha = 0.8;
      //console.log("over");
    }

    onButtonOut() {
      this.isOver = false;
      this.alpha = 1.0;
      //console.log("out");
    }
  };

/**
 * Displays a text pushbutton
 * On click calls onClick
 */
export class TextButton2 extends PushbuttonMixin(Text) {
  constructor(onClick, x, y, text) {
    //console.log("TextButton2", ...arguments);
    super(...arguments);
  }
}

/**
 * Displays a circle
 */
export class Circle3 extends PIXI.Graphics {
  constructor(x, y, radius, fillcolor, strokecolor) {
    super();
    this.lineStyle(1, strokecolor);
    this.beginFill(fillcolor, 1.0);
    this.drawCircle(x, y, radius);
    this.endFill();
  }
}

/**
 * Displays a circle pushbutton
 * On click calls onClick
 */
export class CircleButton3 extends PushbuttonMixin(Circle3) {
  constructor(onClick, x, y, radius, fillcolor, strokecolor) {
    //console.log("CircleButton3", ...arguments);
    super(...arguments);
  }
}
