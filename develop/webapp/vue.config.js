module.exports = {
  devServer: {
    proxy: {
      "/": {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true
      },
    }
  }
};
