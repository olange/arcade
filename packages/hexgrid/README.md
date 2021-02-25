# `@gongfuio/hexgrid` package

‹Hexgrid› implementation from [Red Blob Games](https://www.redblobgames.com/grids/hexagons/implementation.html), packaged as an ES module.

## Build

```bash
$ cd packages/hexgrid
$ npm install
$ npm run build
```

## Usage

Install in your project:

```bash
$ cd webapp
$ npm install --save @gongfuio/hexgrid
```

Use from a module:

```javascript
import { Layout } from '@gongfuio/hexgrid';

const layout = Layout.pointy;
```