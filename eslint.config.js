const { fixupConfigRules } = require("@eslint/compat");
const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const path = require("node:path");

const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

const config = [
  ...fixupConfigRules(compat.extends("next/core-web-vitals")),
  {
    ignores: [".next/**", "node_modules/**", "out/**", "dist/**"]
  }
];

module.exports = config;
