import jsPlugin from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import { defineConfig, globalIgnores } from "eslint/config"
import astro from "eslint-plugin-astro"

export default defineConfig([
  globalIgnores([
    ".astro/",
    "dist/",
    "node_modules/"
  ]),
  jsPlugin.configs.recommended,
  ...astro.configs.recommended,
  {
    rules: {
      "astro/semi": [ "error", "never" ],
    },
  },
  {
    files: [ "**/*.ts", "**/*.tsx" ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
  },
  {
    plugins: {
      "@stylistic": stylistic,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "curly": [ "error", "all" ],
      "no-unused-vars": "off",
      "@stylistic/array-bracket-newline": [ "error", { multiline: true } ],
      "@stylistic/array-bracket-spacing": [ "error", "always" ],
      "@stylistic/block-spacing": [ "error", "always" ],
      "@stylistic/brace-style": [ "error", "1tbs", { allowSingleLine: true } ],
      "@stylistic/indent": [ "error", 2 ],
      "@stylistic/object-curly-newline": [ "error", { multiline: true, consistent: true } ],
      "@stylistic/object-curly-spacing": [ "error", "always" ],
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "block", next: "*" },
        { blankLine: "always", prev: "*", next: "block" },
        { blankLine: "always", prev: "import", next: "*" },
        { blankLine: "any", prev: "import", next: "import" },
        { blankLine: "always", prev: [ "const", "let" ], next: "*" },
        { blankLine: "any", prev: [ "const", "let" ], next: [ "const", "let" ] },
        { blankLine: "always", prev: "*", next: "return" },
      ],
      "@stylistic/quotes": [ "error", "double" ],
      "@stylistic/semi": [ "error", "never" ],
      "@typescript-eslint/array-type": [ "error", { default: "generic" } ],
      "@typescript-eslint/no-unused-vars": [ "error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" } ],
    },
  },
])
