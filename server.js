const express = require('express');
const QRCode = require('qrcode');

const app = express();
const port = 3000;

app.get('/qrcode', async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('请提供要生成二维码的 URL，例如：/qrcode?url=https://example.com');
  }

  try {
    // 生成二维码的 Data URL（base64 图片）
    const qrImageDataUrl = await QRCode.toDataURL(targetUrl);

    // 直接输出二维码图片
    const img = Buffer.from(qrImageDataUrl.split(',')[1], 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    });
    res.end(img);
  } catch (err) {
    res.status(500).send('二维码生成失败：' + err.message);
  }
});

app.listen(port, () => {
  console.log(`二维码服务已启动：http://localhost:${port}/qrcode?url=https://example.com`);
});
