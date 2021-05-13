// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration
/* eslint-env node */

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  workspaceRoot: "../",
  mount: {
    static: { url: "/", static: true },
    components: { url: "/components" }
  },
  plugins: [ '@snowpack/plugin-babel' ],
  packageOptions: { polyfillNode: true },
  devOptions: { output: "stream" }, // add `secure: true` for HTTPS
  buildOptions: { out: "build", metaUrlPath: "modules", sourcemap: true },
  optimize: { minify: true, treeshake: true }
};