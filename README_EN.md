# 🔲 QR Code Generator

A powerful online QR code generation tool with extensive customization options and API support. Built on Cloudflare Pages and Functions for fast, reliable service.

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
- 🆓 **Completely Free** - No registration required, no usage limits

## 🚀 Quick Start

### Online Usage

Visit [https://qr-code.thinkgin.com/](https://qr-code.thinkgin.com/) to generate QR codes online.

### API Usage

```bash
# Basic usage
curl "https://qr-code.thinkgin.com/qrcode?data=https://example.com" -o qrcode.png

# Full parameters example
curl "https://qr-code.thinkgin.com/qrcode?data=Hello%20World&size=400&color=FF0000&bgcolor=FFFF00&ecc=H&margin=2&format=png&label=My%20QR%20Code" -o qrcode.png
```

## 📋 API Parameters

| Parameter | Type    | Required | Default | Description                                               |
| --------- | ------- | -------- | ------- | --------------------------------------------------------- |
| `data`    | string  | Yes      | -       | Content to encode in QR code                              |
| `size`    | integer | No       | 300     | QR code size in pixels (100-1000)                         |
| `color`   | string  | No       | 000000  | Foreground color (6-digit hex without #)                  |
| `bgcolor` | string  | No       | ffffff  | Background color (6-digit hex without #)                  |
| `ecc`     | string  | No       | M       | Error correction: L(Low), M(Medium), Q(Quartile), H(High) |
| `margin`  | integer | No       | 1       | Margin size (0-4)                                         |
| `format`  | string  | No       | png     | Image format: png, jpg, gif, svg                          |
| `label`   | string  | No       | -       | Optional label text below QR code                         |

## 🔌 API Endpoint

### Basic Usage

```
GET https://qr-code.thinkgin.com/qrcode?data={content}&size={size}&color={color}&bgcolor={bgcolor}&ecc={level}&margin={margin}&format={format}&label={label}
```

### Response

- **Success**: Returns QR code image file (binary data)
- **Error**: Returns error message (text format)

### Request Examples

```bash
# Basic usage
curl "https://qr-code.thinkgin.com/qrcode?data=https://example.com" -o qrcode.png

# Complete parameters example
curl "https://qr-code.thinkgin.com/qrcode?data=Hello%20World&size=400&color=FF0000&bgcolor=FFFF00&ecc=H&margin=2&format=png&label=My%20QR%20Code" -o qrcode.png

# Generate SVG format
curl "https://qr-code.thinkgin.com/qrcode?data=https://github.com&format=svg" -o qrcode.svg
```

## 💻 Code Examples

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
    `https://qr-code.thinkgin.com/qrcode?${params.toString()}`
  );
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

    url = f"https://qr-code.thinkgin.com/qrcode?{urlencode(params)}"
    response = requests.get(url)

    with open('qrcode.png', 'wb') as f:
        f.write(response.content)

    print('QR code saved successfully: qrcode.png')

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

  const url = `https://qr-code.thinkgin.com/qrcode?${params.toString()}`;
  const file = fs.createWriteStream("qrcode.png");

  https.get(url, (response) => {
    response.pipe(file);
    file.on("finish", () => {
      file.close();
      console.log("QR code saved successfully: qrcode.png");
    });
  });
}

generateQRCode();
```

### PHP

```php
<?php
function generateQRCode() {
    $params = http_build_query([
        'data' => 'https://example.com',
        'size' => '300',
        'color' => '000000',
        'bgcolor' => 'ffffff',
        'ecc' => 'M',
        'margin' => '1',
        'format' => 'png'
    ]);

    $url = "https://qr-code.thinkgin.com/qrcode?" . $params;

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

generateQRCode();
?>
```

### Go

```go
package main

import (
    "fmt"
    "io"
    "net/http"
    "net/url"
    "os"
)

func generateQRCode() error {
    params := url.Values{}
    params.Set("data", "https://example.com")
    params.Set("size", "300")
    params.Set("color", "000000")
    params.Set("bgcolor", "ffffff")
    params.Set("ecc", "M")
    params.Set("margin", "1")
    params.Set("format", "png")

    apiURL := "https://qr-code.thinkgin.com/qrcode?" + params.Encode()

    resp, err := http.Get(apiURL)
    if err != nil {
        return fmt.Errorf("request failed: %v", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return fmt.Errorf("failed to generate QR code: %d", resp.StatusCode)
    }

    file, err := os.Create("qrcode.png")
    if err != nil {
        return fmt.Errorf("failed to create file: %v", err)
    }
    defer file.Close()

    _, err = io.Copy(file, resp.Body)
    if err != nil {
        return fmt.Errorf("failed to save file: %v", err)
    }

    fmt.Println("QR code saved successfully: qrcode.png")
    return nil
}

func main() {
    if err := generateQRCode(); err != nil {
        fmt.Printf("Error: %v\n", err)
    }
}
```

### cURL

```bash
# Basic usage
curl "https://qr-code.thinkgin.com/qrcode?data=https://example.com" \
  -o qrcode.png

# Complete parameters example
curl "https://qr-code.thinkgin.com/qrcode?data=https://example.com&size=400&color=FF0000&bgcolor=FFFF00&ecc=H&margin=2&format=png" \
  -o qrcode.png

# Generate SVG format
curl "https://qr-code.thinkgin.com/qrcode?data=Hello%20World&format=svg" \
  -o qrcode.svg

# Using variables
URL="https://example.com"
SIZE="500"
COLOR="000000"
BGCOLOR="ffffff"

curl "https://qr-code.thinkgin.com/qrcode?data=${URL}&size=${SIZE}&color=${COLOR}&bgcolor=${BGCOLOR}" \
  -o qrcode.png

echo "QR code saved as qrcode.png"
```

## 💡 Usage Tips

- **URL Encoding**: Ensure special characters in the data parameter are URL-encoded
- **Color Format**: Use 6-digit hexadecimal color codes without the # symbol
- **Size Limits**: Recommended size range is 100-1000 pixels
- **Caching**: Requests with identical parameters are cached for 1 hour
- **CORS Support**: API supports CORS for direct browser calls
- **Error Correction Levels**: L=7%, M=15%, Q=25%, H=30% error recovery
- **Label Feature**: When label parameter is provided, a label-supporting API service is used
- **Image Formats**: Supports PNG, JPG, GIF, SVG output formats

## 🛠️ Local Development

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
```

4. **Access Application**

```
http://localhost:3000
```

## 🚀 Deploy to Cloudflare Pages

### Method 1: Git Repository Deployment (Recommended)

1. Fork this repository to your GitHub account
2. Login to [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Go to "Pages" section
4. Click "Create a project"
5. Select "Connect to Git"
6. Choose your GitHub repository
7. Configure build settings:
   - **Framework preset**: None
   - **Build command**: Leave empty
   - **Build output directory**: `/`
8. Click "Save and Deploy"

### Method 2: Wrangler CLI Deployment

1. **Install Wrangler CLI**

```bash
npm install -g wrangler
```

2. **Login to Cloudflare**

```bash
wrangler login
```

3. **Deploy Project**

```bash
wrangler pages publish . --project-name=qrcode-generator
```

## 📁 Project Structure

```
qrcode/
├── index.html          # Main page
├── functions/
│   └── qrcode.js      # Cloudflare Function API
├── _redirects         # Redirect rules
├── wrangler.toml      # Cloudflare configuration
├── package.json       # Project configuration
├── server.js          # Local development server
├── icon.png           # Site icon
├── README.md          # Chinese documentation
└── README_EN.md       # English documentation
```

## 🔧 Tech Stack

- **Frontend**: HTML5 + CSS3 + Vanilla JavaScript
- **Backend**: Cloudflare Functions (Workers)
- **QR Generation**: QR Server API + QuickChart.io API
- **Deployment**: Cloudflare Pages
- **CDN**: Cloudflare Global Network

## 📝 Changelog

### v2.1.0 (2025-01-XX)

- ✨ Added label parameter support
- ✨ Display complete API request URL
- 🎨 Optimized user interface design
- 📚 Enhanced API documentation and code examples

### v2.0.0 (2025-01-XX)

- ✨ Refactored to Cloudflare Pages application
- ✨ Added multiple customization parameter support
- ✨ Provided complete API documentation
- 📱 Responsive design optimization

### v1.0.0 (2025-01-XX)

- 🎉 Initial release
- ✨ Basic QR code generation functionality

## 🤝 Contributing

We welcome Issues and Pull Requests!

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source under the [MIT License](LICENSE).

## 🔗 Related Links

- **Live Demo**: [https://qr-code.thinkgin.com/](https://qr-code.thinkgin.com/)
- **GitHub Repository**: [https://github.com/thinkgin/qrcode](https://github.com/thinkgin/qrcode)
- **Cloudflare Pages**: [https://pages.cloudflare.com/](https://pages.cloudflare.com/)
- **Cloudflare Functions**: [https://developers.cloudflare.com/pages/functions/](https://developers.cloudflare.com/pages/functions/)

---

⭐ If this project helps you, please give it a star!
