import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
    globalIgnores([
        'docs/',
    ]),
    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "commonjs",
            globals: {
                ...globals.node,
                ...globals.jest
            }
        }
    },
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: {
            globals: globals.browser
        }
    },
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        plugins: { js },
        extends: ["js/recommended"]
    },
    {
        files: ["**/*.test.js"],
        languageOptions: { globals: globals.jest }
    },
    tseslint.configs.recommended,
    {
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
]);
