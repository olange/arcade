import { html } from 'lit-html';

export const hexaicon = html` <svg
  style="background-color: lightgreen"
  viewBox="0 0 500 500"
>
  <defs>
    <g id="hexa" stroke-width="20" fill-opacity="0">
      <path d="M 75,0 L 37.5,65 -37.5,65 -75,0 -37.5,-65 37.5,-65 Z" />
    </g>
  </defs>

  <use xlink:href="#hexa" x="250" y="250" />
  <use xlink:href="#hexa" x="250" y="380" />
  <use xlink:href="#hexa" x="250" y="120" />
  <use xlink:href="#hexa" x="362.5" y="315" />
  <use xlink:href="#hexa" x="362.5" y="185" />
  <use xlink:href="#hexa" x="137.5" y="185" />
  <use xlink:href="#hexa" x="137.5" y="315" />

  <rect
    x="0"
    y="0"
    width="500"
    height="500"
    stroke="black"
    fill="none"
    stroke-width="1"
  />
</svg>`;
