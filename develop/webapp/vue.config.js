module.exports = {
  devServer: {
    proxy: {
      "/audio": {
        target: "http://www.ne.jp/",
        changeOrigin: true,
        pathRewrite: {'^/audio' : ''}
      },
      "/": {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true
      },
    }
  }
};
