module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:1001', //要跨域的域名
        ws: true, // 是否启用websockets
        changeOrigin: true, //是否允许跨越
        pathRewrite: {
          '^/api': '' //将你的地址代理位这个 /api 接下来请求时就使用这个/api来代替你的地址
        },
      }
    }
  }
}
