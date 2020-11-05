import { html, svg } from 'lit-html';

/**
 *
 * @param { Number } cx
 * @param { NUmber } cy
 * @param { String } r
 */
export function circle0(cx, cy, r) {
  return svg`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" style="stroke:green; stroke-width: 2;"/>`;
}
export function circle(size, color) {
  let r = size / 2;
  let cx = r;
  let cy = r;

  return svg`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/>`;
}

/**
 *
 * @param { Number } size
 * @param { String } fillColor
 */
export function square(size, fillColor) {
  return svg`<rect width="${size}" height="${size}" fill="${fillColor}"/>`;
}

/**
 *
 * @param {Number} size
 * @param {Number} yawnDeg
 */
export function pacman(size, yawnDeg) {
  //let halfRad = degToRad(yawnDeg / 2);
  let halfRad = (yawnDeg / 2) * (Math.PI / 180);
  let c = Math.cos(halfRad);
  let s = Math.sin(halfRad);
  let r = size * 0.4;
  let ts = size * 0.1
  let sx = r * (1 + c);
  let sy = r * (1 - s);
  let edy = 2 * r * s;
  return svg`<svg>
          <rect width="${size}" height="${size}"/>
          <path transform="translate(${ts} ${ts})"  d="M ${sx} ${sy} a ${r} ${r}, 0, 1, 0, 0.0 ${edy} L ${r} ${r} Z" fill="yellow"/>
        </svg>`;
}
