// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration
/* eslint-env node */

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  workspaceRoot: "../",
  mount: {
    "static/": { url: "/", static: true },
    "components/": { url: "/components" }
  },
  plugins: [ '@snowpack/plugin-babel' ],
  packageOptions: {  
    polyfillNode: true,
    knownEntrypoints: [
        "@lit/reactive-element",
        "@lit/reactive-element/decorators/base.js",
        "@lit/reactive-element/decorators/custom-element.js",
        "@lit/reactive-element/decorators/property.js",
        "@lit/reactive-element/decorators/state.js",
        "@lit/reactive-element/decorators/event-options.js",
        "@lit/reactive-element/decorators/query.js",
        "@lit/reactive-element/decorators/query-all.js",
        "@lit/reactive-element/decorators/query-async.js",
        "@lit/reactive-element/decorators/query-assigned-nodes.js",
    ]

  },
  devOptions: { output: "stream" }, // add `secure: true` for HTTPS
  buildOptions: { out: "build/", metaUrlPath: "modules/", sourcemap: true },
  optimize: { minify: true, treeshake: true }
};