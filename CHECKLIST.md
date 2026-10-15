# CHECKLIST

## Trạng thái hiện tại

- Cập nhật lần cuối: 2026-10-15
- Đang làm: React Hook Form + Zod cho form sản phẩm (admin).
- Bước tiếp theo: giai đoạn **P0 — Khẩn cấp** của lộ trình review: sửa đăng nhập (ERR-01), salt bcrypt (SEC-02),
  middleware xác thực/phân quyền cho route ghi sản phẩm (SEC-01); sau đó tới error handler (ERR-02) và nối FE login vào BE.
- Điểm review gần nhất: 4,75/10 (Chưa đạt, chấm theo chuẩn sản phẩm hoàn chỉnh) — xem `review-source/`
- Thống kê vấn đề còn mở: Critical 1 · High 4 · Medium 16 · Low 6
- Ghi chú: mã `[XXX-NN]` tham chiếu `review-source/01-VAN-DE-VA-RUI-RO.md`. Đăng nhập hiện luôn lỗi 500 (ERR-01).

## Công việc

- [x] Day 04: React props/state, React Router, ProtectedRoute
- [x] Day 05: useEffect, custom hook, useCRUD
- [x] React Hook Form + Zod (ProductFormPage)
- [x] Setup monorepo: `package.json` gốc (script `--prefix`), `.gitignore` gốc, `backend/.env.example`, CLAUDE.md
- [ ] [P5][DOC-01] Viết `docs/` (chạy skill `docs-du-an`)

### Stub / chỗ dở đã biết (để dành cho các buổi sau, chưa sửa)

- [ ] [P0][SEC-01] BE `shared/middlewares/auth.js`: `checkAuthentication`, `checkRoles` đang rỗng; route ghi
      của product chưa được bảo vệ (dòng `productRoutes.use` đang bị comment).
- [ ] [P1][ERR-02] BE `errorHandler` rỗng và sai signature (cần nhận `(err, req, res, next)`).
- [ ] [P0][ERR-01] BE `utils/jwt.js`: `verifyAccessToken` và `verifyRefreshToken` rỗng; `signRefreshToken` ký
      `userId` dạng thô thay vì object `{ userId }`. (Review: lỗi này làm đăng nhập luôn trả 500.)
- [ ] [P3][ARCH-01][BE-01] BE auth: `refreshToken`, `logout`, `verifyEmail`, `loginWithGoogle` chưa làm; controller
      gọi model `User` trực tiếp; response trả `user` thay vì `data`.
- [ ] [P2][VAL-01] BE `product.schema.js` rỗng nên route product chưa được validate.
- [ ] [P2][SEC-03][ERR-04] BE `CORS_ORIGIN` đã có trong env nhưng chưa dùng; khi `DB_URI`/JWT secret trống thì
      lúc khởi động chưa báo "chưa điền".
- [ ] [P4][SEC-04][ARCH-02] FE `ProtectedRoute` dùng user giả hard-code.
- [ ] [P4][FE-03][FE-02] FE `ProductFormPage` import `zodResolver` qua đường dẫn `node_modules` tương đối
      (nên đổi thành `@hookform/resolvers/zod`) và gọi `fetchById` cả khi đang ở chế độ thêm mới.
- [ ] [P4][FE-01] FE `/auth` có 2 route `register` (route thứ 2 lẽ ra là `forgot-password`).
- [ ] [P4][CODE-02] FE `categoryAPI` đã có nhưng BE chưa có module category.
- [ ] [P2][FE-04] FE `baseURL` của API đang hard-code, chưa đọc từ env Vite.
- [ ] [P1][CODE-01] FE `npm run lint`: 9 error, 2 warning trong `useCRUD.js` và `useProducts.js` (biến `error` không
      dùng trong `catch`, `react-hooks/set-state-in-effect`), cộng một warning `exhaustive-deps`
      ở `ProductFormPage.jsx`.

### Lộ trình cải thiện (review 2026-10-15)

Task mới từ review, xếp theo thứ tự refactor an toàn. Các task ở mục "Stub" phía trên có tag `[Px]` để biết thuộc giai đoạn nào.

#### P0 — Khẩn cấp

