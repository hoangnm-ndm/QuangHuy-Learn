# 01 — Vấn đề và rủi ro

Độ chắc chắn: **Đã xác nhận** (đọc được trong code hoặc source thư viện) · **Rủi ro tiềm ẩn** (chưa xảy ra nhưng sẽ xảy ra khi điều kiện thay đổi) · **Chưa đủ dữ liệu**.

Đường dẫn: `BE` = `backend/`, `FE` = `frontend/`.

## Bảng tổng hợp

| Mã | Nhãn | Mức độ | Nhóm | Vị trí | Vấn đề | Hướng xử lý |
|---|---|---|---|---|---|---|
| SEC-01 | NGUYÊN TẮC | Critical | Bảo mật | `BE/src/modules/product/product.route.js:13-16` | Route POST/PUT/DELETE sản phẩm không có xác thực/phân quyền | Viết `checkAuthentication`, `checkRoles` rồi gắn vào route ghi |
| ERR-01 | NGUYÊN TẮC | High | Nghiệp vụ | `BE/src/shared/utils/jwt.js:9-12` | Đăng nhập luôn 500: `jwt.sign` nhận ObjectId làm payload | Ký `{ userId: String(id) }` |
| ERR-02 | NGUYÊN TẮC | High | Xử lý lỗi | `BE/src/shared/middlewares/errorHandler.js:1-3` | `errorHandler` rỗng, 0 tham số → lỗi trả stack trace, route lạ bị treo | Viết `(err, req, res, next)` và thêm `notFound` |
| SEC-02 | NGUYÊN TẮC | High | Bảo mật | `BE/src/shared/utils/password.js:3` | Một salt bcrypt dùng chung cho mọi mật khẩu | `bcrypt.hash(password, 10)` mỗi lần |
| VAL-01 | NGUYÊN TẮC | High | Validation | `BE/src/modules/product/*` | Route sản phẩm không validate, đưa thẳng `req.body` vào DB | Viết `product.schema.js` (Zod), gắn `validate`, dùng `req.validated` |
| ERR-03 | NGUYÊN TẮC | Medium | Backend | `BE/src/config/db.config.js:4-13`, `BE/index.js:16-27` | Không chờ kết nối DB, lỗi kết nối bị nuốt, listen trước | `await connectDB()` rồi mới listen; lỗi thì `process.exit(1)` |
| ERR-04 | NGUYÊN TẮC | Medium | Xử lý lỗi | `BE/src/config/env.config.js` | Env không validate lúc khởi động; các file `.env.*` khác không bao giờ được load | Validate env bằng Zod, báo rõ biến "chưa điền" |
| SEC-03 | NGUYÊN TẮC | Medium | Bảo mật | `BE/index.js:9-14` | CORS mở mọi origin, không helmet, không rate limit auth, không giới hạn body | Đọc `CORS_ORIGIN`, thêm rate limit cho `/auth` |
| BE-01 | NGUYÊN TẮC | Medium | Backend | product/auth controller, `validate.js` | Mỗi nơi trả response một định dạng khác | Helper response và định dạng lỗi chung |
| ARCH-01 | NGUYÊN TẮC | Medium | Backend | `BE/src/modules/auth/auth.controller.js` | Controller auth chứa nghiệp vụ, gọi `User` trực tiếp, đọc `req.body` thay vì `req.validated` | Chuyển nghiệp vụ sang `auth.service.js` |
| DB-01 | NGUYÊN TẮC | Medium | Database | `user.model.js:6-10`, `product.service.js:17` | Email không `lowercase/trim`; update không `runValidators`; option `new` đã deprecated | Sửa schema và option update |
| FE-01 | NGUYÊN TẮC | Medium | Frontend | `FE/src/routes/AppRoute.jsx` | `/auth` dùng nhầm ClientLayout, khai báo `register` 2 lần, tạo router trong component | Sửa import/path, đưa router ra ngoài component |
| FE-02 | NGUYÊN TẮC | Medium | Frontend | `ProductFormPage.jsx`, `useCRUD.js` | Form gọi `fetchById(undefined)` ở chế độ thêm; tải danh sách thừa; chuyển trang dù lưu thất bại | Chỉ fetch khi có `id`; tách hook; trả kết quả hoặc ném lỗi |
| FE-03 | NGUYÊN TẮC | Medium | Frontend | `ProductFormPage.jsx:6` | Import `zodResolver` bằng đường dẫn tương đối vào `node_modules/.../src` | `import { zodResolver } from "@hookform/resolvers/zod"` |
| FE-04 | NGUYÊN TẮC | Medium | Frontend | `FE/api/index.js:4` | `baseURL` hard-code localhost, không env | `import.meta.env.VITE_API_URL` + `frontend/.env.example` |
| CODE-01 | NGUYÊN TẮC | Medium | Clean code | `useCRUD.js`, `useProducts.js`, `ProductFormPage.jsx` | `npm run lint` FE: 9 error, 2 warning; BE không có lint | Sửa lỗi lint, thêm ESLint cho BE |
| CODE-02 | NGUYÊN TẮC | Medium | Clean code | nhiều file (xem chi tiết) | Code chết và trùng lặp: `useProducts`, `Button`, `categoryAPI`, code comment-out | Xoá hoặc gom lại |
| TEST-01 | NGUYÊN TẮC | Medium | Kiểm thử | toàn repo | Không có test nào | Vitest + Supertest cho auth và product |
| DOC-01 | NGUYÊN TẮC | Medium | Tài liệu | gốc repo, `docs/` | Không README gốc, README FE là template, `docs/` trống, không API docs | README + `docs/` (skill `docs-du-an`) |
| ARCH-02 | CHUẨN | Medium | Frontend | `FE/src` | Chưa có `features/`, chưa dùng TanStack Query/Zustand, `api/` nằm ngoài `src/` | Lộ trình P4 (cơ hội nâng cấp) |
| OPS-01 | CHUẨN | Medium | Vận hành | gốc repo, `BE/package.json` | Thiếu Prettier, `.editorconfig`, `.nvmrc`, husky; BE thiếu script `start`/`lint` | Thêm cấu hình gốc |
| SEC-04 | NGUYÊN TẮC | Low | Bảo mật | `jwt.js:6`, `user.model.js`, `ProtectedRoute.jsx:4-7` | Access token 1h, `password` không `select: false`, FE dùng user giả | Rút ngắn TTL, `select: false`, store phiên |
| FE-05 | NGUYÊN TẮC | Low | Frontend | `ProductFormPage.jsx`, `ProductManagement.jsx`, `index.html` | Label không gắn input, thiếu empty state, `loading` dùng chung, `lang="en"` | Sửa semantic/a11y nhỏ |
| CODE-03 | NGUYÊN TẮC | Low | Clean code | nhiều file | Tên sai chính tả, export lệch kiểu, ngôn ngữ message lẫn lộn | Đổi tên dần |
| BE-02 | CHUẨN | Low | Backend | `BE/index.js` | Chưa tách `app.js`/`server.js`, chưa có `/api/v1`, `/health`, graceful shutdown | Tách khi bắt đầu viết test |
| BE-03 | CHUẨN | Low | Backend | toàn API + 8 chỗ FE | API trả `_id` thay vì `id` | `toJSON` toàn cục, sửa FE cùng lần |
| DB-02 | CHUẨN | Low | Database | `product.service.js:9`, `product.model.js` | Chưa có migration; `getAll` không phân trang; giá dùng `Number` | Để giai đoạn sau |

