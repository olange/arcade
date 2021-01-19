import { Hex, OffsetCoord, Point } from './redblobgames-lib-module.js';

/**
 * Adds movement on a hexgonal grid controlled by keys HZTFVB
 * For vertical (odd-r) grids
 *
 * @param {*} superclass
 */
export let HexaKeyboardMixin = (superclass) =>
  class extends superclass {
    constructor(col, row, side, vertical, ...rest) {
      console.log('HexaKeyboardMixin', col, row, side, vertical, ...rest);
      super(col, row, side, vertical, ...rest);

      if (!vertical) {
        throw 'vertical grid only supported';
      }

      this.col = col;
      this.row = row;

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
      // 6 keys around "KeyG", per US layout
      const codesHandled = ['KeyH', 'KeyY', 'KeyT', 'KeyF', 'KeyV', 'KeyB'];

      if (codesHandled.includes(code)) {
        if (key.cancelable) {
          // stop propagation of keyboard event
          key.preventDefault();
        }

        console.log('HexaKeyboardMixin.onKeyDown', key.code);

        let current = new OffsetCoord(this.col, this.row);
        let cube = OffsetCoord.roffsetToCube(-1, current);
        let direction = codesHandled.indexOf(code);
        let neighbor = cube.neighbor(direction);
        let next = OffsetCoord.roffsetFromCube(-1, neighbor);

        this.setDiscreteHexPosition(next.col, next.row);

        console.log(
          'HexaKeyboardMixin.onKeyDown',
          key.code,
          direction,
          next.col,
          next.row,
        );
      }
    }

    onKeyUp(key) {
      //console.log('HexaKeyboardMixin.onKeyUp', key.code);
    }
  };
