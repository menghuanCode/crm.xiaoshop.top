'use strict'
const path = require('path')
const { title } = require('./src/config')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = title || 'Admin'


module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: true,
  devServer: {
    open: true,
    proxy: 'http://localhost:3003/',
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    let { module } = config

    // svg-sprite-loader
    module.rule('svg').exclude.add(resolve('src/icons')).end();
    module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')).
      end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}