/*
 * @Descripttion: 
 * @Author: Duanlinpeng
 * @Date: 2020-10-12 18:49:58
 * @LastEditTime: 2020-12-06 16:14:59
 * @FilePath: /bm-oa-common-sdk/webpack.conf.js
 */
// 配置文件使用commonjs规范
const path = require('path');

module.exports = {
  // mode: 'development',  
  mode: 'production',
  entry:['./src/index.js'],
  output: {
    library: 'common-SDK',
    libraryTarget: 'umd', // 输出library规范代码, umd是兼容amd和cmd的
    umdNamedDefine: true ,// 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
    path: path.resolve(__dirname, './lib'),
    filename: 'common-SDK.js'
  },
  devtool: 'source-map',
  // 指定loader
  module: {
    rules: [
      {
        //前置(在执行编译之前去执行eslint-loader检查代码规范，有报错就不执行编译)
        test: /.(js)$/,
        enforce: 'pre', // 在执行编译之前去执行eslint-loader检查代码规范，有报错就不执行编译
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: { 
          formatter: function() {
            return 'output';
          }
        }
      }
    ]
  }
};
