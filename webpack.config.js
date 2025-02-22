import path from 'path';
import { fileURLToPath } from 'url';
import webpackNodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin  from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  // バンドルモードを指定
  mode: "development",
  target: 'node',
  entry: './server/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    chunkFormat: "module",
    library: {
      type: 'module',  // モジュール形式でライブラリを出力
    },
    module: true,  // 出力をESMに設定
  },
  experiments: {
    outputModule: true,  // モジュールとして出力
  },
  externals: [
    webpackNodeExternals({
      importType: 'module', // `import express from 'express'` の形でバンドルする
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,  // TypeScriptファイルを処理
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,  // 型チェックをスキップ
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // CSS を別ファイルに出力
          "css-loader", 
        ],
      },
      {
        //test: /\.(js|jsx|ts|tsx)$/, // どの拡張子にBabel-loaderを適用させるか
        test: /\.(js|jsx)$/, // Babel は JavaScript のみ処理
        exclude: /node_modules/, // 除外するファイルやディレクトリ
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                '@babel/preset-env',  // 最新のJavaScriptを変換
                '@babel/preset-react',  // JSXを変換
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css", // 出力される CSS ファイル名
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    fallback: {
      'url': false,  // 無効化（Webpack 5 から Node.js のコアモジュールのポリフィルが自動的に含まれなくなった）
      'path': false,
      'fs': false,
      "crypto": false,
      "stream": false,
      "buffer": false,
      "http": false,
      "https": false,
      'querystring': false,
      'net': false,
      'zlib': false,
    },
  },
};