- Task cũ thuộc giai đoạn này: SEC-01, ERR-01 (mục Stub).
- [ ] [SEC-02] `password.js`: bỏ salt cấp module, dùng `bcrypt.hash(pw, 10)` / `bcrypt.compare` (async, nhớ `await`) — Hoàn thành khi: đăng ký 2 user cùng mật khẩu thì 2 hash trong DB khác nhau, user cũ vẫn đăng nhập được
- [ ] [SEC-01] Kiểm thử thủ công phân quyền sau khi viết middleware — Hoàn thành khi: POST/PUT/DELETE `/api/products` không token → 401, token member → 403, token admin → 2xx

#### P1 — Lưới an toàn

- Task cũ thuộc giai đoạn này: ERR-02, CODE-01 (mục Stub).
- [ ] [ERR-02] Thêm `notFound` và map lỗi trong `errorHandler` (CastError/ValidationError → 400, 11000 → 409, JWT → 401, khác → 500 thông điệp chung) — Hoàn thành khi: `GET /api/abc` → 404 JSON ngay, `GET /api/products/123` → 400 JSON, không response nào chứa stack trace
- [ ] [OPS-01] Thêm `.prettierrc`, `.prettierignore`, `.editorconfig`, `.nvmrc` (22) và script `format`/`format:check` ở gốc; BE thêm script `start` — Hoàn thành khi: `npm run format:check` chạy qua
- [ ] [CODE-01] Thêm ESLint cho backend (môi trường Node) và script `lint` — Hoàn thành khi: `npm --prefix backend run lint` chạy được, 0 error
- [ ] [TEST-01][BE-02] Tách `src/app.js` (export app) khỏi `server.js`, cài Vitest + Supertest + mongodb-memory-server, viết smoke test register/login — Hoàn thành khi: `npm --prefix backend test` pass, test login bắt được lỗi kiểu ERR-01

#### P2 — Nền tảng backend

- Task cũ thuộc giai đoạn này: VAL-01, SEC-03/ERR-04, FE-04 (mục Stub).
- [ ] [ERR-03] `connectDB` trả promise; `await connectDB()` trước `listen`; lỗi → log + `process.exit(1)`; thêm `return` khi listen lỗi — Hoàn thành khi: sai `DB_URI` thì server thoát ngay với thông báo rõ
- [ ] [ERR-04] Validate env bằng Zod lúc khởi động; chọn file `.env.${NODE_ENV}` hoặc bỏ các file `.env.*` không dùng (nhớ đồng bộ `.env.example`) — Hoàn thành khi: thiếu `JWT_ACCESS_SECRET` thì server không khởi động và in "chưa điền"
- [ ] [VAL-01] Viết `createProductSchema`, `updateProductSchema`, `idParamSchema` (ObjectId); gắn `validate({ body, params })`; controller dùng `req.validated` — Hoàn thành khi: title < 3 ký tự hoặc giá âm → 400, quy tắc khớp schema FE
- [ ] [BE-01] Thêm `shared/utils/response.js` (`sendSuccess`) và định dạng lỗi `{ success, error: { code, message, details } }`; cập nhật `useCRUD` FE theo định dạng mới — Hoàn thành khi: mọi endpoint (product, auth, validate, lỗi) cùng một định dạng
- [ ] [DB-01] `user.model.js`: email `lowercase: true, trim: true`; `product.service.js` update dùng `{ returnDocument: "after", runValidators: true }` — Hoàn thành khi: đăng ký `A@x.com` sau `a@x.com` → 409; không còn cảnh báo deprecated `new`
- [ ] [SEC-03] Rate limit `/api/auth`, `helmet`, `express.json({ limit })` (thêm dependency — hỏi trước khi cài) — Hoàn thành khi: gọi login sai liên tục bị chặn 429

#### P3 — Modular backend

- Task cũ thuộc giai đoạn này: ARCH-01/BE-01 (mục Stub).
- [ ] [ARCH-01] Chuyển nghiệp vụ register/login vào `auth.service.js` (service ném lỗi, controller chỉ gọi + trả response); đọc `req.validated.body`; bỏ import thừa `jwt`, `envConfig` — Hoàn thành khi: `auth.controller.js` không import `User`, test auth pass
- [ ] [TEST-01] Test route sản phẩm: 401/403/400/200 — Hoàn thành khi: `npm --prefix backend test` pass

