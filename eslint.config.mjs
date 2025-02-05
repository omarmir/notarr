import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import eslintPluginTailwind from 'eslint-plugin-tailwindcss'

export default createConfigForNuxt({
  features: {
    tooling: true,
    // Enable TypeScript support
    typescript: true
  },
  // Add TypeScript-specific configuration
  typescript: {
    parserOptions: {
      parser: '@typescript-eslint/parser',
      sourceType: 'module',
      extraFileExtensions: ['.vue']
    }
  },
  // Add custom rules and plugins
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'tailwindcss/no-custom-classname': 'warn',
    'vue/multi-word-component-names': ['error', { ignores: [] }]
  },
  plugins: {
    tailwindcss: eslintPluginTailwind
  }
}).override('nuxt/vue/rules', {
  rules: {
    'vue/require-default-prop': 'off',
    'vue/html-self-closing': 'off',
    'vue/first-attribute-linebreak': 'off'
  }
})
