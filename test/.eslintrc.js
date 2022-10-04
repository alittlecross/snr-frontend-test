module.exports = {
  env: {
    mocha: true,
  },
  extends: ['plugin:mocha/recommended'],
  plugins: ['mocha'],
  rules: {
    'mocha/no-mocha-arrows': 0,
    'no-unused-expressions': 0,
  },
};