#### P4 — Frontend

- Task cũ thuộc giai đoạn này: SEC-04/ARCH-02, FE-03/FE-02, FE-01, CODE-02 (mục Stub).
- [ ] [FE-01] Đưa `createBrowserRouter` ra cấp module; `/auth` dùng `layouts/common/Layout` thay vì ClientLayout — Hoàn thành khi: mọi route chạy như cũ, `/auth/forgot-password` hiển thị đúng trang
- [ ] [FE-02] `create`/`update` trong `useCRUD` trả kết quả hoặc ném lỗi; form chỉ chuyển trang khi lưu thành công; trang form không tự tải danh sách — Hoàn thành khi: tắt BE rồi bấm lưu thì form giữ nguyên dữ liệu; tab Network ở trang thêm mới không có request nào
- [ ] [CODE-02] Xoá `useProducts.js`, code comment-out (`BE/index.js:11`, `BE/src/routes/index.js:9-10`, `ProductFormPage.jsx:22-24`), `console.log` thừa, `<Link>` rỗng ở sidebar — Hoàn thành khi: grep không còn các mục trên
- [ ] [FE-05] `id` + `htmlFor` cho label, `type="submit"`, empty state cho bảng, loading riêng khi xoá, `index.html` `lang="vi"` + title — Hoàn thành khi: click label thì focus đúng input
- [ ] [CODE-03] Đổi tên `AdminSibebar` → `AdminSidebar`, `constanst` → `constants`, `optionsShema` → `optionsSchema`; thống nhất ngôn ngữ message API — Hoàn thành khi: build + lint pass sau khi đổi tên (commit riêng)
- [ ] [ARCH-02] (gắn với bài TanStack Query/Zustand) Đưa `frontend/api/` vào `src/` (`shared/lib/http.js` + `features/products/api.js`); thay `useCRUD` bằng TanStack Query; Zustand cho phiên đăng nhập, `ProtectedRoute` đọc từ store — Hoàn thành khi: không còn import `../../../../api`, CRUD sản phẩm chạy như cũ

#### P5 — Hoàn thiện

- Task cũ thuộc giai đoạn này: DOC-01 (mục đầu).
- [ ] [DOC-01] README gốc: yêu cầu (Node 22, MongoDB), cài đặt `npm run install:all`, chạy `npm run dev`, cấu trúc, danh sách API — Hoàn thành khi: người mới clone chạy được trong 10 phút
- [ ] [BE-03] `toJSON` toàn cục trả `id` thay vì `_id`, sửa 8 chỗ dùng `_id` ở FE trong cùng commit — Hoàn thành khi: response không còn `_id`, CRUD FE chạy như cũ
- [ ] [SEC-04] Access token 15–30 phút + luồng refresh; `password` `select: false` — Hoàn thành khi: query User mặc định không trả password

#### Không nên làm lúc này

- Chuyển sang npm workspaces / `apps/` — lý do: đã chốt monorepo nhẹ; chỉ cân nhắc lại sau khi sửa FE-03
- `packages/shared` dùng chung schema FE/BE — lý do: chuẩn khoá học không khuyến nghị
- Chuyển sang TypeScript ngay — lý do: lệch tiến trình bài học, dự án còn nhỏ
- [DB-02] migrate-mongo, phân trang `getAll`, giá lưu số nguyên — lý do: dữ liệu học tập nhỏ, chưa có thanh toán; làm khi dữ liệu tăng
- Docker/CI đầy đủ, `/api/v1`, logger — lý do: YAGNI ở quy mô hiện tại

## Quyết định đã chốt

- Monorepo nhẹ: không dùng npm workspaces, mỗi app giữ lockfile riêng, gốc chỉ có script
  `npm --prefix` (2026-10-15 → xem lý do trong CLAUDE.md).
- CLAUDE.md đặt ở gốc và trong mỗi app; bản gốc có chép khối quy tắc chung rút gọn vì repo dùng chung.
- Mọi file env thật đều bị gitignore, chỉ commit `.env.example`.

## Lịch sử review

- 2026-10-15 — review-fullstack-js (chế độ đầy đủ): 4,75/10 (Chưa đạt), 27 vấn đề (Critical 1 · High 4 · Medium 16 · Low 6)