## Chi tiết

### SEC-01 — Route ghi sản phẩm không có xác thực, phân quyền

- **Nhãn / Mức độ / Độ chắc chắn**: `[NGUYÊN TẮC]` · Critical · Đã xác nhận
- **Bằng chứng**: `product.route.js:13` dòng `productRoutes.use(checkAuthentication, checkRoles([...]))` đang bị comment; các dòng 14-16 khai báo `put`, `delete`, `post` không có middleware nào. `shared/middlewares/auth.js:1` (`checkAuthentication`) là hàm rỗng; `auth.js:3-5` (`checkRoles`) chỉ `console.log`.
- **Nguyên nhân**: phần auth đang học dở. Middleware chưa viết xong nên tạm comment để CRUD chạy được.
- **Ảnh hưởng**: bất kỳ ai biết URL đều tạo, sửa, xoá được toàn bộ sản phẩm (ví dụ `curl -X DELETE /api/products/<id>`), tức là có thể mất dữ liệu. Ngoài ra, nếu chỉ bỏ comment mà giữ nguyên middleware hiện tại thì mọi request ghi sẽ bị **treo**, vì cả hai hàm không trả response và không gọi `next()`.
- **Hướng xử lý**:
  1. Viết `verifyAccessToken` trong `jwt.js`.
  2. `checkAuthentication` đọc `Authorization: Bearer <token>`, verify, tìm user và gắn vào `req.user`, sai thì trả 401.
  3. `checkRoles(roles)` so `req.user.roles` với `roles`, không khớp thì trả 403.
  4. Gắn vào route ghi.
