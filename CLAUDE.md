# QuangHuy-Learn

Repo học tập fullstack theo buổi (`Day NN`), code là demo bài giảng. Monorepo gồm 2 app
độc lập; mỗi app có `CLAUDE.md` riêng. Tiến độ và các chỗ đang dở: `CHECKLIST.md`.
`docs/` chưa có nội dung (khi cần thì chạy skill `docs-du-an`).

## Cấu trúc

- `frontend/` — React SPA → `frontend/CLAUDE.md`
- `backend/` — REST API Express + MongoDB → `backend/CLAUDE.md`
- **Không dùng npm workspaces**: mỗi app giữ `node_modules` và `package-lock.json` riêng,
  `package.json` gốc chỉ chứa script `npm --prefix`. Lý do: FE đang import `node_modules`
  bằng đường dẫn tương đối, bật hoist sẽ gãy. Cài dependency thì chạy trong thư mục app.
- Node 22, npm 10. JavaScript thuần (ESM), không TypeScript.

## Lệnh (chạy ở gốc)

- `npm run install:all` — cài dependency cho cả 2 app
- `npm run dev:be` (port 8000) và `npm run dev:fe` (Vite 5173) — chạy ở 2 terminal
- `npm run lint`, `npm run build` — của FE. Trước khi commit chạy `npm run lint`: lint đang có
  sẵn lỗi tồn đọng (xem `CHECKLIST.md`), chỉ cần không phát sinh lỗi mới.
- Chưa có test, CI hay Docker.

## Hợp đồng FE ↔ BE

- FE gọi `http://localhost:8000/api` (hard-code trong `frontend/api/index.js`).
- Response CRUD: `{ message, data }`, FE đọc `res.data.data`. Khóa chính là `_id`.
- Roles `member | admin | superAdmin` khai báo ở 2 nơi: `backend/src/modules/user/user.model.js`
  và `frontend/src/shared/constanst.js` — sửa bên này thì sửa luôn bên kia.
- Mỗi bên có schema Zod 4 riêng; khi đổi trường dữ liệu, giữ model BE, schema BE và schema FE khớp nhau.

## Env

- Chỉ `backend/` dùng env. File mẫu: `backend/.env.example`. File thật: `.env`, `.env.test`,
  `.env.staging`, `.env.prod` (đều bị gitignore ở `.gitignore` gốc). Code chỉ load `.env`.

## Quy ước riêng

- Giữ code đơn giản đúng mức bài giảng: không tự refactor, không thêm thư viện. Các stub
  hoặc chỗ dở để dành cho buổi sau (danh sách ở `CHECKLIST.md`), chỉ sửa khi được yêu cầu.
- Commit bài học theo dạng `Day NN: <Chủ đề>` như lịch sử đang có; việc ngoài bài học
  (setup, docs, chore) dùng Conventional Commits.
- Message API và text UI viết tiếng Việt không dấu (theo code hiện có).

## Quy tắc chung (rút gọn, cho máy không có `~/.claude/CLAUDE.md`)

- Trả lời và viết tài liệu bằng tiếng Việt; code, tên biến, commit viết tiếng Anh (trừ quy ước commit ở trên).
- Đọc hiểu code trước khi sửa. Thiếu thông tin thì tự kiểm tra trước, không đoán; quyết định
  thuộc về người dùng thì hỏi dạng trắc nghiệm.
- Không tự mở rộng scope. Không thao tác nguy hiểm (xóa dữ liệu, `git reset --hard`, force push).
- Được commit sau mỗi task và chỉ stage file của task đó. **Không tự push.**
- Tự kiểm tra và review `git diff` trước khi báo xong. Báo cáo theo thứ tự: đã làm → kiểm tra →
  commit → vấn đề còn lại → bước tiếp theo.
- Cập nhật `CHECKLIST.md` sau mỗi task. Đổi code thì cập nhật luôn docs bị ảnh hưởng.
- File env mẫu và file env thật luôn có cùng danh sách biến. Biến mới thêm vào file thật thì
  để trống giá trị. Không bao giờ ghi secret thật vào file mẫu.
- Cuối phiên, dừng các dev server mà mình đã khởi chạy.
