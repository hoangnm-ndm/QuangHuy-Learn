# backend

Node 22 ESM (`"type": "module"`, import tương đối phải ghi đuôi `.js`), Express 5,
Mongoose 9, Zod 4, jsonwebtoken, bcryptjs, dotenv.
Lệnh: `npm run dev` (`node --watch index.js`). Cần MongoDB qua biến `DB_URI` trong `.env`.

## Cấu trúc

- `index.js`: entry, gắn `cors`, `express.json()`, `/api` → `src/routes/index.js`, rồi `errorHandler`.
- `src/config/env.config.js`: mọi biến env đều đọc qua `envConfig`, không gọi `process.env` ở nơi khác.
  Thêm biến mới thì cập nhật cả `envConfig`, `.env.example` và các file `.env*` thật.
- `src/routes/index.js`: mount từng module tại `/api/<resource>`.
- `src/modules/<name>/`: `<name>.route.js`, `.controller.js`, `.service.js`, `.model.js`,
  `.schema.js` (Zod).
- `src/shared/`: `middlewares/` (validate, auth, errorHandler), `utils/` (jwt, password),
  `constants/optionsShema.js` (giữ nguyên tên file).

## Quy ước

- Luồng xử lý: route → `validate(...)` → controller → service → model. Controller và service
  là object chứa các hàm async. Controller không gọi model trực tiếp (auth hiện vẫn gọi, chưa tách).
- Express 5 tự đẩy lỗi của async handler sang error middleware, nên không cần try/catch trong controller.
- Response CRUD: `res.status(code).json({ message, data })`, message tiếng Việt không dấu.
- Validate: `validate({ body, query, params })` nhận schema Zod. Dữ liệu đã parse nằm ở
  `req.validated`; nếu sai trả 400 `{ message: "Validation error", issues }`.
- Mongoose schema luôn truyền `optionsSchema` (`versionKey: false, timestamps: true`).
- Không trả `password` ra response (gán `user.password = undefined` trước khi trả).