- **Ghi chú ngữ cảnh**: repo chưa deploy nên rủi ro thực tế lúc này thấp, nhưng đây là điều kiện bắt buộc trước khi đưa lên môi trường thật.

### ERR-01 — Đăng nhập luôn trả lỗi 500

- `[NGUYÊN TẮC]` · High · Đã xác nhận (đọc source thư viện; chưa gọi request thật vì cần DB)
- **Bằng chứng**:
  - `auth.controller.js:57` gọi `signRefreshToken(userExist._id)`.
  - `jwt.js:10` gọi `jwt.sign(userId, ...)`, với payload là ObjectId: kiểu `object` nhưng không phải object thuần.
  - Trong `jsonwebtoken@9.0.3/sign.js:94-95,142-147`, payload kiểu object được đưa vào `validatePayload`, và `sign.js:43-44` ném `Expected "payload" to be a plain object.`
- **Ảnh hưởng**: mọi lần đăng nhập đúng mật khẩu đều văng lỗi sau bước so mật khẩu, và lỗi rơi vào ERR-02 nên trả 500 kèm stack trace. Luồng đăng nhập không dùng được.
- **Hướng xử lý**: ký đồng nhất với access token: `jwt.sign({ userId: String(userId) }, ...)`. Thêm test đăng nhập (TEST-01) để lỗi kiểu này bị phát hiện ngay.

### ERR-02 — Error handler tập trung không hoạt động

- `[NGUYÊN TẮC]` · High · Đã xác nhận (theo cơ chế Express 5)
- **Bằng chứng**: `errorHandler.js:1-3` là `export const errorHandler = () => { // xu ly loi }`, có 0 tham số. Trong `router/lib/layer.js` của Express 5:
  - Dòng 109: middleware có `fn.length !== 4` bị **bỏ qua khi có lỗi**.
  - Dòng 145: middleware có `fn.length <= 3` được gọi như middleware thường.
- **Ảnh hưởng**:
  1. Mọi lỗi (CastError khi id sai định dạng, ERR-01, lỗi DB) rơi về handler mặc định `finalhandler`, trả 500 dạng **HTML kèm stack trace**, vì `NODE_ENV` không được đặt (`finalhandler/index.js:160-162`). Điều này làm lộ cấu trúc thư mục server, và FE không đọc được JSON lỗi.
  2. Request tới route không tồn tại (`GET /api/abc`) chạy vào `errorHandler` như middleware thường. Hàm này không trả response, không gọi `next()`, nên **request treo** tới khi client timeout.
  3. `GET /api/products/<id không tồn tại>` trả 200 với `data: null` thay vì 404.
- **Hướng xử lý**: viết `notFound` (404 JSON) và `errorHandler(err, req, res, next)`:
  - Map `ZodError` → 400.
  - Map `mongoose.Error.CastError` → 400.
  - Map `ValidationError` → 400.
  - Map `code 11000` → 409.
  - Map lỗi JWT → 401.
  - Lỗi khác → 500 với thông điệp chung, chỉ log stack ở server.

  Trong service, ném lỗi 404 khi không tìm thấy bản ghi.

### SEC-02 — Dùng chung một salt bcrypt cho mọi mật khẩu

- `[NGUYÊN TẮC]` · High · Đã xác nhận
- **Bằng chứng**: `password.js:3` khai báo `const salt = bcrypt.genSaltSync(10);` ở cấp module. Salt chỉ sinh một lần khi server khởi động, rồi dùng cho mọi lần `hashSync`.
- **Ảnh hưởng**: hai user có cùng mật khẩu sẽ có cùng hash. Kẻ tấn công lấy được DB có thể bẻ khoá hàng loạt (một lần thử áp dụng cho mọi tài khoản). Salt tồn tại chính là để ngăn điều này. Ngoài ra, `hashSync`/`compareSync` chặn event loop.
- **Hướng xử lý**: `export const hashPassword = (pw) => bcrypt.hash(pw, 10)` (bcrypt tự sinh salt riêng cho mỗi lần) và `comparePassword = (pw, hash) => bcrypt.compare(pw, hash)`, nhớ `await` ở nơi gọi. Mật khẩu đã lưu vẫn verify được bình thường vì salt nằm sẵn trong chuỗi hash.

