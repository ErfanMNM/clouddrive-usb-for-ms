# 🔧 Hướng dẫn khắc phục lỗi Cloudflare Pages Deploy

## ❌ Lỗi thường gặp

### Lỗi 1: Workers command trong Pages project
```
✘ [ERROR] It looks like you've run a Workers-specific command in a Pages project.
For Pages, please run `wrangler pages deploy` instead.
```

### Lỗi 2: Authentication error (Lỗi hiện tại)
```
✘ [ERROR] A request to the Cloudflare API failed.
Authentication error [code: 10000]
Please ensure it has the correct permissions for this operation.
```

**Nguyên nhân**: Khi dùng Cloudflare Pages Dashboard với Git integration, **KHÔNG CẦN** deploy command. Cloudflare tự động deploy sau khi build xong.

## ✅ Giải pháp

### Bước 1: Vào Cloudflare Pages Settings

1. Đăng nhập vào [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Vào **Pages** > Chọn project của bạn
3. Vào **Settings** > **Builds & deployments**

### Bước 2: Cấu hình Deploy Command

**⚠️ QUAN TRỌNG**: Nếu "Deploy command" là **bắt buộc** (có dấu "Required"), hãy điền:

```
echo "Deploying to Cloudflare Pages..."
```

Hoặc đơn giản hơn:
```
true
```

**Lý do**: 
- Cloudflare Pages Dashboard tự động deploy thư mục `dist` sau khi build
- Deploy command bắt buộc nhưng không cần thực sự deploy (vì đã tự động)
- Dùng `echo` hoặc `true` để thỏa mãn yêu cầu bắt buộc mà không gây lỗi authentication

### Bước 3: Kiểm tra Build Settings

Đảm bảo các settings sau đúng:

- ✅ **Build command**: `npm run build`
- ✅ **Build output directory**: `dist`
- ✅ **Deploy command**: (để trống) hoặc `npx wrangler pages deploy dist`

### Bước 4: Lưu và Deploy lại

Click **Save** và trigger một deployment mới.

## 📝 Lưu ý quan trọng

- ✅ Cloudflare Pages **tự động deploy** thư mục `dist` sau khi build
- ✅ **KHÔNG CẦN** deploy command khi dùng Dashboard với Git integration
- ✅ Deploy command chỉ dùng khi deploy thủ công từ local: `wrangler pages deploy dist`
- ❌ **KHÔNG** dùng deploy command trong Cloudflare Pages build settings
- ❌ Nếu dùng deploy command trong build settings sẽ gặp lỗi authentication

## 🎯 Cấu hình đúng

### Nếu Deploy command là Optional:
```
Build command:        npm run build
Build output dir:      dist
Deploy command:        (để trống)
```

### Nếu Deploy command là Required (bắt buộc):
```
Build command:        npm run build
Build output dir:      dist
Deploy command:        echo "Deploying to Cloudflare Pages..."
```

Hoặc:
```
Deploy command:        true
```

