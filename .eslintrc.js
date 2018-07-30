module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/airbnb'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-loop-func': 'off',
    'max-len': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
