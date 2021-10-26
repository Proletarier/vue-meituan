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
    "prefer-destructuring": ["error", {"object": false, "array": false}],
    "linebreak-style": ["off", "windows"],
    "arrow-parens": 0,
    'consistent-return': 0,
    'no-unused-vars': 0,
    'prefer-template': 0,
    'prefer-promise-reject-errors':0,
    'no-shadow': 0,
    'semi': 0,
    'no-param-reassign': 0,
    'func-names': 0,
    'no-cycle': '∞'
  }
}
