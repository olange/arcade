/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  rules: {
  },
  overrides: [
    {
      files: [ "webapp/**/*.js" ],
      parser: "@babel/eslint-parser",
      parserOptions: {
        babelOptions: { configFile: "./webapp/babel.config.json" }
      }
    }
  ]
};