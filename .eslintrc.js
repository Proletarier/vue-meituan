module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': ['error', 'never'],
    'max-len' : 0,
    'no-multi-assign': 0,
    'prefer-const' :0,
    'no-plusplus':['error',{'allowForLoopAfterthoughts': true}],
    "no-param-reassign": ["error", { "props": false}],
    "prefer-destructuring": ["error", {"object": false, "array": false}]
  }
}
