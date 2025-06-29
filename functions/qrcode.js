export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get('url');

  if (!targetUrl) {
    return new Response('请提供要生成二维码的 URL，例如：/qrcode?url=https://example.com', {
      status: 400,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  try {
    // 使用 QR Server API 生成二维码
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(targetUrl)}`;
    const qrResponse = await fetch(qrApiUrl);

    if (!qrResponse.ok) {
      throw new Error('二维码生成失败');
    }

    const qrImageBuffer = await qrResponse.arrayBuffer();

    return new Response(qrImageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response('二维码生成失败：' + err.message, {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}