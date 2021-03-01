/*
 * @Descripttion: 
 * @Author: Duanlinpeng
 * @Date: 2020-10-20 16:11:37
 * @LastEditTime: 2020-12-06 16:14:19
 * @FilePath: /bm-oa-common-sdk/.eslintrc.js
 */
module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'vue'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
