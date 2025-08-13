import jsPlugin from '@eslint/js'
import prettierPlugin from 'eslint-config-prettier'
import compatPlugin from 'eslint-plugin-compat'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default [
  { ignores: ['build/'] },
  { settings: { react: { version: 'detect' } } },
  jsPlugin.configs.recommended,
  compatPlugin.configs['flat/recommended'],
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooksPlugin.configs['recommended-latest'],
  reactRefreshPlugin.configs.vite,
  prettierPlugin,
  {
    rules: {
      'no-console': 'error',
      'no-unused-vars': ['error', { ignoreRestSiblings: true }],
      'no-var': 'error',
      'react/no-typos': 'error',
      'react/no-unused-state': 'error',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/no-unescaped-entities': 'off'
    }
  },
  {
    files: ['*.js'],
    languageOptions: {
      globals: globals.node
    }
  }
]
