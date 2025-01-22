const WebSocket = require('ws');

// إنشاء خادم WebSocket
const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket server is running on ws://localhost:8080');

// التعامل مع اتصال العملاء
wss.on('connection', (ws) => {
  console.log('A new client connected.');

  // استقبال الرسائل من العميل
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // بث الرسالة إلى جميع العملاء الآخرين
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // التعامل مع قطع الاتصال
  ws.on('close', () => {
    console.log('A client disconnected.');
  });
});
