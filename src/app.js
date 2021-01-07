import { HexaApplication } from "./hexaapp.js";
import { AppCircles } from "./app-circles.js";
import { TextButton, CircleButton3 } from "./buttons.js";

PIXI.utils.sayHello();

// -------------------------
// Define DefaultApplication
// -------------------------

class DefaultApplication extends PIXI.Application {
  constructor(options) {
    super(options);
    console.log("DefaultApplication", options);

    let style = new PIXI.TextStyle({
      fontFamily: "Helvetica",
      fill: ["white", "orange"],
    });
    const text = new PIXI.Text("Watch This Space ...", style);
    text.x = options.width / 2;
    text.y = options.height / 2;
    text.anchor.set(0.5);
    this.stage.addChild(text);
  }
}

// ----------------------
// Define MenuApplication
// ----------------------

class MenuApplication extends PIXI.Application {
  constructor(options) {
    super(options);
    console.log("MenuApplication", options);

    this.replaceCurrent = this.replaceCurrent.bind(this);
    this.currentApp = null;

    this.addButtons();
  }
  replaceCurrent(name) {
    console.log("MenuApplication.replaceCurrent", name);

    const w = window.innerWidth;
    const h = window.innerHeight;

    // destroy the currennt application
    if (this.currentApp) {
      this.currentApp.stop();
      this.currentApp.destroy(true, true);
      this.currentApp = null;
    }

    if (name == "one" || name == "five") {
      this.currentApp = new AppCircles({
        width: w,
        height: h,
      });
    } else if (name == "two" || name == "four") {
      this.currentApp = new HexaApplication({
        width: w,
        height: h,
        backgroundColor: 0x223344,
        antialias: true,
      });
    } else {
      this.currentApp = new DefaultApplication({
        width: w,
        height: h,
        backgroundColor: 0x336699,
      });
    }
    document.body.appendChild(this.currentApp.view);
  }

  addButtons() {
    this.stage.addChild(new TextButton(this.replaceCurrent, 60, 30, "one"));
    this.stage.addChild(new TextButton(this.replaceCurrent, 120, 30, "two"));
    this.stage.addChild(new TextButton(this.replaceCurrent, 180, 30, "three"));
    this.stage.addChild(new TextButton(this.replaceCurrent, 240, 30, "four"));
    this.stage.addChild(
      new CircleButton3(
        this.replaceCurrent,
        320,
        30,
        15,
        0xffffff,
        0x000000,
        "five"
      )
    );
  }
}

// --------------------------
// Create the menuApplication
// --------------------------

const menuApplication = new MenuApplication({
  width: window.innerWidth,
  height: 60,
});
// add menuApplication first
document.body.appendChild(menuApplication.view);

// add currentApp next
menuApplication.replaceCurrent("two");
