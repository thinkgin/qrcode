# 🔲 QR Code Generator

> English Version | [中文版](./README.md)

A powerful online QR code generation tool with extensive customization options and API support. Built on Cloudflare Pages and Functions with local deployment support.

## 🌐 Live Demo

**Live Demo:** [https://qr-code.thinkgin.com/](https://qr-code.thinkgin.com/)

**GitHub Repository:** [https://github.com/thinkgin/qrcode](https://github.com/thinkgin/qrcode)

## ✨ Features

- 🔲 **Fast QR Code Generation** - Supports text, URLs, and any content
- 🎨 **Rich Customization Options** - Size, colors, error correction level, margin, etc.
- 🏷️ **Label Support** - Add custom labels below QR codes
- 📱 **Responsive Design** - Perfect for both mobile and desktop
- 💾 **One-Click Download** - Supports PNG, JPG, GIF, SVG formats
- 🔗 **Complete API Documentation** - Multi-language examples
- ⚡ **Cloudflare-Powered** - Global CDN acceleration
- 🏠 **Local Deployment Support** - Run independently in local environment
- 🆓 **Completely Free** - No registration required, no usage limits

## 🚀 Quick Start

### Online Usage

Visit [https://qr-code.thinkgin.com/](https://qr-code.thinkgin.com/) to generate QR codes online.

### Local Deployment

#### Requirements

- Node.js 14+
- npm or yarn

#### Installation Steps

1. **Clone Repository**

   ```bash
   git clone https://github.com/thinkgin/qrcode.git
   cd qrcode
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Local Server**

   ```bash
   npm start
   # or directly use
   node server.js
   ```

4. **Access Service**
   ```
   http://localhost:3000/qrcode?data=https://example.com
   ```

### API Usage

```bash
# Online API (Cloudflare)
curl "https://qr-code.thinkgin.com/qrcode?data=https://example.com" -o qrcode.png

# Local API
curl "http://localhost:3000/qrcode?data=https://example.com" -o qrcode.png

# Full parameters example
curl "http://localhost:3000/qrcode?data=Hello%20World&size=400&color=FF0000&bgcolor=FFFF00&ecc=H&margin=2&format=png" -o qrcode.png
```

## 📋 API Parameters

| Parameter | Type    | Required | Default | Description                                               |
| --------- | ------- | -------- | ------- | --------------------------------------------------------- |
| `data`    | string  | Yes      | -       | Content to encode in QR code (can also use `url`)         |
| `size`    | integer | No       | 300     | QR code size in pixels (100-1000)                         |
| `color`   | string  | No       | 000000  | Foreground color (6-digit hex without #)                  |
| `bgcolor` | string  | No       | ffffff  | Background color (6-digit hex without #)                  |
| `ecc`     | string  | No       | M       | Error correction: L(Low), M(Medium), Q(Quartile), H(High) |
| `margin`  | integer | No       | 1       | Margin size (0-4)                                         |
| `format`  | string  | No       | png     | Image format: png, svg (local support)                    |
| `label`   | string  | No       | -       | Optional label text below QR code                         |

> **Note**: Local deployment primarily supports PNG and SVG formats. For requests with labels, it will first try external APIs and fallback to local generation if failed.

## 🔌 API Endpoint

### Basic Usage

```
# Online Service
GET https://qr-code.thinkgin.com/qrcode?data={content}&size={size}&color={color}&bgcolor={bgcolor}&ecc={level}&margin={margin}&format={format}&label={label}

# Local Service
GET http://localhost:3000/qrcode?data={content}&size={size}&color={color}&bgcolor={bgcolor}&ecc={level}&margin={margin}&format={format}&label={label}
```

### Response

- **Success**: Returns QR code image file (binary data)
- **Error**: Returns error message (text format)

### Request Examples

```bash
# Basic usage
curl "http://localhost:3000/qrcode?data=https://example.com" -o qrcode.png

# Complete parameters example
curl "http://localhost:3000/qrcode?data=Hello%20World&size=400&color=FF0000&bgcolor=FFFF00&ecc=H&margin=2&format=png&label=My%20QR%20Code" -o qrcode.png

# Generate SVG format
curl "http://localhost:3000/qrcode?data=https://github.com&format=svg" -o qrcode.svg

# Custom colors
curl "http://localhost:3000/qrcode?data=Test&size=200&color=ff0000&bgcolor=00ff00" -o qrcode.png
```

## 💻 Code Examples

### JavaScript

```javascript
async function generateQRCode() {
  // Switch to local address: http://localhost:3000
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

  // Use the generated QR code
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
    # For local use: base_url="http://localhost:3000"
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

    print('QR code saved successfully: qrcode.png')

# Use online service
generate_qrcode()

# Or use local service
# generate_qrcode("http://localhost:3000")
```

### Node.js

```javascript
const fs = require("fs");
const https = require("https");
const http = require("http");
const { URLSearchParams } = require("url");

function generateQRCode(baseUrl = "https://qr-code.thinkgin.com") {
  // For local use: baseUrl = "http://localhost:3000"
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
      console.log("QR code saved successfully: qrcode.png");
    });
  });
}

// Use online service
generateQRCode();

// Or use local service
// generateQRCode("http://localhost:3000");
```

### PHP

```php
<?php
function generateQRCode($baseUrl = "https://qr-code.thinkgin.com") {
    // For local use: $baseUrl = "http://localhost:3000"
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
        echo "QR code saved successfully: qrcode.png\n";
    } else {
        echo "Failed to generate QR code\n";
    }
}

// Use online service
generateQRCode();

// Or use local service
// generateQRCode("http://localhost:3000");
?>
```

## 🛠️ Local Development

### Project Structure

```
qrcode/
├── functions/          # Cloudflare Functions
│   └── qrcode.js      # Cloud QR code generation function
├── server.js          # Local Express server
├── index.html         # Frontend interface
├── package.json       # Dependencies configuration
├── wrangler.toml      # Cloudflare configuration
└── README.md          # Project documentation
```

### Development Mode

```bash
# Start local development server
npm start

# After server starts, it will display:
# QR code service started: http://localhost:3000/qrcode?data=https://example.com
# Supported parameters:
#   data/url - Content to generate QR code
#   size - QR code size (default: 300)
#   ecc - Error correction level L/M/Q/H (default: M)
#   color - Foreground color (default: 000000)
#   bgcolor - Background color (default: ffffff)
#   margin - Margin (default: 1)
#   format - Format png/svg (local support) or jpg/gif (requires external API, default: png)
#   label - Label text (requires external API support, optional)
```

### Cloudflare Deployment

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler auth login

# Deploy to Cloudflare Pages
wrangler pages publish .
```

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

If you have any questions or suggestions, please contact us through:

- Submit [GitHub Issue](https://github.com/thinkgin/qrcode/issues)
- Send email to: [your-email@example.com](mailto:your-email@example.com)