### VAL-01 — Route sản phẩm không validate, đưa `req.body` thẳng vào DB

- `[NGUYÊN TẮC]` · High · Đã xác nhận
- **Bằng chứng**:
  - `product.schema.js` rỗng (0 byte), và `product.route.js` không gắn `validate`.
  - `product.controller.js:5` gọi `productService.create(req.body)`, dòng 26 gọi `update(req.params.id, req.body)`.
  - `product.service.js:13,17` gọi `Product.create(data)` và `findByIdAndUpdate(id, data)`.
  - `:id` không được kiểm tra định dạng ObjectId.
- **Ảnh hưởng**:
  - Không có ràng buộc nghiệp vụ ở nguồn sự thật: title 1 ký tự, giá âm vẫn được lưu.
  - Quy tắc lệch giữa hai phía: FE yêu cầu `title.min(3)`, `price.min(0)` (`FE/src/shared/validation/productSchema.js`), BE không kiểm tra gì.
  - id sai định dạng gây CastError, thành 500 (qua ERR-02).
  - Mass assignment: hiện Mongoose strict mode tự bỏ trường lạ, nên rủi ro mới giới hạn ở giá trị. Khi model có thêm trường như `isActive`, `stock`, `createdBy` thì client sẽ tự ghi được (**Rủi ro tiềm ẩn**).
- **Hướng xử lý**: viết `product.schema.js` với `createProductSchema`, `updateProductSchema = create.partial()` và `idParamSchema` (regex 24 hex). Gắn `validate({ body, params })` ở route; controller dùng `req.validated.body`. Giữ quy tắc khớp với schema FE.

### ERR-03 — Kết nối DB không được chờ, lỗi bị nuốt

- `[NGUYÊN TẮC]` · Medium · Đã xác nhận
- **Bằng chứng**:
  - `db.config.js:4-13`: `mongoose.connect(...).then(...).catch(log)`, không trả promise ra ngoài.
  - `index.js:16` gọi `connectDB()` không `await`, rồi `index.js:22` gọi `app.listen` luôn.
  - `index.js:23-26`: khi listen lỗi vẫn in tiếp "Server is running" vì thiếu `return`.
- **Ảnh hưởng**: DB sai URI hoặc chưa chạy thì server vẫn "chạy". Mongoose buffer query nên request treo khoảng 10 giây rồi mới lỗi, rất khó debug.
- **Hướng xử lý**: `connectDB` trả về promise. Gọi `await connectDB()` trước `listen`; lỗi thì log và `process.exit(1)` (fail fast).

### ERR-04 — Env không được validate; các file `.env.*` không bao giờ được load

- `[NGUYÊN TẮC]` · Medium · Đã xác nhận
- **Bằng chứng**: `env.config.js` gọi `dotenv.config()` mặc định nên chỉ đọc `.env`. `DB_URI`, `JWT_*` không có kiểm tra. Repo có `.env.test`, `.env.staging`, `.env.prod` nhưng không có code nào chọn file theo môi trường.
- **Ảnh hưởng**:
  - Thiếu `JWT_ACCESS_SECRET` chỉ lộ ra lúc đăng nhập (`secretOrPrivateKey must have a value`).
  - Thiếu `DB_URI` thì lỗi bị nuốt (ERR-03).
  - Người dùng dễ tưởng `.env.prod` đang có hiệu lực.
- **Hướng xử lý**: schema Zod cho env, biến bắt buộc mà trống thì thoát và in rõ "chưa điền". Chọn file theo `NODE_ENV` (`dotenv.config({ path: \`.env.${NODE_ENV}\` })`), hoặc bỏ các file không dùng.

### SEC-03 — Bảo mật tầng HTTP còn thiếu

- `[NGUYÊN TẮC]` · Medium · Đã xác nhận
- **Bằng chứng**:
  - `index.js:9-14` gọi `cors({})` (origin `'*'` mặc định — `cors/lib/index.js:9`), còn `CORS_ORIGIN` có trong `envConfig` nhưng không được dùng.
  - Không có `helmet`, không rate limit (grep `helmet|rateLimit` → 0).
  - `express.json()` không đặt `limit`.
