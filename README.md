# 🔲 二维码生成器

> [English Version](./README_EN.md) | 中文版

一个功能强大的在线二维码生成工具，支持多种自定义选项和 API 调用。基于 Cloudflare Pages 和 Functions 构建，同时支持本地部署。

## 🌐 在线演示

**在线演示地址：** [https://qr-code.thinkgin.com/](https://qr-code.thinkgin.com/)

**GitHub 仓库：** [https://github.com/thinkgin/qrcode](https://github.com/thinkgin/qrcode)

## ✨ 功能特点

- 🔲 **快速生成二维码** - 支持文本、URL 等任意内容
- 🎨 **丰富自定义选项** - 大小、颜色、容错级别、边距等
- 🏷️ **标签支持** - 可在二维码下方添加标签文字
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 💾 **一键下载** - 支持 PNG、JPG、GIF、SVG 多种格式
- 🔗 **完整 API 文档** - 提供多种编程语言调用示例
- ⚡ **基于 Cloudflare** - 全球 CDN 加速，访问速度快
- 🏠 **本地部署支持** - 可在本地环境独立运行
- 🆓 **完全免费** - 无需注册，无使用限制

## 🚀 快速开始

### 在线使用

直接访问 [https://qr-code.thinkgin.com/](https://qr-code.thinkgin.com/) 即可在线生成二维码。

### 本地部署

#### 环境要求

- Node.js 14+
- npm 或 yarn

#### 安装步骤

1. **克隆仓库**

   ```bash
   git clone https://github.com/thinkgin/qrcode.git
   cd qrcode
   ```

2. **安装依赖**

   ```bash
   npm install
   ```

3. **启动本地服务器**

   ```bash
   npm start
   # 或直接使用
   node server.js
   ```

4. **访问服务**
   ```
   http://localhost:3000/qrcode?data=https://example.com
   ```

### API 调用

```bash
# 在线 API（Cloudflare）
curl "https://qr-code.thinkgin.com/qrcode?data=https://example.com" -o qrcode.png

# 本地 API
curl "http://localhost:3000/qrcode?data=https://example.com" -o qrcode.png

# 带参数的完整示例
curl "http://localhost:3000/qrcode?data=Hello%20World&size=400&color=FF0000&bgcolor=FFFF00&ecc=H&margin=2&format=png" -o qrcode.png
```

## 📋 API 参数

| 参数名    | 类型    | 必填 | 默认值 | 说明                                   |
| --------- | ------- | ---- | ------ | -------------------------------------- |
| `data`    | string  | 是   | -      | 要生成二维码的内容（也可以使用 `url`） |
| `size`    | integer | 否   | 300    | 二维码大小（像素），支持 100-1000      |
| `color`   | string  | 否   | 000000 | 前景色，6 位十六进制颜色代码（不含#）  |
| `bgcolor` | string  | 否   | ffffff | 背景色，6 位十六进制颜色代码（不含#）  |
| `ecc`     | string  | 否   | M      | 容错级别：L(低)、M(中)、Q(高)、H(最高) |
| `margin`  | integer | 否   | 1      | 内边距，支持 0-4                       |
| `format`  | string  | 否   | png    | 图片格式：png、svg（本地支持）         |
| `label`   | string  | 否   | -      | 可选的标签文字，显示在二维码下方       |

> **注意**：本地部署主要支持 PNG 和 SVG 格式。对于带标签的请求，会首先尝试外部 API，失败时自动回退到本地生成。

## 🔌 API 端点

### 基本用法

```
# 在线服务
GET https://qr-code.thinkgin.com/qrcode?data={content}&size={size}&color={color}&bgcolor={bgcolor}&ecc={level}&margin={margin}&format={format}&label={label}

# 本地服务
GET http://localhost:3000/qrcode?data={content}&size={size}&color={color}&bgcolor={bgcolor}&ecc={level}&margin={margin}&format={format}&label={label}
```

### 返回说明

- **成功**：返回二维码图片文件（二进制数据）
- **失败**：返回错误信息（文本格式）

### 请求示例

```bash
# 基本用法
curl "http://localhost:3000/qrcode?data=https://example.com" -o qrcode.png

# 完整参数示例
curl "http://localhost:3000/qrcode?data=Hello%20World&size=400&color=FF0000&bgcolor=FFFF00&ecc=H&margin=2&format=png&label=我的二维码" -o qrcode.png

# 生成SVG格式
curl "http://localhost:3000/qrcode?data=https://github.com&format=svg" -o qrcode.svg

# 自定义颜色
curl "http://localhost:3000/qrcode?data=测试&size=200&color=ff0000&bgcolor=00ff00" -o qrcode.png
```

## 💻 代码示例

### JavaScript

```javascript
async function generateQRCode() {
  // 可以切换为本地地址: http://localhost:3000
  const baseUrl = "https://qr-code.thinkgin.com";

  const params = new URLSearchParams({
    data: "https://example.com",
    size: "300",
    color: "000000",
    bgcolor: "ffffff",
    ecc: "M",
    margin: "1",
    format: "png",
  });

  const response = await fetch(`${baseUrl}/qrcode?${params.toString()}`);
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

def generate_qrcode(base_url="https://qr-code.thinkgin.com"):
    # 本地使用: base_url="http://localhost:3000"
    params = {
        'data': 'https://example.com',
        'size': '300',
        'color': '000000',
        'bgcolor': 'ffffff',
        'ecc': 'M',
        'margin': '1',
        'format': 'png'
    }

    url = f"{base_url}/qrcode?{urlencode(params)}"
    response = requests.get(url)

    with open('qrcode.png', 'wb') as f:
        f.write(response.content)

    print('二维码保存成功: qrcode.png')

# 使用在线服务
generate_qrcode()

# 或使用本地服务
# generate_qrcode("http://localhost:3000")
```

### Node.js

```javascript
const fs = require("fs");
const https = require("https");
const http = require("http");
const { URLSearchParams } = require("url");

function generateQRCode(baseUrl = "https://qr-code.thinkgin.com") {
  // 本地使用: baseUrl = "http://localhost:3000"
  const params = new URLSearchParams({
    data: "https://example.com",
    size: "300",
    color: "000000",
    bgcolor: "ffffff",
    ecc: "M",
    margin: "1",
    format: "png",
  });

  const url = `${baseUrl}/qrcode?${params.toString()}`;
  const file = fs.createWriteStream("qrcode.png");
  const client = baseUrl.startsWith("https") ? https : http;

  client.get(url, (response) => {
    response.pipe(file);
    file.on("finish", () => {
      file.close();
      console.log("二维码保存成功: qrcode.png");
    });
  });
}

// 使用在线服务
generateQRCode();

// 或使用本地服务
// generateQRCode("http://localhost:3000");
```

### PHP

```php
<?php
function generateQRCode($baseUrl = "https://qr-code.thinkgin.com") {
    // 本地使用: $baseUrl = "http://localhost:3000"
    $params = http_build_query([
        'data' => 'https://example.com',
        'size' => '300',
        'color' => '000000',
        'bgcolor' => 'ffffff',
        'ecc' => 'M',
        'margin' => '1',
        'format' => 'png'
    ]);

    $url = $baseUrl . "/qrcode?" . $params;

    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'timeout' => 30
        ]
    ]);

    $content = file_get_contents($url, false, $context);

    if ($content !== false) {
        file_put_contents('qrcode.png', $content);
        echo "二维码保存成功: qrcode.png\n";
    } else {
        echo "生成二维码失败\n";
    }
}

// 使用在线服务
generateQRCode();

// 或使用本地服务
// generateQRCode("http://localhost:3000");
?>
```

## 🛠️ 本地开发

### 项目结构

```
qrcode/
├── functions/          # Cloudflare Functions
│   └── qrcode.js      # 云端二维码生成函数
├── server.js          # 本地 Express 服务器
├── index.html         # 前端界面
├── package.json       # 依赖配置
├── wrangler.toml      # Cloudflare 配置
└── README.md          # 项目说明
```

### 开发模式

```bash
# 启动本地开发服务器
npm start

# 服务器启动后会显示：
# 二维码服务已启动：http://localhost:3000/qrcode?data=https://example.com
# 支持的参数：
#   data/url - 要生成二维码的内容
#   size - 二维码大小 (默认: 300)
#   ecc - 错误纠正级别 L/M/Q/H (默认: M)
#   color - 前景色 (默认: 000000)
#   bgcolor - 背景色 (默认: ffffff)
#   margin - 边距 (默认: 1)
#   format - 格式 png/svg (本地支持) 或 jpg/gif (需外部API，默认: png)
#   label - 标签文字 (需外部API支持，可选)
```

### Cloudflare 部署

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare
wrangler auth login

# 部署到 Cloudflare Pages
wrangler pages publish .
```

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📞 联系我们

如有问题或建议，请通过以下方式联系：

- 提交 [GitHub Issue](https://github.com/thinkgin/qrcode/issues)
- 发送邮件至：[your-email@example.com](mailto:your-email@example.com)
