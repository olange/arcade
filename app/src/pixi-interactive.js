export let HexaKeyboardMixin = (superclass) =>
  class extends superclass {
    constructor(...rest) {
      console.log('HexaKeyboardMixin', ...arguments);
      super(...rest);

      // enable interactive mode and hand cursor on hover
      this.interactive = true;
      this.buttonMode = true;

      this.enablekeyboardEvents();
    }

    // https://github.com/Nazariglez/pixi-keyboard/blob/master/src/KeyboardManager.ts
    enablekeyboardEvents() {
      window.addEventListener('keydown', this.onKeyDown.bind(this), true);
      window.addEventListener('keyup', this.onKeyUp.bind(this), true);
    }

    onKeyDown(key) {
      //console.log('HexaKeyboardMixin.onKeyDown', key.code);

      const code = key.code;
      // 6 keys around "KeyG"
      const codesHandled = ['KeyF', 'KeyT', 'KeyY', 'KeyH', 'KeyB', 'KeyV'];

      if (codesHandled.includes(code)) {
        if (key.cancelable) {
          // stop propagation of keyboard event
          key.preventDefault();
        }

        console.log('HexaKeyboardMixin.onKeyDown', key.code);
      }
    }

    onKeyUp(key) {
      //console.log('HexaKeyboardMixin.onKeyUp', key.code);
    }
  };
