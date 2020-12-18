PIXI.utils.sayHello();
// Create the application
const app = new PIXI.Application({
  width: 600,
  height: 400,
});

// Add the view to the DOM
document.body.appendChild(app.view);

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