- **Ảnh hưởng**: site bất kỳ gọi được API. `/auth/login` bị brute force không giới hạn. Hiện chưa dùng cookie/credentials nên CORS chưa phải lỗ hổng trực tiếp.
- **Hướng xử lý**: `cors({ origin: envConfig.CORS_ORIGIN })`, `express-rate-limit` cho `/api/auth`, `helmet()`, `express.json({ limit: "1mb" })`. Đây là thêm dependency, nên làm khi tới bài bảo mật.

### BE-01 — Định dạng response không thống nhất

- `[NGUYÊN TẮC]` · Medium · Đã xác nhận
- **Bằng chứng**:
  - Product: `{ message, data }` (`product.controller.js`).
  - Auth register: `{ message, user }` (`auth.controller.js:31`).
  - Auth login: `{ message, user, accessToken, refreshToken }` (`auth.controller.js:61`).
  - Validate: `{ message, issues }` (`validate.js`).
  - Lỗi khác: HTML (ERR-02).
- **Ảnh hưởng**: FE phải xử lý riêng cho từng endpoint. Hook `useCRUD` đọc `data.data`, nên không dùng lại được cho auth.
- **Hướng xử lý**: `shared/utils/response.js` với `sendSuccess(res, data, message, status)`; lỗi chỉ đi qua `errorHandler` với dạng `{ success: false, error: { code, message, details } }`. Làm cùng lúc với ERR-02.

### ARCH-01 — Controller auth ôm nghiệp vụ và truy vấn DB trực tiếp

- `[NGUYÊN TẮC]` · Medium · Đã xác nhận
- **Bằng chứng**:
  - `auth.controller.js:17,42` gọi `User.findOne`.
  - Dòng 22 hash mật khẩu, dòng 56-57 ký token: nghiệp vụ nằm ở controller.
  - `auth.service.js` có `login` rỗng.
  - Dòng 10, 41 đọc `req.body` thay vì `req.validated.body`, nên `.trim()` của Zod mất tác dụng: email có khoảng trắng đầu/cuối bị lưu nguyên.
  - Import thừa `jwt` và `envConfig` (dòng 1-2).
- **Ảnh hưởng**: phá vỡ ranh giới tầng mà module product đang làm đúng. Khó test, khó tái sử dụng (ví dụ login Google sau này).
- **Hướng xử lý**: chuyển vào `authService.register/login`, trong đó service ném lỗi nghiệp vụ, controller chỉ gọi service rồi trả response. Lấy dữ liệu từ `req.validated.body`.

### DB-01 — Ràng buộc và option cập nhật của Mongoose

- `[NGUYÊN TẮC]` · Medium · Đã xác nhận
- **Bằng chứng**:
  - `user.model.js:6-10`: email có `unique: true` nhưng không `lowercase`/`trim`, nên `A@x.com` và `a@x.com` thành 2 tài khoản khác nhau.
  - `product.service.js:17` gọi `findByIdAndUpdate(id, data, { new: true })` mà không có `runValidators: true`, nên update bỏ qua `required` và kiểu của schema.
  - Mongoose 9 in cảnh báo deprecated cho `new` (`mongoose/lib/query.js:3993-3997`); nên dùng `returnDocument: "after"`.
- **Hướng xử lý**: thêm `lowercase: true, trim: true` cho email (dữ liệu cũ có thể cần chuẩn hoá); update dùng `{ returnDocument: "after", runValidators: true }`.

### FE-01 — Sai sót trong cấu hình router

- `[NGUYÊN TẮC]` · Medium · Đã xác nhận
- **Bằng chứng**:
  - `AppRoute.jsx:3-6` import `default as ClientLayout` và `default as Layout` **cùng từ** `layouts/client/ClientLayout`, nên `/auth` (dòng 46) dùng ClientLayout, còn `layouts/common/Layout.jsx` không được dùng ở đâu. Có thể là lỗi auto-import.
  - Dòng 48 và 50 cùng khai báo path `register`, nên `ForgotPasswordPage` không truy cập được.
  - Dòng 19: `createBrowserRouter` được gọi **bên trong** component `AppRoute`, mỗi lần render tạo router mới và mất state điều hướng. React Router khuyến nghị tạo ở cấp module.
