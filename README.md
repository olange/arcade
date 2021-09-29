# Arcade

Restoration of a Pacman Arcade Cocktail table (Karateco 1984) and mashup of a few arcade games, retrofitted to hexagonal grids. 

## Project status

🌱 Early stage of development. Only a landing page with a partial UI is deployed on Firebase. Expect everything to evolve.

## Repository structure

This repository has a _monorepo_ layout, holding two projects [`webapp`](webapp/) and [`server`](server/), with shared library [`hexgrid`](packages/hexgrid/).

```ascii
/ ..................... NPM & Firebase scripts for global assembly & deployment
|
+-- webapp ............ D-Arcade PWA
|   +-- components .... + Web Components
|   +-- static ........ + Static HTML5/CSS3 & more assets
|
+-- server ............ D-Arcade Back-end
|   +-- src ........... + (to be created)
|
+-- packages
    +-- hexgrid ....... Hexgrid library from Red Blob Games
```

## How-to… ?

### 1. Setup

```bash
$ npm install
```

Optionally, if you want to deploy to [Firebase Hosting](https://console.firebase.google.com/project/d-arcade/hosting) — requires appropriate access rights:

```bash
$ npm install -g firebase-tools
```

### 2. Run

Start development server & edit the code of the webapp, save and enjoy instant [hot-module reloading](https://www.snowpack.dev/concepts/hot-module-replacement) – by the virtue of [ESBuild](https://esbuild.github.io) and [Snowpack](https://www.snowpack.dev):

```bash
$ npm run start
```

Above is equivalent to:

```bash
$ cd webapp
$ npm run start
```

### 3. Deploy

Deploy to [Firebase Hosting](https://console.firebase.google.com/project/d-arcade/hosting) — would require appropriate access rights:

```bash
$ npm run deploy
```

This command will also run a production build of the webapp and its dependencies
(triggered by `hosting/predeploy` script in [`firebase.json`](firebase.json)).

### 4. Production build

```bash
# All packages
$ npm run build

# A single package
$ cd webapp
$ npm run build
```

### 5. Specialized tasks

Check code-style & reformat source code (with [Prettier](https://prettier.io)):

```bash
# All packages
$ npm run format

# A single package
$ cd webapp
$ npm run format
```

Check syntax & eventually find problems (with [ESLint](https://eslint.org)):

```bash
# All packages
$ npm run lint

# A single package
$ cd webapp
$ npm run lint

# Alternatively, from the root folder
$ npx eslint webapp
```