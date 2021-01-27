// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    static: { url: "/", static: true },
    components: { url: "/components" }
  },
  plugins: [ '@snowpack/plugin-babel' ],
  packageOptions: { polyfillNode: true },
  devOptions: { output: "stream" },
  buildOptions: { out: "build", sourcemap: true },
  optimize: { minify: true, treeshake: true }
};