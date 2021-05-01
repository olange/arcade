import {
  Point,
  Hex,
  OffsetCoord,
  DoubledCoord,
  Orientation,
  Layout,
} from './lib-module.js';

const point1 = new Point(3, 7);
console.log('point1=', point1);

const hex1 = new Hex(5, 2, -7);
console.log('hex1=', hex1);

try {
  const hex2 = new Hex(5, 2, 0);
} catch (error) {
  console.error('hex2:', error);
}

console.log('Hex.directions=', Hex.directions);

const offsetCoord1 = new OffsetCoord(9, 5);
console.log('offsetCoord1=', offsetCoord1);

const doubledCoord1 = new DoubledCoord(3, 4);
console.log('doubledCoord1=', doubledCoord1);

const orientation0 = new Orientation();
console.log('orientation0=', orientation0);

console.log('Layout.pointy=', Layout.pointy);
console.log('Layout.flat=', Layout.flat);

const layout1 = new Layout(Layout.pointy, new Point(100, 100), new Point(0, 0));
console.log('layout1=', layout1);

const hex11 = layout1.pixelToHex(new Point(100, 100));
console.log('hex11=', hex11);

// static testLayout() {
//     var h = new Hex(3, 4, -7);
//     var flat = new Layout(
//       Layout.flat,
//       new Point(10.0, 15.0),
//       new Point(35.0, 71.0),
//     );
//     Tests.equalHex('layout', h, flat.pixelToHex(flat.hexToPixel(h)).round());
//     var pointy = new Layout(
//       Layout.pointy,
//       new Point(10.0, 15.0),
//       new Point(35.0, 71.0),
//     );
//     Tests.equalHex(
//       'layout',
//       h,
//       pointy.pixelToHex(pointy.hexToPixel(h)).round(),
//     );
//   }

const flat = new Layout(
  Layout.flat,
  new Point(10.0, 10.0),
  new Point(0.0, 0.0),
);

const h1 = new Hex(0, 0, 0);
const p1 = flat.hexToPixel(h1);
const h2 = flat.pixelToHex(p1).round();

console.log('flat=', flat);

console.log('h1=', h1);
console.log('p1=', p1);
console.log('h2=', h2);

const pc1 = flat.polygonCorners(h1);
console.log('pc1=', pc1);

/**
 * @param options.col
 * @param options.row
 * @param options.size - pixels
 * @param options.vertical
 * @returns hexagon center Point (pixels)
 */
function hexagonCenter(options) {
  const offcoor = new OffsetCoord(options.row, options.col);

  const cube = options.vertical
    ? OffsetCoord.roffsetToCube(OffsetCoord.ODD, offcoor)
    : OffsetCoord.qoffsetToCube(OffsetCoord.ODD, offcoor);

  const layout = new Layout(
    options.vertical ? Layout.pointy : Layout.flat,
    new Point(options.size, options.size),
    new Point(0, 0),
  );
  return layout.hexToPixel(cube);
}

function testHexagonCenter(options) {
  const point = hexagonCenter(options);
  console.log(options, point);
}

testHexagonCenter({ col: 0, row: 0, size: 10, vertical: true });
testHexagonCenter({ col: 0, row: 1, size: 10, vertical: true });
testHexagonCenter({ col: 1, row: 0, size: 10, vertical: true });

testHexagonCenter({ col: 0, row: 0, size: 10, vertical: false });
testHexagonCenter({ col: 0, row: 1, size: 10, vertical: false });
testHexagonCenter({ col: 1, row: 0, size: 10, vertical: false });

/**
 * A possible pattern:
 * . expand class FixedLayout adding various transformation methods
 * . in app, instantiate a FixedLayout instance
 * . and let various creation and action methods call that instance's methods
 * . to performm transformations
 */

/**
 * @param options.size - pixels
 * @param options.vertical
 */
class FixedLayout extends Layout {
  constructor(options) {
    super(
      options.vertical ? Layout.pointy : Layout.flat,
      new Point(options.size, options.size),
      new Point(0, 0), // origin
    );
  }

  /**
   * @param options.col
   * @param options.row
   * @returns hexagon center Point (pixels)
   */
  hexagonCenter(options) {
    const offsetCoord = new OffsetCoord(options.row, options.col);
    const cube = options.vertical
      ? OffsetCoord.roffsetToCube(OffsetCoord.ODD, offsetCoord)
      : OffsetCoord.qoffsetToCube(OffsetCoord.ODD, offsetCoord);
    return this.hexToPixel(cube);
  }
}

let horizontalLayout = new FixedLayout({ vertical: false, size: 100 });
console.log('horizontalLayout=', horizontalLayout);
{
  let hexColRow = { col: 0, row: 0 };
  let hexCenter = horizontalLayout.hexagonCenter(hexColRow);
  console.log('hexColRow=', hexColRow, 'hexCenter=', hexCenter);
}
{
  let hexColRow = { col: 0, row: 1 };
  let hexCenter = horizontalLayout.hexagonCenter(hexColRow);
  console.log('hexColRow=', hexColRow, 'hexCenter=', hexCenter);
}
{
  let hexColRow = { col: 1, row: 0 };
  let hexCenter = horizontalLayout.hexagonCenter(hexColRow);
  console.log('hexColRow=', hexColRow, 'hexCenter=', hexCenter);
}
{
  let hexColRow = { col: 1, row: 1 };
  let hexCenter = horizontalLayout.hexagonCenter(hexColRow);
  console.log('hexColRow=', hexColRow, 'hexCenter=', hexCenter);
}