- **Hướng xử lý**: import `Layout` từ `layouts/common/Layout`; đổi path thứ hai thành `forgot-password`; đưa `const router = createBrowserRouter([...])` ra ngoài component.

### FE-02 — Luồng dữ liệu của form sản phẩm

- `[NGUYÊN TẮC]` · Medium · Đã xác nhận
- **Bằng chứng**:
  - `ProductFormPage.jsx:32-37`: `useEffect` gọi `fetchById(id)` cả khi đang thêm mới (`id` là `undefined`), nên request `GET /products/undefined` bị CastError và trả 500.
  - `ProductFormPage.jsx:10` dùng `useCRUD`, mà hook này luôn gọi `fetchData()` lúc mount (`useCRUD.js:82-84`), nên trang form tải cả danh sách sản phẩm vô ích.
  - `useCRUD.js:36-48,50-65`: `create`/`update` bắt lỗi, hiện toast rồi **không ném lại**, nên `ProductFormPage.jsx:27-28` vẫn `nav("/admin/san-pham")` kể cả khi lưu thất bại.
- **Ảnh hưởng**: tốn request, sinh lỗi 500 giả ở server log, người dùng mất dữ liệu đang nhập khi lưu lỗi.
- **Hướng xử lý**: chỉ fetch khi có `id`; `create`/`update` trả `true/false` hoặc ném lỗi để trang quyết định có điều hướng hay không. Cho `useCRUD` tham số `{ autoFetch }`, hoặc tách hook đọc danh sách và hook mutation riêng. Về lâu dài, TanStack Query giải quyết gọn (ARCH-02).

### FE-03 — Import `zodResolver` bằng đường dẫn nội bộ của package

- `[NGUYÊN TẮC]` · Medium · Đã xác nhận
- **Bằng chứng**: `ProductFormPage.jsx:6` viết `import { zodResolver } from "../../../../node_modules/@hookform/resolvers/zod/src/zod";`. Đây là file TypeScript nguồn `zod.ts` của `@hookform/resolvers@5.9.1`, không phải entry được công bố.
- **Ảnh hưởng**: bỏ qua trường `exports` của package. Import sẽ gãy khi đổi cách cài (workspaces hoist `node_modules` lên gốc), khi package đổi cấu trúc thư mục ở bản sau, hoặc khi chuyển công cụ build. Đây cũng là lý do repo phải tránh npm workspaces.
- **Hướng xử lý**: `import { zodResolver } from "@hookform/resolvers/zod";`. Khi IDE auto-import ra đường dẫn `node_modules/...` thì luôn sửa lại.

### FE-04 — `baseURL` hard-code

- `[NGUYÊN TẮC]` · Medium · Đã xác nhận
- **Bằng chứng**: `FE/api/index.js:4` có `baseURL: "http://localhost:8000/api"`; FE không có file env nào.
- **Ảnh hưởng**: build ra chỉ chạy được trên máy dev, deploy phải sửa code.
- **Hướng xử lý**: `baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api"`, thêm `frontend/.env.example` (`VITE_API_URL=`) và `frontend/.env` tương ứng.

### CODE-01 — Lint không pass, backend không có lint

- `[NGUYÊN TẮC]` · Medium · Đã xác nhận (chạy `npm run lint` trong phiên setup cùng ngày, code chưa đổi)
- **Bằng chứng**: 9 error, 2 warning:
  - `useCRUD.js:16,28,42,59,74` và `useProducts.js:17,45`: `no-unused-vars` cho biến `error` trong `catch`.
  - `useCRUD.js:83` và `useProducts.js:54`: `react-hooks/set-state-in-effect`.
  - `useCRUD.js:84` và `ProductFormPage.jsx:36`: `exhaustive-deps`.

  `backend/package.json` không có ESLint.
- **Hướng xử lý**:
  - Dùng `catch {}` khi không cần biến lỗi.
  - Với `set-state-in-effect`: nếu giữ fetch trong effect thì hiểu rõ lý do và ghi chú; nếu chuyển sang TanStack Query thì lỗi tự hết.
  - Thêm `eslint.config.js` cho BE (môi trường Node).

### CODE-02 — Code chết, trùng lặp, code comment-out

