const path = require('path');

module.exports = {
  entry: './src/index.js', // 這邊改為你自己要的入口
  output: {
    path: path.resolve(__dirname, 'dist'), // path.resolve 是指把相對路徑改成絕對路徑，假設我們今天將 dist 改成 dist2 的話，run build 後會產生一個新的 dist2 資料夾，bundle.js 會在裡面
    filename: 'bundle.js', // 輸出的檔案名稱
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    open:true
  },
};