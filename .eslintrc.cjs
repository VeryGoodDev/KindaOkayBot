module.exports = {
  overrides: [
    {
      files: [`./chatbot/**/*.js`, `./models/**/*.js`],
      extends: require.resolve(`@vgd/eslint-config-personal/node-js`),
    },
  ],
}
