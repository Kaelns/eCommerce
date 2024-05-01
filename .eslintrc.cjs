module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'vitest.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react', 'react-hooks', 'jsx-a11y', '@typescript-eslint', 'prettier', 'vitest'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    "project": ["**/tsconfig.json"],
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "vitest/max-nested-describe": [
      "error",
      {
        "max": 3
      }
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    'no-console': 0,
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "typeLike",
        "format": ["PascalCase"]
      },
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "prefix": ["I"]
      },
      {
        "selector": "variable",
        "format": ["camelCase", "PascalCase", "UPPER_CASE"],
        "leadingUnderscore": "allow"
      },
      {
        "selector": "function",
        "format": ["camelCase", "PascalCase"]
      },
      {
        "selector": "parameter",
        "format": ["camelCase"]
      },
      {
        "selector": "method",
        "format": ["camelCase"],
        "leadingUnderscore": "allow"
      },
      {
        "selector": "enumMember",
        "format": ["UPPER_CASE"]
      },
      {
        "selector": "property",
        "format": ["camelCase"],
        "leadingUnderscore": "allow"
      }
    ],

    "@typescript-eslint/no-unused-vars": ["off", { "varsIgnorePattern": "^_", "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/consistent-type-definitions": "error",
    "@typescript-eslint/explicit-function-return-type": "error",

    "curly": ["error", "all"],
    "prettier/prettier": 2,
    "react/jsx-filename-extension": [2, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }]
  },

  "noInlineConfig": true
}
