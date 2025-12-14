import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Custom rules
  {
    rules: {
      "semi": "error",
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "object-curly-spacing": ["error", "always"],
      "no-debugger": "error",
      "no-console": ["error", { "allow": ["warn", "error"] }],
      "no-constant-condition": "error",
    },
  },
]);

export default eslintConfig;
