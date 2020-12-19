/**
 * Create a text button
 * @param x, y: position of the button center
 * @param text: button text
 * @param fncButtonUp(text): callback on button up
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
