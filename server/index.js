import express from 'express';
import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from '../src/App.tsx';
import '../src/App.css';
import '../src/index.css';
const app = express();  // webサーバーのインスタンス
const PORT = 9000;

// station4まで
// app.get('/', (_req, res) => {
//   res.send('Hello World!');
// });

// // 下記のように、ルートを追加することも可能
// app.get('/about', (_req, res) => {
//   res.send('about page!');
// });

const __dirname = path.resolve();

// 静的ファイルの提供
app.use('/React.js-kiso-4-v3', express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    } else if (path.endsWith('.svg')) {
      res.set('Content-Type', 'image/svg+xml');
    }
  }
}));

app.get('*', (_req, res) => {
  //res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  // ReactコンポーネントをSSRでレンダリング
  const html = ReactDOMServer.renderToString(React.createElement(App));  // JSXとして渡す

  // index.htmlの読み込み
  const indexFile = path.join(__dirname, 'dist', 'index.html');

  // index.htmlにSSRされたコンテンツを埋め込む
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Something went wrong');
      return;
    }

    const result = data.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});