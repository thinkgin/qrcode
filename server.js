const express = require('express');
const QRCode = require('qrcode');
const https = require('https');
const http = require('http');

const app = express();
const port = 3000;

// 辅助函数：发送 HTTP/HTTPS 请求
function fetchData(url) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https://');
    const client = isHttps ? https : http;

    client.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        return;
      }

      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

app.get('/qrcode', async (req, res) => {
  // 获取参数，支持多种参数名
  const data = req.query.data || req.query.url;
  const size = parseInt(req.query.size) || 300;
  const errorCorrection = req.query.ecc || 'M';
  const foregroundColor = req.query.color || '000000';
  const backgroundColor = req.query.bgcolor || 'ffffff';
  const margin = parseInt(req.query.margin) || 1;
  const format = req.query.format || 'png';
  const label = req.query.label || '';

  if (!data) {
    return res.status(400).send('请提供要生成二维码的内容，例如：/qrcode?data=https://example.com');
  }

  try {
    let qrImageBuffer;

    // 如果有标签，尝试使用外部 API，失败则回退到本地生成
    if (label && label.trim()) {
      try {
        // 使用 quickchart.io API，支持标签
        const qrApiUrl = `https://quickchart.io/qr?text=${encodeURIComponent(data)}&size=${size}&margin=${margin}&ecLevel=${errorCorrection}&format=${format}&dark=${foregroundColor.replace('#', '')}&light=${backgroundColor.replace('#', '')}&caption=${encodeURIComponent(label.trim())}&captionFontSize=${Math.max(12, size * 0.04)}`;

        qrImageBuffer = await fetchData(qrApiUrl);
      } catch (err) {
        console.log('外部 API 失败，回退到本地生成:', err.message);
        // 回退到本地生成（不支持标签）
        const qrDataUrl = await QRCode.toDataURL(data, {
          width: size,
          margin: margin,
          color: {
            dark: `#${foregroundColor.replace('#', '')}`,
            light: `#${backgroundColor.replace('#', '')}`
          },
          errorCorrectionLevel: errorCorrection
        });
        qrImageBuffer = Buffer.from(qrDataUrl.split(',')[1], 'base64');
      }
    } else {
      // 没有标签，直接使用本地 QRCode 库
      if (format.toLowerCase() === 'svg') {
        // SVG 格式
        const svgString = await QRCode.toString(data, {
          type: 'svg',
          width: size,
          margin: margin,
          color: {
            dark: `#${foregroundColor.replace('#', '')}`,
            light: `#${backgroundColor.replace('#', '')}`
          },
          errorCorrectionLevel: errorCorrection
        });
        qrImageBuffer = Buffer.from(svgString, 'utf8');
      } else {
        // PNG 格式（默认）
        const qrDataUrl = await QRCode.toDataURL(data, {
          width: size,
          margin: margin,
          color: {
            dark: `#${foregroundColor.replace('#', '')}`,
            light: `#${backgroundColor.replace('#', '')}`
          },
          errorCorrectionLevel: errorCorrection
        });
        qrImageBuffer = Buffer.from(qrDataUrl.split(',')[1], 'base64');
      }
    }

    // 根据格式设置Content-Type
    let contentType = format.toLowerCase() === 'svg' ? 'image/svg+xml' : 'image/png';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': qrImageBuffer.length,
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(qrImageBuffer);

  } catch (err) {
    console.error('二维码生成错误:', err);
    res.status(500).send('二维码生成失败：' + err.message);
  }
});

app.listen(port, () => {
  console.log(`二维码服务已启动：http://localhost:${port}/qrcode?data=https://example.com`);
  console.log(`支持的参数：`);
  console.log(`  data/url - 要生成二维码的内容`);
  console.log(`  size - 二维码大小 (默认: 300)`);
  console.log(`  ecc - 错误纠正级别 L/M/Q/H (默认: M)`);
  console.log(`  color - 前景色 (默认: 000000)`);
  console.log(`  bgcolor - 背景色 (默认: ffffff)`);
  console.log(`  margin - 边距 (默认: 1)`);
  console.log(`  format - 格式 png/svg (本地支持) 或 jpg/gif (需外部API，默认: png)`);
  console.log(`  label - 标签文字 (需外部API支持，可选)`);
});
