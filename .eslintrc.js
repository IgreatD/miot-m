module.exports = {
  root: true,
  // parserOptions: {
  //   parser: '@babel/eslint-parser',
  //   ecmaVersion: 6,
  //   sourceType: 'module',
  //   ecmaFeatures: {
  //     modules: true,
  //   },
  //   requireConfigFile: false,
  // },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    miot: true,
    uni: true,
    plus: true,
    getCurrentPages: true,
  },
  ignorePatterns: [
    'node_modules/',
    'build/',
    '*.css',
    '*.scss',
    '*.html',
    '*.json',
    'static/',
    'uni_modules/',
  ],
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', 'prettier'],
  plugins: ['vue'],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'vue/no-v-model-argument': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multi-word-component-names': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/comment-directive': 'off',
    'no-unused-vars': 'off',
    'vue/no-unused-vars': 'off',
    'no-undef': 'off',
  },
};
