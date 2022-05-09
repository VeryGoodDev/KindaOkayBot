module.exports = {
  overrides: [
    {
      files: [`./chatbot/**/*.ts`, `./models/**/*.ts`],
      extends: require.resolve(`@vgd/eslint-config-personal/node-ts`),
    },
    {
      files: [`./scripts/**/*.cjs`],
      extends: require.resolve(`@vgd/eslint-config-personal/node-js`),
      rules: {
        'import/no-commonjs': `off`,
      },
    },
  ],
}
