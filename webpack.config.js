const path = require('path');

module.exports = {
  entry: './client/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
                '@babel/preset-env',
                ["@babel/preset-react", {"runtime": "automatic"}]
            ]
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
};
