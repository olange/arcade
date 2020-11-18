import { html, svg } from 'lit-html';

/**
 *
 * @param { Number } cx
 * @param { NUmber } cy
 * @param { String } r
 */
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
 * @param { Number } size
 */
export function squareX(size) {
  return svg`<g>
    <defs>
        <clipPath id="clip-shape" clipPathUnits="objectBoundingBox">
            <polygon points="0 1, 0 0, 1 0, 1 1" />
        </clipPath>
    </defs>
    <g style="clip-path: url(#clip-shape); stroke:dodgerblue; stroke-width:3;" >
        <rect width="${size}" height="${size}" style="fill:black; "/>
        <path d="M0,0 L${size},${size} M${size},0 L0,${size} "/>
    </g>
        </g>`;
}

/**
 *
 * @param { Number } size
 * @param { String } text
 */
export function squareText(size, text) {
  return svg`<g>
        <rect width="${size}" height="${size}" fill="black"
         />
        <text fill="white" x="${size/2}" y="${size/2}"
   text-anchor="middle" alignment-baseline="central" >${text}</text>
    </g>`;
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
  let ts = size * 0.1;
  let sx = r * (1 + c);
  let sy = r * (1 - s);
  let edy = 2 * r * s;
  return svg`<svg>
          <rect width="${size}" height="${size}"/>
          <path transform="translate(${ts} ${ts})"  d="M ${sx} ${sy} a ${r} ${r}, 0, 1, 0, 0.0 ${edy} L ${r} ${r} Z" fill="yellow"/>
        </svg>`;
}
