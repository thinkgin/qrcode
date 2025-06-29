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

  if (!data) {
    return new Response('请提供要生成二维码的内容，例如：/qrcode?data=https://example.com', {
      status: 400,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  try {
    // 构建QR Server API URL
    const qrParams = new URLSearchParams({
      size: `${size}x${size}`,
      data: data,
      color: foregroundColor.replace('#', ''),
      bgcolor: backgroundColor.replace('#', ''),
      margin: margin,
      ecc: errorCorrection,
      format: format
    });

    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?${qrParams.toString()}`;

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