- `[NGUYÊN TẮC]` · Medium · Đã xác nhận
- **Bằng chứng**:
  - `FE/src/hooks/useProducts.js`: trùng logic `useCRUD` và không được import ở đâu (vi phạm DRY, là code chết).
  - `FE/src/components/Button.jsx`: không được dùng, còn `console.log` ở dòng 12.
  - `FE/api/categoryAPI.js`: không được dùng, BE chưa có `/categories`.
  - `FE/src/pages/admin/UserManagement.jsx`: không có route.
  - `FE/src/layouts/common/Layout.jsx`: không được dùng (xem FE-01).
  - `AdminSibebar.jsx:15-20`: hai `<Link>` rỗng không có `to`.
  - Code comment-out: `BE/index.js:11`, `BE/src/routes/index.js:9-10`, `ProductFormPage.jsx:22-24`.
  - `console.log` ở `BE/src/shared/middlewares/auth.js:4`.
  - `import React from "react"` thừa ở hầu hết component (React 19 dùng JSX transform mới).
- **Hướng xử lý**: xoá `useProducts.js`, xoá code comment-out (git đã lưu lịch sử). Các file "để dành cho bài sau" (`categoryAPI`, `UserManagement`) thì giữ, nhưng ghi `TODO` có ngữ cảnh.
- **Lưu ý sư phạm**: `useProducts` → `useCRUD` là tiến trình bài học tốt (cụ thể → tổng quát). Khi đã có bản tổng quát thì nên xoá bản cũ.

### TEST-01 — Không có kiểm thử

- `[NGUYÊN TẮC]` · Medium · Đã xác nhận
- **Bằng chứng**: không có file test, không có script `test` ở cả hai app.
- **Ảnh hưởng**: ERR-01 (đăng nhập hỏng hoàn toàn) tồn tại mà không ai phát hiện. Đây là ví dụ rõ nhất về giá trị của test.
- **Hướng xử lý**: Vitest + Supertest (cần tách `app.js` — BE-02) + `mongodb-memory-server`. Thứ tự viết test:
  1. Đăng ký, đăng nhập.
  2. Route sản phẩm yêu cầu token/role.
  3. Validate sản phẩm.
  4. `password.js`/`jwt.js`.

### DOC-01 — Thiếu tài liệu

- `[NGUYÊN TẮC]` · Medium · Đã xác nhận
- **Bằng chứng**:
  - Không có `README.md` ở gốc. `frontend/README.md` là template Vite.
  - `docs/` trống, không có API docs hay Postman collection.
  - Có `backend/.env.example` (thêm ở commit setup `5e00840`). `CLAUDE.md` ghi quy ước cho AI, không thay được README cho người.
- **Mức độ đủ**: Developer: có một phần · Vận hành: thiếu hoàn toàn · Người dùng cuối: thiếu (Low, không bắt buộc với dự án học tập).
- **Hướng xử lý**: README gốc (yêu cầu Node 22, MongoDB; `npm run install:all`; `npm run dev`); `docs/` theo skill `docs-du-an`, ưu tiên danh sách API và định dạng response/lỗi.

### ARCH-02 — Frontend chưa theo chuẩn features + phân vai state (cơ hội nâng cấp)

- `[CHUẨN]` · Medium · Đã xác nhận
- **Bằng chứng**:
  - Không có `src/features/`.
  - Server state quản lý bằng `useState` + `useEffect` trong `useCRUD`, không dùng TanStack Query.
  - Chưa có store phiên đăng nhập (Zustand); `ProtectedRoute` dùng user hard-code.
  - `api/` nằm **ngoài** `src/` (`frontend/api/`), import phải đi lên 4 cấp (`../../../../api/productAPI`).
- **Đánh giá**: khoá học đang ở bài useEffect/custom hook, nên việc tự viết `useCRUD` là **đúng tiến trình** để hiểu vấn đề mà TanStack Query giải quyết. Không tính là lỗi, chỉ trừ tối đa 1 điểm theo quy tắc `[CHUẨN]`.
- **Hướng xử lý**: lộ trình P4 trong `02-KIEN-TRUC-DE-XUAT.md`.

### OPS-01 — Thiếu công cụ giữ chất lượng ở gốc repo

- `[CHUẨN]` · Medium · Đã xác nhận
- **Bằng chứng**: không có `.prettierrc`, `.editorconfig`, `.nvmrc`, `.husky/`. `backend/package.json` chỉ có `dev`, thiếu `start`/`lint`. Đã có `.gitignore` gốc và script `dev` chạy đồng thời bằng `concurrently`.
- **Hướng xử lý**: thêm `.prettierrc` + `.prettierignore` + `.editorconfig` + `.nvmrc` (22); script `format`, `format:check`; husky + lint-staged khi học viên đã quen git.

