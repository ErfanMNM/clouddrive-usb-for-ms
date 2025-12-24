# CloudDrive USB - VirtualDrive Ultra

Ứng dụng quản lý dữ liệu dự án tập trung với giao diện giống USB Drive, tích hợp AI để phân loại và quản lý tài liệu tự động.

## ✨ Tính năng

- 📁 **Quản lý tài liệu dự án**: Tổ chức file theo danh mục (Thông tin dự án, Tài liệu, Mã nguồn, File khác)
- 🤖 **AI phân loại tự động**: Sử dụng Google Gemini AI để phân tích và phân loại file từ Google Drive links
- 💾 **Hiển thị dung lượng**: Theo dõi dung lượng đã sử dụng và tổng dung lượng
- 🎨 **Giao diện hiện đại**: Dark theme với hiệu ứng mượt mà
- 📱 **Responsive**: Tương thích với mọi thiết bị

## 🚀 Cài đặt

### Yêu cầu

- Node.js >= 18.x
- npm hoặc yarn

### Cài đặt dependencies

```bash
npm install
```

## 🛠️ Phát triển

### Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

### Build cho production

```bash
npm run build
```

File build sẽ được tạo trong thư mục `dist/`

### Preview build

```bash
npm run preview
```

## 🔧 Cấu hình

### Environment Variables

Tạo file `.env` trong thư mục gốc với nội dung:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**Lưu ý**: Bạn cần có API key từ Google Gemini để sử dụng tính năng phân loại tự động.

## 📦 Deploy lên Cloudflare Pages

### Cách 1: Sử dụng Cloudflare Pages Dashboard (Khuyến nghị)

1. Đăng nhập vào [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Vào **Pages** > **Create a project**
3. Kết nối repository GitHub/GitLab của bạn
4. Cấu hình build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Deploy command**: (để trống)
5. Thêm Environment Variable:
   - **Variable name**: `GEMINI_API_KEY`
   - **Value**: API key của bạn
6. Click **Save and Deploy**

### Cách 2: Sử dụng Wrangler CLI

1. Cài đặt Wrangler (nếu chưa có):
```bash
npm install -g wrangler
```

2. Đăng nhập vào Cloudflare:
```bash
wrangler login
```

3. Deploy:
```bash
npm run deploy
```

Hoặc:
```bash
wrangler pages deploy dist
```

## 📁 Cấu trúc dự án

```
clouddrive-usb/
├── components/          # React components
│   ├── AddModal.tsx     # Modal thêm file mới
│   ├── DetailPanel.tsx  # Panel chi tiết file
│   ├── FileCard.tsx     # Card hiển thị file
│   └── UsbHeader.tsx    # Header với thông tin storage
├── services/            # Services
│   └── geminiService.ts # Service tích hợp Gemini AI
├── public/              # Static files
│   └── _redirects      # Cloudflare Pages redirects
├── App.tsx              # Component chính
├── index.tsx            # Entry point
├── types.ts             # TypeScript types
├── vite.config.ts       # Vite configuration
├── wrangler.toml        # Cloudflare Pages config
└── package.json         # Dependencies
```

## 🎯 Cách sử dụng

1. **Xem danh sách file**: File được tự động phân loại theo danh mục
2. **Xem chi tiết file**: Click vào file card để xem thông tin chi tiết
3. **Thông tin dự án**: File "Thông tin dự án" sẽ hiển thị tên và mô tả dự án ở header

## 🛡️ Bảo mật

- Không commit file `.env` vào Git
- API keys được lưu trong environment variables
- File `.gitignore` đã được cấu hình để bỏ qua các file nhạy cảm

## 📝 License

Private project - Mbox by Mte

## 👨‍💻 Tác giả

Ứng dụng quản lý dữ liệu Mbox by Mte

---

**Lưu ý**: Đây là ứng dụng demo, một số tính năng có thể cần cấu hình thêm để hoạt động đầy đủ.
