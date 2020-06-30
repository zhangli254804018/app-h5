const proxyUrl = "http://app.huoju12.com"
const CopyWebpackPlugin = require('copy-webpack-plugin');
const vConsolePlugin = require('vconsole-webpack-plugin'); // 引入 移动端模拟开发者工具 插件 （另：https://github.com/liriliri/eruda）
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
console.log('当前构建环境参数：', process.env.NODE_ENV)

module.exports = {
  publicPath: './',
  devServer: {
    // 设置主机地址
    host: '0.0.0.0',
    // 设置默认端口
    port: 8082,
    // 设置代理
    proxy: {
      "/api": {
        "target": proxyUrl,
        "changeOrigin": true,
        "pathRewrite": {
          "^/api": "/api"
        }
      },     
    }
  },
  chainWebpack: (config) => {

  },
  //调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  configureWebpack: config => {
    //开发环境
    let pluginsDev = [
      //移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
      new vConsolePlugin({
        filter: [], // 需要过滤的入口文件
        enable: true // 发布代码前记得改回 false
      }),
    ];
    if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
      config.plugins = [...config.plugins];
    } else {
      // 为开发环境修改配置...
      config.plugins = [...config.plugins, ...pluginsDev];
    }

    config.optimization = {
      splitChunks: {
        chunks: 'all'
      },
      ...config.optimization
    }

    config.performance = {
      hints: 'warning',
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      },
      ...config.performance
    }

    // config.externals = {
    //   ...config.externals,
    //   /**
    //   *key: main.js中全局引入的路径
    //   *value: 全局暴露出来的对象名
    //   */
    //   "easemob-websdk": "websdk", //忽略js
    //   "easemob-webrtc": "webrtc", //忽略css
    //   "easemob-emedia": 'emedia'
    // }

  }
}