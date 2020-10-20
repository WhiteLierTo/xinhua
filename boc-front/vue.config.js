module.exports = {
  publicPath: "./",
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://boc.jsxhfh.com/admin',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
}
