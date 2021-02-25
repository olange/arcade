// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration
/* eslint-env node */

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    "src": { url: "/" }
  },
  plugins: [],
  packageOptions: {},
  buildOptions: { out: "dist", metaUrlPath: "modules", sourcemap: true },
  optimize: { minify: true, treeshake: true }
};