# Arcade

Restoration of a Pacman Arcade Cocktail table (Karateco 1984) and mashup of a few arcade games, retrofitted to hexagonal grids. 

## Setup

```bash
$ npm install
```

Optionally, if you want to deploy to Firebase Hosting (requires appropriate access rights):

```bash
$ npm install -g firebase-tools
```

## Usage

Start development server for the webapp:

```bash
$ npm run start

# Above is equivalent to
$ cd webapp
$ npm run start
```

Check code-style & reformat source code (with Prettier):

```bash
# All packages
$ npm run format

# A single package
$ cd webapp
$ npm run format
```

Check syntax & potential errors (with ESLint):

```bash
# All packages
$ npm run lint

# A single package
$ cd webapp
$ npm run lint

# Alternatively, from the root folder
$ npx eslint webapp
```

Production build:

```bash
# All packages
$ npm run build

# A single package
$ cd webapp
$ npm run build
```

Deploy to Firebase Hosting (requires appropriate access rights):

```bash
# Will also run a production build of all packages (see hosting/predeploy script in `firebase.json`)
$ npm run deploy
```