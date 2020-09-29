var path = require('path');

module.exports = {
  devServer: {
    proxy: {
      "/": {
        target: "http://localhost:4566",
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        config: path.resolve(`src/configs/${process.env.NODE_ENV}.ts`),
      }
    }
  }
};
