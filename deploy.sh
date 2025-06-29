#!/bin/bash

echo "🚀 开始部署到 Cloudflare Pages..."

# 检查是否安装了 wrangler
if ! command -v wrangler &> /dev/null; then
    echo "📦 安装 Wrangler CLI..."
    npm install -g wrangler
fi

# 检查是否已登录
echo "🔐 检查登录状态..."
if ! wrangler whoami &> /dev/null; then
    echo "请先登录 Cloudflare:"
    wrangler login
fi

# 部署项目
echo "📤 部署项目..."
wrangler pages publish . --project-name=qrcode-generator --compatibility-date=2023-06-07

echo "✅ 部署完成！"
echo ""
echo "🌐 接下来绑定自定义域名："
echo "1. 访问 https://dash.cloudflare.com"
echo "2. 进入 Pages -> qrcode-generator"
echo "3. 点击 'Custom domains'"
echo "4. 添加你的域名"
echo ""
echo "📋 需要添加的 DNS 记录示例："
echo "类型: CNAME"
echo "名称: qrcode (子域名) 或 @ (根域名)"
echo "目标: qrcode-generator.pages.dev"