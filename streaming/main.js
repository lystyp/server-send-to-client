const http = require('http');

// 建立 HTTP 伺服器
const server = http.createServer((req, res) => {
  // 設置標頭，表明這是一個 Server-Sent Events 流
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // 發送數據給客戶端
  let counter = 0;
  const intervalId = setInterval(() => {
    counter++;
    res.write(`data: Data ${counter}\n\n`);

    // 模擬每秒更新一次數據，這裡可以根據實際需求更改更新頻率和內容
  }, 1000);

  // 當客戶端斷開連接時，停止發送數據
  req.on('close', () => {
    console.log('Client disconnected');
    clearInterval(intervalId);
  });
});

// 監聽指定端口
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
