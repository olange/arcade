import { html, svg } from 'lit-html';

// function degToRad(deg) {
//   return deg * (Math.PI / 180);
// }

/**
 *
 * @param {Number} size
 * @param {Number} yawnDeg
 */
 function pacman(size, yawnDeg) {
  //let halfRad = degToRad(yawnDeg / 2);
  let halfRad = (yawnDeg / 2) * (Math.PI / 180);
  let c = Math.cos(halfRad);
  let s = Math.sin(halfRad);
  let r = size / 2;
  let sx = r * (1 + c);
  let sy = r * (1 - s);
  let edy = 2 * r * s;
  return svg`<svg>
        <rect width="${size}"height="${size}"/>   
        <path d="M ${sx} ${sy} a ${r} ${r}, 0, 1, 0, 0.0 ${edy} L ${r} ${r} Z" fill="yellow"/>
      </svg>`;
}
