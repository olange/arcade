# arcade-app-snowpack

### Apollo client app matching the Apollo Server [arcade-app](https://github.com/olange/arcade)

> ✨ Work in Progress
> ✨ Bootstrapped with Create Snowpack App (CSA).
> ✨ [Get Started](https://www.snowpack.dev/#get-started)

```

js-gong-fu % npx create-snowpack-app arcade-app-snowpack --template @snowpack/app-template-lit-element

  - Initializing git repo.

  - Success!

Quickstart:

js-gong-fu % cd arcade-app-snowpack
arcade-app-snowpack % npm start

All Commands:

  npm install      Install your dependencies. (We already ran this one for you!)
  npm start        Start your development server.
  npm run build    Build your website for production.
  npm test         Run your tests.
js-gong-fu % cd app-snowpack

arcade-app-snowpack % npm start

snowpack

  http://localhost:8080 • http://192.168.1.102:8080
  Server started in 631ms.

▼ Console

[snowpack] installing dependencies...
[snowpack] ✔ install complete! [0.59s]
[snowpack]
  ⦿ web_modules/       size       gzip       brotli
    └─ lit-element.js  120.52 KB  29.35 KB   24.81 KB
```

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds the app for production to the `dist/` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

## Directives

In case you need to add a directive like `classMap` you should add the extension to the import:

```
import { classMap } from "lit-html/directives/class-map.js";
```
