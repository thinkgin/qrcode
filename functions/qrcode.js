export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);

  // 获取参数
  const data = url.searchParams.get('data') || url.searchParams.get('url');
  const size = url.searchParams.get('size') || '300';
  const errorCorrection = url.searchParams.get('ecc') || 'M';
  const foregroundColor = url.searchParams.get('color') || '000000';
  const backgroundColor = url.searchParams.get('bgcolor') || 'ffffff';
  const margin = url.searchParams.get('margin') || '1';
  const format = url.searchParams.get('format') || 'png';
  const label = url.searchParams.get('label') || '';

  if (!data) {
    return new Response('请提供要生成二维码的内容，例如：/qrcode?data=https://example.com', {
      status: 400,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  try {
    let qrApiUrl;

    // 如果有标签，使用支持标签的API
    if (label && label.trim()) {
      // 使用 quickchart.io API，支持标签
      const qrParams = new URLSearchParams({
        chart: JSON.stringify({
          type: 'qr',
          data: data,
          options: {
            width: parseInt(size),
            height: parseInt(size),
            margin: parseInt(margin),
            color: {
              dark: `#${foregroundColor.replace('#', '')}`,
              light: `#${backgroundColor.replace('#', '')}`
            },
            errorCorrectionLevel: errorCorrection,
            format: format.toLowerCase()
          }
        }),
        format: format.toLowerCase()
      });

      // 添加标签
      const chartConfig = {
        type: 'qr',
        data: data,
        options: {
          width: parseInt(size),
          height: parseInt(size),
          margin: parseInt(margin),
          color: {
            dark: `#${foregroundColor.replace('#', '')}`,
            light: `#${backgroundColor.replace('#', '')}`
          },
          errorCorrectionLevel: errorCorrection,
          title: {
            display: true,
            text: label.trim(),
            position: 'bottom',
            fontSize: Math.max(12, parseInt(size) * 0.04)
          }
        }
      };

      qrApiUrl = `https://quickchart.io/qr?text=${encodeURIComponent(data)}&size=${size}&margin=${margin}&ecLevel=${errorCorrection}&format=${format}&dark=${foregroundColor.replace('#', '')}&light=${backgroundColor.replace('#', '')}&centerImageUrl=&centerImageSizeRatio=0.3&logoScale=0.3&caption=${encodeURIComponent(label.trim())}&captionFontSize=${Math.max(12, parseInt(size) * 0.04)}`;
    } else {
      // 没有标签，使用原来的API
      const qrParams = new URLSearchParams({
        size: `${size}x${size}`,
        data: data,
        color: foregroundColor.replace('#', ''),
        bgcolor: backgroundColor.replace('#', ''),
        margin: margin,
        ecc: errorCorrection,
        format: format
      });

      qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?${qrParams.toString()}`;
    }

    // 请求二维码
    const qrResponse = await fetch(qrApiUrl);

    if (!qrResponse.ok) {
      throw new Error('二维码生成失败');
    }

    // 根据格式设置Content-Type
    let contentType = 'image/png';
    switch (format.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpeg';
        break;
      case 'gif':
        contentType = 'image/gif';
        break;
      case 'svg':
        contentType = 'image/svg+xml';
        break;
      default:
        contentType = 'image/png';
    }

    const qrImageBuffer = await qrResponse.arrayBuffer();

    return new Response(qrImageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });

  } catch (err) {
    return new Response('二维码生成失败：' + err.message, {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}