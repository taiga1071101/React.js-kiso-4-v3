import express from 'express';
const app = express();  // webサーバーのインスタンス
const PORT = 9000;

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

// 下記のように、ルートを追加することも可能
app.get('/about', (_req, res) => {
  res.send('about page!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});