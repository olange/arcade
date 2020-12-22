import { HexaApplication } from "./hexaapp.js";

PIXI.utils.sayHello();

import { AppCircles } from "./app-circles.js";
import { TextButton, TextButton2, CircleButton3 } from "./buttons.js";

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
  console.log("replaceCurrentApp currentApp=", currentApp);

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
    // create the default application
    currentApp = new PIXI.Application({
      width: w,
      height: h,
      backgroundColor: 0x336699,
    });
    const style = new PIXI.TextStyle({
      fontFamily: "Helvetica",
      fill: ["white", "orange"],
    });
    const text = new PIXI.Text("Watch This Space", style);
    text.x = w / 2;
    text.y = h / 2;
    text.anchor.set(0.5);
    currentApp.stage.addChild(text);
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
  new TextButton(60, 30, "one", replaceCurrentApp)
);

menuApplication.stage.addChild(
  new TextButton(120, 30, "two", replaceCurrentApp)
);

menuApplication.stage.addChild(
  new TextButton(180, 30, "three", replaceCurrentApp)
);

menuApplication.stage.addChild(
  new TextButton2(replaceCurrentApp, 240, 30, "four")
);

menuApplication.stage.addChild(
  new CircleButton3(replaceCurrentApp, 320, 30, 15, 0xffffff, 0x000000, "five")
);

// add currentApp next
replaceCurrentApp("two");
