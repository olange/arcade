import { Hex, OffsetCoord, Point } from './redblobgames-lib-module.js';

/**
 * Adds movement on a hexgonal grid controlled by keys
 * For vertical (odd-r) grids: keys HZTFVB
 * For horizontal (odd-q) grids: keys ASDYXC
 *
 * @param {*} superclass
 */
export let HexaKeyboardMixin = (superclass) =>
  class extends superclass {
    constructor(col, row, side, vertical, ...rest) {
      console.log('HexaKeyboardMixin', col, row, side, vertical, ...rest);
      super(col, row, side, vertical, ...rest);

      this.vertical = vertical;
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
      const codesHandled = this.vertical
        ? ['KeyH', 'KeyY', 'KeyT', 'KeyF', 'KeyV', 'KeyB']
        : ['KeyC', 'KeyD', 'KeyS', 'KeyA', 'KeyZ', 'KeyX'];

      if (codesHandled.includes(code)) {
        if (key.cancelable) {
          // stop propagation of keyboard event
          key.preventDefault();
        }

        console.log('HexaKeyboardMixin.onKeyDown', key.code);

        let current = new OffsetCoord(this.col, this.row);
        let cube = this.vertical
          ? OffsetCoord.roffsetToCube(OffsetCoord.ODD, current)
          : OffsetCoord.qoffsetToCube(OffsetCoord.ODD, current);
        let direction = codesHandled.indexOf(code);
        let neighbor = cube.neighbor(direction);
        let next = this.vertical
          ? OffsetCoord.roffsetFromCube(OffsetCoord.ODD, neighbor)
          : OffsetCoord.qoffsetFromCube(OffsetCoord.ODD, neighbor);

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
