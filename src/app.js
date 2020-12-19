import { TextButton } from "./buttons.js";

PIXI.utils.sayHello();

// Create the application
const app = new PIXI.Application({
  width: 600,
  height: 400,
});

// Create the buttons application
const appButtons = new PIXI.Application({
  width: 600,
  height: 60,
});

// Add the views to the DOM
document.body.appendChild(appButtons.view);
document.body.appendChild(app.view);

// ---------------------------------------
// app

// add display objects, like a sprite:

let hexa = PIXI.Sprite.from("assets/7-hexagons.png");
app.stage.addChild(hexa);
hexa.anchor.set(0.5);
hexa.x = 0;
hexa.y = 0;

// start animating
animate();
function animate() {
  requestAnimationFrame(animate);

  // rotate the sprite
  hexa.rotation += 0.02;

  // render the container
  app.renderer.render(app.stage);
}

// ---------------------------------------
// appButtons

function textButtonUp(text) {
  console.log(text);
}

appButtons.stage.addChild(
  new TextButton(60, 30, "one", (text) => console.log(text))
);

appButtons.stage.addChild(
  new TextButton(120, 30, "two", (text) => console.log(text))
);
var textButton3 = new TextButton(180, 30, "three", textButtonUp);
var textButton4 = new TextButton(240, 30, "four", (text) => console.log(text));

appButtons.stage.addChild(textButton3);
appButtons.stage.addChild(textButton4);
appButtons.stage.addChild(
  new TextButton(300, 30, "five", (text) => console.log(text))
);
