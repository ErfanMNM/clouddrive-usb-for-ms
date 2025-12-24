# 🔧 Hướng dẫn khắc phục lỗi Cloudflare Pages Deploy

## ❌ Lỗi thường gặp

```
✘ [ERROR] It looks like you've run a Workers-specific command in a Pages project.
For Pages, please run `wrangler pages deploy` instead.
```

## ✅ Giải pháp

### Bước 1: Vào Cloudflare Pages Settings

1. Đăng nhập vào [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Vào **Pages** > Chọn project của bạn
3. Vào **Settings** > **Builds & deployments**

### Bước 2: Xóa hoặc sửa Deploy Command

**Tìm mục "Deploy command" và:**

- **Cách 1 (Khuyến nghị)**: **XÓA HOÀN TOÀN** deploy command (để trống)
- **Cách 2**: Nếu muốn giữ, đổi thành: `npx wrangler pages deploy dist`

### Bước 3: Kiểm tra Build Settings

Đảm bảo các settings sau đúng:

- ✅ **Build command**: `npm run build`
- ✅ **Build output directory**: `dist`
- ✅ **Deploy command**: (để trống) hoặc `npx wrangler pages deploy dist`

### Bước 4: Lưu và Deploy lại

Click **Save** và trigger một deployment mới.

## 📝 Lưu ý

- Cloudflare Pages **tự động deploy** thư mục `dist` sau khi build
- **KHÔNG CẦN** deploy command nếu đã set đúng build output directory
- Chỉ dùng `wrangler pages deploy` (không phải `wrangler deploy`) khi deploy thủ công

## 🎯 Cấu hình đúng

```
Build command:        npm run build
Build output dir:      dist
Deploy command:        (để trống)
```

