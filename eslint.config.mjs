import withNuxt from './.nuxt/eslint.config.mjs'
import tailwindcss from "eslint-plugin-tailwindcss"

export default withNuxt(
    {
        ignores: ['**/*.json'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'tailwindcss/no-custom-classname': 'warn', // Warn on custom class names
          },
          plugins: {tailwindcss},
    }
).prepend(
  {
    ignores: ['pb/'],

  }
)
.override('nuxt/vue/rules', {
    rules: {
        'vue/require-default-prop': 'off',
        'vue/html-self-closing': 'off',
        'vue/first-attribute-linebreak': 'off',
        'vue/multi-word-component-names': ["error", {
          "ignores": []
        }]
    }
})