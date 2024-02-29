const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const express = require('express');


const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({port:8081});
// 設定靜態資源目錄來讀取html
app.use(express.static(path.join(__dirname, 'public')));


wss.on('connection', (ws) => {
  console.log('有瀏覽器連線進來了！');

  // 接收瀏覽器訊息
  ws.on('message', (message) => {
    console.log(`收到瀏覽器訊息：${message}`);

    // 在這裡可以進行資料處理或更新

    // 回傳訊息給瀏覽器
    ws.send('伺服器收到你的訊息了！');
  });

  // 關閉連線時的處理
  ws.on('close', () => {
    console.log('瀏覽器斷線了！');
  });
});

const PORT = 8080;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});