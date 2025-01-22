const express = require('express');
const WebSocket = require('ws');

// إنشاء تطبيق Express
const app = express();

// تشغيل الخادم على منفذ 8080
const server = app.listen(process.env.PORT || 8080, () => {
  console.log('Server is running on port', process.env.PORT || 8080);
});

// إعداد WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('A new client connected');
  
  // إرسال رسالة إلى العميل عند الاتصال
  ws.send('Welcome to the WebSocket server!');
  
  // التعامل مع الرسائل القادمة من العميل
  ws.on('message', (message) => {
    console.log('Received message:', message);
    
    // إرسال الرسالة لجميع العملاء
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // التعامل مع إغلاق الاتصال
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// تعيين المسار الأساسي (اختياري - إذا كنت تحتاجه)
app.get('/', (req, res) => {
  res.send('Welcome to the chat server!');
});