### SEC-04 — Các điểm bảo mật nhỏ

- `[NGUYÊN TẮC]` · Low · Đã xác nhận
- **Bằng chứng và hướng xử lý**:
  - `jwt.js:6`: access token sống 1h. Chuẩn là 15–30 phút kèm luồng refresh (refresh hiện chưa có).
  - `user.model.js`: `password` không có `select: false`; code đang tự gán `password = undefined` trước khi trả (`auth.controller.js:59`, `auth.service.js:6`), rất dễ quên ở endpoint mới.
  - `isVerified` mặc định `true` trong khi `verifyEmail` chưa làm. Ghi chú để không quên.
  - `FE/src/routes/ProtectedRoute.jsx:4-7`: user giả hard-code. Chấp nhận được khi demo, nhưng cần thay bằng phiên đăng nhập thật. Bảo vệ thật phải nằm ở BE (SEC-01).

### FE-05 — Semantic HTML, accessibility, trạng thái giao diện

- `[NGUYÊN TẮC]` · Low · Đã xác nhận
- **Bằng chứng**:
  - `ProductFormPage.jsx:43,55,67`: `<label htmlFor="">` không gắn với input (dùng `id` + `htmlFor`).
  - `ProductFormPage.jsx:77`: `<button>` không ghi `type="submit"`.
  - `ProductManagement.jsx`:
    - Không có empty state khi danh sách rỗng.
    - Dùng `border="1"` (thuộc tính lỗi thời).
    - Có `{" "}` thừa ở dòng 31.
  - `useCRUD.js:69`: thao tác xoá bật `loading` dùng chung, khiến cả bảng biến thành "Loading...".
  - `useCRUD.js:70`: `setError(false)` lệch với `null` ở các hàm khác.
  - `index.html`: `lang="en"`, title `frontend`.

### CODE-03 — Naming và nhất quán

- `[NGUYÊN TẮC]` · Low · Đã xác nhận
- **Bằng chứng**:
  - Sai chính tả: `AdminSibebar.jsx`, `shared/constanst.js`, `optionsShema.js`.
  - `DashBoard` dùng named export, trong khi các page khác dùng default export.
  - Message API lẫn tiếng Việt không dấu (product) và tiếng Anh (auth, validate).
  - Comment nửa Anh nửa Việt, có comment hiển nhiên (`// * logic` ở `App.jsx`).
- **Hướng xử lý**: đổi tên khi đụng tới file (một commit riêng), chọn một ngôn ngữ cho message API.

### BE-02 — Chưa tách `app.js` / `server.js` (cơ hội nâng cấp)

- `[CHUẨN]` · Low · Đã xác nhận
- **Bằng chứng**: `backend/index.js` vừa tạo app vừa kết nối DB vừa listen. Chưa có `/api/v1`, `GET /health`, xử lý `SIGINT/SIGTERM`.
- **Hướng xử lý**: tách khi bắt đầu viết test (Supertest cần `app` không listen). Tệp hiện ngắn nên chưa gấp.

### BE-03 — API trả `_id` thay vì `id` (cơ hội nâng cấp)

- `[CHUẨN]` · Low · Đã xác nhận
- **Bằng chứng**: không có `toJSON` transform. FE dùng `_id` ở 8 chỗ (`useCRUD.js:56,72`, `useProducts.js:34,43`, `ProductManagement.jsx:47,48,52,53`). Cách dùng đang **nhất quán**, không lẫn `id`/`_id`.
- **Hướng xử lý**: `mongoose.set("toJSON", { virtuals: true, versionKey: false, transform: (_d, ret) => { delete ret._id; } })` trước khi định nghĩa model. Đây là thay đổi hợp đồng API, nên phải sửa 8 chỗ FE trong cùng commit.

### DB-02 — Migration, phân trang, kiểu tiền tệ (cơ hội nâng cấp)

- `[CHUẨN]` · Low · Đã xác nhận
- **Bằng chứng**: không có migrate-mongo; `product.service.js:9` gọi `Product.find()` không giới hạn; `price: Number` (`product.model.js`).
- **Đánh giá**: dữ liệu học tập nhỏ, chưa có thanh toán, nên chưa cần làm. Ghi vào lộ trình "khi tăng trưởng".
