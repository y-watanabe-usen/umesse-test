module.exports = {
    devServer: {
      proxy: {
        "/": {
          target: "http://localhost:4566",
          changeOrigin: true
        }
      }
    }
  };
