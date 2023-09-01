// Translate ESLintRC-style configs into flat configs
import { FlatCompat } from "@eslint/eslintrc";

// Groups of global variables for specific runtimes are imported from the globals npm package and included in the globals property
import globals from "globals";
// The recommended and all rules configs are located in the @eslint/js package
import js from "@eslint/js";
// A parser that allows ESLint to understand TypeScript code
import tsParser from "@typescript-eslint/parser";
// Plugin with a set of recommended TypeScript rules
import tsPlugin from "@typescript-eslint/eslint-plugin";
// Disables all ESLint rules that are irrelevant to code formatting, as Prettier is already good at it
import prettier from "eslint-config-prettier";

const compat = new FlatCompat({});

export default [
    js.configs.recommended,
    // @typescript-eslint/eslint-plugin is still in ESLintRC style therefore needs to be converted to flat config
    ...compat.extends("plugin:@typescript-eslint/recommended"),
    prettier,
    // General JS files
    {
        // If you don’t specify a files property, the config defaults to the glob pattern "**/*.{js,mjs,cjs}"
        rules: {
            indent: ["error", 4],
            quotes: ["error", "double"],
            semi: ["error", "always"],
            "linebreak-style": ["error", "unix"],
            "comma-dangle": ["error", "never"]
        },
        ignores: ["node_modules/**", "dist/**", "docs/**"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            },
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module"
            }
        }
    },
    // TS src files
    {
        files: ["src/**/*.ts"],
        rules: {
            indent: ["error", 4],
            quotes: ["error", "double"],
            semi: ["error", "always"],
            "linebreak-style": ["error", "unix"],
            "comma-dangle": ["error", "never"]
        },
        ignores: ["node_modules/**", "dist/**", "docs/**"],
        plugins: {
            tsPlugin: tsPlugin
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            },
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module"
            }
        }
    }
];
