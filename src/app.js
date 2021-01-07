import { HexaApplication } from "./hexaapp.js";
import { AppCircles } from "./app-circles.js";
import { TextButton, CircleButton3 } from "./buttons.js";

PIXI.utils.sayHello();

// -----------------------------
// Define the DefaultApplication
// -----------------------------

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

// ------------------------------
// Prepare replaceCurrentApp
// ------------------------------

let currentApp = null;

function replaceCurrentApp(name) {
  console.log("replaceCurrentApp", name);
  const w = window.innerWidth;
  const h = window.innerHeight;

  // destroy the currennt application
  if (currentApp) {
    currentApp.stop();
    currentApp.destroy(true, true);
    currentApp = null;
  }

  if (name == "one") {
    // create AppCircles
    currentApp = new AppCircles({
      width: w,
      height: h,
    });
  } else if (name == "two" || name == "four") {
    // create HexaApplication
    currentApp = new HexaApplication({
      width: w,
      height: h,
      backgroundColor: 0x223344,
      antialias: true,
    });
  } else {
    // create the DefaultApplication
    currentApp = new DefaultApplication({
      width: w,
      height: h,
      backgroundColor: 0x336699,
    });
  }
  document.body.appendChild(currentApp.view);
}

// --------------------------
// Create the menuApplication
// --------------------------

const menuApplication = new PIXI.Application({
  width: window.innerWidth,
  height: 60,
});
// add menuApplication first
document.body.appendChild(menuApplication.view);

menuApplication.stage.addChild(
  new TextButton(replaceCurrentApp, 60, 30, "one")
);

menuApplication.stage.addChild(
  new TextButton(replaceCurrentApp, 120, 30, "two")
);

menuApplication.stage.addChild(
  new TextButton(replaceCurrentApp, 180, 30, "three")
);

menuApplication.stage.addChild(
  new TextButton(replaceCurrentApp, 240, 30, "four")
);

menuApplication.stage.addChild(
  new CircleButton3(replaceCurrentApp, 320, 30, 15, 0xffffff, 0x000000, "five")
);

// add currentApp next
replaceCurrentApp("two");
