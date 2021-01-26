// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    static: { url: "/", static: true },
    // components: { url: "/components" }
  },
  plugins: [ '@snowpack/plugin-babel' ],
  packageOptions: { },
  devOptions: { output: "stream" },
  buildOptions: { },
  optimize: { }
};