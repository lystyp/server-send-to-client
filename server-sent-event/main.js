
 const express = require('express');
 const app = express();
 const path = require('path');

 // 設定靜態資源目錄來讀取html
app.use(express.static(path.join(__dirname, 'public')));
// 创建一个 HTTP 服务器
app.get("/hi", (req, res) => {
  // 设置响应头，指明返回的是 Server-Sent Events 数据
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // 定义一个计数器，每秒向客户端发送一个递增的事件
  let count = 0;
  const interval = setInterval(() => {
    // 构造一个包含计数器值的消息
    const message = `data: ${count}\n\n`;
    // 将消息发送给客户端
    console.log("write:" + message);
    res.write(message);
    // 递增计数器
    count++;
    // 在计数器达到 10 后关闭连接
    if (count === 10) {
        console.log("write end.");
        res.write(`data: cc\n\n`);
        clearInterval(interval);
    }
  }, 1000);

  // 当客户端连接关闭时清除定时器
  req.on('close', () => {
    console.log("client close");
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 3000;

// 监听指定端口
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
