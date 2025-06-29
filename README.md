# 🔲 二维码生成器

一个功能强大的在线二维码生成工具，支持多种自定义选项和 API 调用。基于 Cloudflare Pages 和 Functions 构建，提供快速、稳定的服务。

## 🌐 在线演示

**在线演示地址：** [https://qrcode.thinkgin.com/](https://qrcode.thinkgin.com/)

**GitHub 仓库：** [https://github.com/thinkgin/qrcode](https://github.com/thinkgin/qrcode)

## ✨ 功能特点

- 🔲 **快速生成二维码** - 支持文本、URL 等任意内容
- 🎨 **丰富自定义选项** - 大小、颜色、容错级别、边距等
- 🏷️ **标签支持** - 可在二维码下方添加标签文字
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 💾 **一键下载** - 支持 PNG、JPG、GIF、SVG 多种格式
- 🔗 **完整 API 文档** - 提供多种编程语言调用示例
- ⚡ **基于 Cloudflare** - 全球 CDN 加速，访问速度快
- 🆓 **完全免费** - 无需注册，无使用限制

## 🚀 快速开始

### 在线使用

直接访问 [https://qrcode.thinkgin.com/](https://qrcode.thinkgin.com/) 即可在线生成二维码。

### API 调用

```bash
# 基本用法
curl "https://qrcode.thinkgin.com/qrcode?data=https://example.com" -o qrcode.png

# 带参数的完整示例
curl "https://qrcode.thinkgin.com/qrcode?data=Hello%20World&size=400&color=FF0000&bgcolor=FFFF00&ecc=H&margin=2&format=png" -o qrcode.png
```

## 📋 API 参数

| 参数名    | 类型    | 必填 | 默认值 | 说明                                   |
| --------- | ------- | ---- | ------ | -------------------------------------- |
| `data`    | string  | 是   | -      | 要生成二维码的内容                     |
| `size`    | integer | 否   | 300    | 二维码大小（像素），支持 100-1000      |
| `color`   | string  | 否   | 000000 | 前景色，6 位十六进制颜色代码（不含#）  |
| `bgcolor` | string  | 否   | ffffff | 背景色，6 位十六进制颜色代码（不含#）  |
| `ecc`     | string  | 否   | M      | 容错级别：L(低)、M(中)、Q(高)、H(最高) |
| `margin`  | integer | 否   | 1      | 内边距，支持 0-4                       |
| `format`  | string  | 否   | png    | 图片格式：png、jpg、gif、svg           |
| `label`   | string  | 否   | -      | 可选的标签文字，显示在二维码下方       |

## 💻 代码示例

### JavaScript

```javascript
async function generateQRCode() {
  const params = new URLSearchParams({
    data: "https://example.com",
    size: "300",
    color: "000000",
    bgcolor: "ffffff",
    ecc: "M",
    margin: "1",
    format: "png",
  });

  const response = await fetch(
    `https://qrcode.thinkgin.com/qrcode?${params.toString()}`
  );
  const blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);

  // 使用生成的二维码
  const img = document.createElement("img");
  img.src = imageUrl;
  document.body.appendChild(img);
}
```

### Python

```python
import requests
from urllib.parse import urlencode

def generate_qrcode():
    params = {
        'data': 'https://example.com',
        'size': '300',
        'color': '000000',
        'bgcolor': 'ffffff',
        'ecc': 'M',
        'margin': '1',
        'format': 'png'
    }

    url = f"https://qrcode.thinkgin.com/qrcode?{urlencode(params)}"
    response = requests.get(url)

    with open('qrcode.png', 'wb') as f:
        f.write(response.content)

    print('二维码保存成功: qrcode.png')

generate_qrcode()
```

### Node.js

```javascript
const fs = require("fs");
const https = require("https");
const { URLSearchParams } = require("url");

function generateQRCode() {
  const params = new URLSearchParams({
    data: "https://example.com",
    size: "300",
    color: "000000",
    bgcolor: "ffffff",
    ecc: "M",
    margin: "1",
    format: "png",
  });

  const url = `https://qrcode.thinkgin.com/qrcode?${params.toString()}`;
  const file = fs.createWriteStream("qrcode.png");

  https.get(url, (response) => {
    response.pipe(file);
    file.on("finish", () => {
      file.close();
      console.log("二维码保存成功: qrcode.png");
    });
  });
}

generateQRCode();
```

## 🛠️ 本地开发

1. **克隆仓库**

```bash
git clone https://github.com/thinkgin/qrcode.git
cd qrcode
```

2. **安装依赖**

```bash
npm install
```

3. **启动本地服务**

```bash
npm start
```

4. **访问应用**

```
http://localhost:3000
```

## 🚀 部署到 Cloudflare Pages

### 方法一：通过 Git 仓库部署（推荐）

1. Fork 此仓库到你的 GitHub 账户
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
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

1. **安装 Wrangler CLI**

```bash
npm install -g wrangler
```

2. **登录 Cloudflare**

```bash
wrangler login
```

3. **部署项目**

```bash
wrangler pages publish . --project-name=qrcode-generator
```

## 📁 项目结构

```
qrcode/
├── index.html          # 主页面
├── functions/
│   └── qrcode.js      # Cloudflare Function API
├── _redirects         # 重定向规则
├── wrangler.toml      # Cloudflare 配置
├── package.json       # 项目配置
├── server.js          # 本地开发服务器
└── README.md          # 项目说明
```

## 🔧 技术栈

- **前端**: HTML5 + CSS3 + 原生 JavaScript
- **后端**: Cloudflare Functions (Workers)
- **二维码生成**: QR Server API + QuickChart.io API
- **部署**: Cloudflare Pages
- **CDN**: Cloudflare 全球加速

## 📝 更新日志

### v2.1.0 (2025-01-XX)

- ✨ 添加标签参数支持
- ✨ 显示完整 API 请求 URL
- 🎨 优化用户界面设计
- 📚 完善 API 文档和代码示例

### v2.0.0 (2025-01-XX)

- ✨ 重构为 Cloudflare Pages 应用
- ✨ 添加多种自定义参数支持
- ✨ 提供完整的 API 文档
- 📱 响应式设计优化

### v1.0.0 (2025-01-XX)

- 🎉 初始版本发布
- ✨ 基本二维码生成功能

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 此仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源协议。

## 🔗 相关链接

- **在线演示**: [https://qrcode.thinkgin.com/](https://qrcode.thinkgin.com/)
- **GitHub 仓库**: [https://github.com/thinkgin/qrcode](https://github.com/thinkgin/qrcode)
- **Cloudflare Pages**: [https://pages.cloudflare.com/](https://pages.cloudflare.com/)
- **Cloudflare Functions**: [https://developers.cloudflare.com/pages/functions/](https://developers.cloudflare.com/pages/functions/)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
