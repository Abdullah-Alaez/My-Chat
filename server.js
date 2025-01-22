const WebSocket = require('ws');

// استخدام المنفذ الديناميكي الذي توفره Heroku، أو المنفذ 8080 إذا كان يعمل محليًا
const port = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
  console.log('A new client connected');
  
  ws.on('message', (message) => {
    console.log('Received message:', message);
    
    // إرسال الرسالة مرة أخرى لجميع العملاء المتصلين
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

console.log(`WebSocket server is running on ws://localhost:${port}`);
