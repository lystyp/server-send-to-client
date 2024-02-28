// server.js
const path = require('path');
const express = require('express');
const app = express();

// 設定靜態資源目錄來讀取html
app.use(express.static(path.join(__dirname, 'public')));

let latestData = null;

app.get('/poll', (req, res) => {
  // 如果沒有新數據，保持請求打開，直到有新數據為止
  if (!latestData) {
    setTimeout(() => {
      res.json({ data: "No new data yet." });
    }, 5000); // 假設每5秒檢查一次是否有新數據
  } else {
    // 有新數據時返回結果
    res.json({ data: latestData });
    latestData = null; // 清空最新數據
  }
});

app.get('/new-data', (req, res) => {
  // 用於模擬有新數據的情況
  latestData = "New data received!";
  res.send('Data received successfully.');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
