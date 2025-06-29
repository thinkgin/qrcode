# 二维码生成器

一个简单优雅的二维码生成工具，支持部署到 Cloudflare Pages。

## 功能特点

- 🔲 快速生成二维码
- 📱 响应式设计，支持移动端
- 💾 支持下载生成的二维码
- ⚡ 基于 Cloudflare Pages 和 Functions 部署
- 🎨 现代化 UI 设计

## 本地开发

1. 安装依赖：

```bash
npm install
```

2. 启动本地服务器：

```bash
npm start
```

3. 访问 http://localhost:3000

## 部署到 Cloudflare Pages

### 方法一：通过 Git 仓库部署（推荐）

1. 将代码推送到 GitHub 仓库
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
3. 进入 "Pages" 部分
4. 点击 "Create a project"
5. 选择 "Connect to Git"
6. 选择你的 GitHub 仓库
7. 配置构建设置：
   - **Framework preset**: None
   - **Build command**: 留空
   - **Build output directory**: `/`
8. 点击 "Save and Deploy"

### 方法二：通过 Wrangler CLI 部署

1. 安装 Wrangler CLI：

```bash
npm install -g wrangler
```

2. 登录 Cloudflare：

```bash
wrangler login
```

3. 部署项目：

```bash
wrangler pages publish . --project-name=qrcode-generator
```

### 环境要求

- 无需额外依赖，使用外部二维码 API 服务
- Cloudflare Pages 免费套餐完全支持

## 技术栈

- **前端**: HTML5 + CSS3 + 原生 JavaScript
- **后端**: Cloudflare Functions (Workers)
- **二维码生成**: QR Server API
- **部署**: Cloudflare Pages

## 文件结构

```
qrcode/
├── index.html          # 主页面
├── functions/
│   └── qrcode.js      # Cloudflare Function
├── _redirects         # 重定向规则
├── wrangler.toml      # Cloudflare 配置
└── README.md          # 项目说明
```

## API 使用

生成二维码的 API 端点：

```
GET /qrcode?url=https://example.com
```

参数：

- `url`: 要生成二维码的目标 URL

返回：PNG 格式的二维码图片

## 许可证

MIT License
