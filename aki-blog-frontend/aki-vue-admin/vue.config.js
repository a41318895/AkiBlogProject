'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = process.env.VUE_APP_TITLE || '部落格管理系统' // 網頁標題

const port = process.env.port || process.env.npm_config_port || 8094 // 端口 81 / 8989

// vue.config.js 配置
// 官方 vue.config.js 文檔 https://cli.vuejs.org/config/#css-loaderoptions
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // npm run build 或 yarn build 時，生成文件的目錄名稱（須和 baseUrl 的pro env path 相同）（默認為 : dist）
  outputDir: 'dist',
  // 用於放生成的static resources (js、css、img、fonts) 等
  assetsDir: 'static',
  // 是否開啟 eslint 保存檢測, valid value：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === 'development',
  // 若不需要pro env 的 source map, 可以設置為 false 以加速pro env 建置。
  productionSourceMap: false,
  // webpack-dev-server 相關配置
  devServer: {
    host: '0.0.0.0',
    port: port,
    open: true,
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      // target: `http://localhost:8989`,
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:8989`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    disableHostCheck: true
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single'),
          {
            from: path.resolve(__dirname, './public/robots.txt'), // 防爬蟲文件
            to: './' // 到根目錄之下
          }
        }
      )
  }
}
