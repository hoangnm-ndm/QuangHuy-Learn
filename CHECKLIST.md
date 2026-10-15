# CHECKLIST

## Trạng thái hiện tại

- Đang làm: React Hook Form + Zod cho form sản phẩm (admin).
- Bước tiếp theo: hoàn thiện auth (middleware xác thực, phân quyền, error handler), nối FE login vào BE.

## Công việc

- [x] Day 04: React props/state, React Router, ProtectedRoute
- [x] Day 05: useEffect, custom hook, useCRUD
- [x] React Hook Form + Zod (ProductFormPage)
- [x] Setup monorepo: `package.json` gốc (script `--prefix`), `.gitignore` gốc, `backend/.env.example`, CLAUDE.md
- [ ] Viết `docs/` (chạy skill `docs-du-an`)

### Stub / chỗ dở đã biết (để dành cho các buổi sau, chưa sửa)

- [ ] BE `shared/middlewares/auth.js`: `checkAuthentication`, `checkRoles` đang rỗng; route ghi
      của product chưa được bảo vệ (dòng `productRoutes.use` đang bị comment).
- [ ] BE `errorHandler` rỗng và sai signature (cần nhận `(err, req, res, next)`).
- [ ] BE `utils/jwt.js`: `verifyAccessToken` và `verifyRefreshToken` rỗng; `signRefreshToken` ký
      `userId` dạng thô thay vì object `{ userId }`.
- [ ] BE auth: `refreshToken`, `logout`, `verifyEmail`, `loginWithGoogle` chưa làm; controller
      gọi model `User` trực tiếp; response trả `user` thay vì `data`.
- [ ] BE `product.schema.js` rỗng nên route product chưa được validate.
- [ ] BE `CORS_ORIGIN` đã có trong env nhưng chưa dùng; khi `DB_URI`/JWT secret trống thì
      lúc khởi động chưa báo "chưa điền".
- [ ] FE `ProtectedRoute` dùng user giả hard-code.
- [ ] FE `ProductFormPage` import `zodResolver` qua đường dẫn `node_modules` tương đối
      (nên đổi thành `@hookform/resolvers/zod`) và gọi `fetchById` cả khi đang ở chế độ thêm mới.
- [ ] FE `/auth` có 2 route `register` (route thứ 2 lẽ ra là `forgot-password`).
- [ ] FE `categoryAPI` đã có nhưng BE chưa có module category.
- [ ] FE `baseURL` của API đang hard-code, chưa đọc từ env Vite.
- [ ] FE `npm run lint`: 9 error, 2 warning trong `useCRUD.js` và `useProducts.js` (biến `error` không
      dùng trong `catch`, `react-hooks/set-state-in-effect`), cộng một warning `exhaustive-deps`
      ở `ProductFormPage.jsx`.

## Quyết định đã chốt

- Monorepo nhẹ: không dùng npm workspaces, mỗi app giữ lockfile riêng, gốc chỉ có script
  `npm --prefix` (2026-10-15 → xem lý do trong CLAUDE.md).
- CLAUDE.md đặt ở gốc và trong mỗi app; bản gốc có chép khối quy tắc chung rút gọn vì repo dùng chung.
- Mọi file env thật đều bị gitignore, chỉ commit `.env.example`.
