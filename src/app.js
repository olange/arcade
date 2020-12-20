import { AppCircles } from "./app-circles.js";
import { TextButton } from "./buttons.js";

PIXI.utils.sayHello();

// ------------------------------
// Prepare replaceCurrentApp
// ------------------------------

let currentApp = null;

function replaceCurrentApp(name) {
  console.log("replaceApp", name);

  if (currentApp) {
    currentApp.stop();
    currentApp.destroy(true, true);
    currentApp = null;
  }
  console.log("replaceApp", currentApp);

  if (name == "one") {
    currentApp = new AppCircles({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  } else {
    currentApp = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x336699,
    });
    const style = new PIXI.TextStyle({
      fontFamily: "Helvetica",
      fill: ["white", "orange"],
    });
    const text = new PIXI.Text("Watch This Space", style);
    text.x = window.innerWidth / 2;
    text.y = window.innerHeight / 2;
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

// add currentApp next
replaceCurrentApp("one");
