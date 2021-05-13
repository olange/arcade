// Generated code -- CC0 -- No Rights Reserved -- http://www.redblobgames.com/grids/hexagons/
// NOTE: `Tests` class was extracted from ../src/index.js

import { Point, Hex, OffsetCoord, DoubledCoord, Layout } from '../src/index.js';

class Tests {
  constructor() {}
  static equalHex(name, a, b) {
    if (!(a.q === b.q && a.s === b.s && a.r === b.r)) {
      complain(name);
    }
  }
  static equalOffsetcoord(name, a, b) {
    if (!(a.col === b.col && a.row === b.row)) {
      complain(name);
    }
  }
  static equalDoubledcoord(name, a, b) {
    if (!(a.col === b.col && a.row === b.row)) {
      complain(name);
    }
  }
  static equalInt(name, a, b) {
    if (!(a === b)) {
      complain(name);
    }
  }
  static equalHexArray(name, a, b) {
    Tests.equalInt(name, a.length, b.length);
    for (var i = 0; i < a.length; i++) {
      Tests.equalHex(name, a[i], b[i]);
    }
  }
  static testHexArithmetic() {
    Tests.equalHex(
      'hex_add',
      new Hex(4, -10, 6),
      new Hex(1, -3, 2).add(new Hex(3, -7, 4)),
    );
    Tests.equalHex(
      'hex_subtract',
      new Hex(-2, 4, -2),
      new Hex(1, -3, 2).subtract(new Hex(3, -7, 4)),
    );
  }
  static testHexDirection() {
    Tests.equalHex('hex_direction', new Hex(0, -1, 1), Hex.direction(2));
  }
  static testHexNeighbor() {
    Tests.equalHex(
      'hex_neighbor',
      new Hex(1, -3, 2),
      new Hex(1, -2, 1).neighbor(2),
    );
  }
  static testHexDiagonal() {
    Tests.equalHex(
      'hex_diagonal',
      new Hex(-1, -1, 2),
      new Hex(1, -2, 1).diagonalNeighbor(3),
    );
  }
  static testHexDistance() {
    Tests.equalInt(
      'hex_distance',
      7,
      new Hex(3, -7, 4).distance(new Hex(0, 0, 0)),
    );
  }
  static testHexRotateRight() {
    Tests.equalHex(
      'hex_rotate_right',
      new Hex(1, -3, 2).rotateRight(),
      new Hex(3, -2, -1),
    );
  }
  static testHexRotateLeft() {
    Tests.equalHex(
      'hex_rotate_left',
      new Hex(1, -3, 2).rotateLeft(),
      new Hex(-2, -1, 3),
    );
  }
  static testHexRound() {
    var a = new Hex(0.0, 0.0, 0.0);
    var b = new Hex(1.0, -1.0, 0.0);
    var c = new Hex(0.0, -1.0, 1.0);
    Tests.equalHex(
      'hex_round 1',
      new Hex(5, -10, 5),
      new Hex(0.0, 0.0, 0.0).lerp(new Hex(10.0, -20.0, 10.0), 0.5).round(),
    );
    Tests.equalHex('hex_round 2', a.round(), a.lerp(b, 0.499).round());
    Tests.equalHex('hex_round 3', b.round(), a.lerp(b, 0.501).round());
    Tests.equalHex(
      'hex_round 4',
      a.round(),
      new Hex(
        a.q * 0.4 + b.q * 0.3 + c.q * 0.3,
        a.r * 0.4 + b.r * 0.3 + c.r * 0.3,
        a.s * 0.4 + b.s * 0.3 + c.s * 0.3,
      ).round(),
    );
    Tests.equalHex(
      'hex_round 5',
      c.round(),
      new Hex(
        a.q * 0.3 + b.q * 0.3 + c.q * 0.4,
        a.r * 0.3 + b.r * 0.3 + c.r * 0.4,
        a.s * 0.3 + b.s * 0.3 + c.s * 0.4,
      ).round(),
    );
  }
  static testHexLinedraw() {
    Tests.equalHexArray(
      'hex_linedraw',
      [
        new Hex(0, 0, 0),
        new Hex(0, -1, 1),
        new Hex(0, -2, 2),
        new Hex(1, -3, 2),
        new Hex(1, -4, 3),
        new Hex(1, -5, 4),
      ],
      new Hex(0, 0, 0).linedraw(new Hex(1, -5, 4)),
    );
  }
  static testLayout() {
    var h = new Hex(3, 4, -7);
    var flat = new Layout(
      Layout.flat,
      new Point(10.0, 15.0),
      new Point(35.0, 71.0),
    );
    Tests.equalHex('layout', h, flat.pixelToHex(flat.hexToPixel(h)).round());
    var pointy = new Layout(
      Layout.pointy,
      new Point(10.0, 15.0),
      new Point(35.0, 71.0),
    );
    Tests.equalHex(
      'layout',
      h,
      pointy.pixelToHex(pointy.hexToPixel(h)).round(),
    );
  }
  static testOffsetRoundtrip() {
    var a = new Hex(3, 4, -7);
    var b = new OffsetCoord(1, -3);
    Tests.equalHex(
      'conversion_roundtrip even-q',
      a,
      OffsetCoord.qoffsetToCube(
        OffsetCoord.EVEN,
        OffsetCoord.qoffsetFromCube(OffsetCoord.EVEN, a),
      ),
    );
    Tests.equalOffsetcoord(
      'conversion_roundtrip even-q',
      b,
      OffsetCoord.qoffsetFromCube(
        OffsetCoord.EVEN,
        OffsetCoord.qoffsetToCube(OffsetCoord.EVEN, b),
      ),
    );
    Tests.equalHex(
      'conversion_roundtrip odd-q',
      a,
      OffsetCoord.qoffsetToCube(
        OffsetCoord.ODD,
        OffsetCoord.qoffsetFromCube(OffsetCoord.ODD, a),
      ),
    );
    Tests.equalOffsetcoord(
      'conversion_roundtrip odd-q',
      b,
      OffsetCoord.qoffsetFromCube(
        OffsetCoord.ODD,
        OffsetCoord.qoffsetToCube(OffsetCoord.ODD, b),
      ),
    );
    Tests.equalHex(
      'conversion_roundtrip even-r',
      a,
      OffsetCoord.roffsetToCube(
        OffsetCoord.EVEN,
        OffsetCoord.roffsetFromCube(OffsetCoord.EVEN, a),
      ),
    );
    Tests.equalOffsetcoord(
      'conversion_roundtrip even-r',
      b,
      OffsetCoord.roffsetFromCube(
        OffsetCoord.EVEN,
        OffsetCoord.roffsetToCube(OffsetCoord.EVEN, b),
      ),
    );
    Tests.equalHex(
      'conversion_roundtrip odd-r',
      a,
      OffsetCoord.roffsetToCube(
        OffsetCoord.ODD,
        OffsetCoord.roffsetFromCube(OffsetCoord.ODD, a),
      ),
    );
    Tests.equalOffsetcoord(
      'conversion_roundtrip odd-r',
      b,
      OffsetCoord.roffsetFromCube(
        OffsetCoord.ODD,
        OffsetCoord.roffsetToCube(OffsetCoord.ODD, b),
      ),
    );
  }
  static testOffsetFromCube() {
    Tests.equalOffsetcoord(
      'offset_from_cube even-q',
      new OffsetCoord(1, 3),
      OffsetCoord.qoffsetFromCube(OffsetCoord.EVEN, new Hex(1, 2, -3)),
    );
    Tests.equalOffsetcoord(
      'offset_from_cube odd-q',
      new OffsetCoord(1, 2),
      OffsetCoord.qoffsetFromCube(OffsetCoord.ODD, new Hex(1, 2, -3)),
    );
  }
  static testOffsetToCube() {
    Tests.equalHex(
      'offset_to_cube even-',
      new Hex(1, 2, -3),
      OffsetCoord.qoffsetToCube(OffsetCoord.EVEN, new OffsetCoord(1, 3)),
    );
    Tests.equalHex(
      'offset_to_cube odd-q',
      new Hex(1, 2, -3),
      OffsetCoord.qoffsetToCube(OffsetCoord.ODD, new OffsetCoord(1, 2)),
    );
  }
  static testDoubledRoundtrip() {
    var a = new Hex(3, 4, -7);
    var b = new DoubledCoord(1, -3);
    Tests.equalHex(
      'conversion_roundtrip doubled-q',
      a,
      DoubledCoord.qdoubledFromCube(a).qdoubledToCube(),
    );
    Tests.equalDoubledcoord(
      'conversion_roundtrip doubled-q',
      b,
      DoubledCoord.qdoubledFromCube(b.qdoubledToCube()),
    );
    Tests.equalHex(
      'conversion_roundtrip doubled-r',
      a,
      DoubledCoord.rdoubledFromCube(a).rdoubledToCube(),
    );
    Tests.equalDoubledcoord(
      'conversion_roundtrip doubled-r',
      b,
      DoubledCoord.rdoubledFromCube(b.rdoubledToCube()),
    );
  }
  static testDoubledFromCube() {
    Tests.equalDoubledcoord(
      'doubled_from_cube doubled-q',
      new DoubledCoord(1, 5),
      DoubledCoord.qdoubledFromCube(new Hex(1, 2, -3)),
    );
    Tests.equalDoubledcoord(
      'doubled_from_cube doubled-r',
      new DoubledCoord(4, 2),
      DoubledCoord.rdoubledFromCube(new Hex(1, 2, -3)),
    );
  }
  static testDoubledToCube() {
    Tests.equalHex(
      'doubled_to_cube doubled-q',
      new Hex(1, 2, -3),
      new DoubledCoord(1, 5).qdoubledToCube(),
    );
    Tests.equalHex(
      'doubled_to_cube doubled-r',
      new Hex(1, 2, -3),
      new DoubledCoord(4, 2).rdoubledToCube(),
    );
  }
  static testAll() {
    Tests.testHexArithmetic();
    Tests.testHexDirection();
    Tests.testHexNeighbor();
    Tests.testHexDiagonal();
    Tests.testHexDistance();
    Tests.testHexRotateRight();
    Tests.testHexRotateLeft();
    Tests.testHexRound();
    Tests.testHexLinedraw();
    Tests.testLayout();
    Tests.testOffsetRoundtrip();
    Tests.testOffsetFromCube();
    Tests.testOffsetToCube();
    Tests.testDoubledRoundtrip();
    Tests.testDoubledFromCube();
    Tests.testDoubledToCube();
  }
}

// Tests
function complain(name) {
  console.log('FAIL', name);
}

Tests.testAll();