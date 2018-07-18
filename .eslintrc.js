module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'class-methods-use-this': 'off',
    'prefer-destructuring': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'no-shadow': 'off',
    'no-loop-func': 'off',
    'max-len': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
