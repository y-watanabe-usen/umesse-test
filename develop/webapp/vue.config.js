module.exports = {
  devServer: {
    proxy: {
      "/": {
        target: "http://www.ne.jp/",
        changeOrigin: true
      },
    }
  }
};
