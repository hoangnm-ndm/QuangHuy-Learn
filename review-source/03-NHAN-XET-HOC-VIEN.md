# 03 — Nhận xét học viên

Repo được review ở mốc **Day 05 + React Hook Form**. Thầy chấm theo chuẩn của một sản phẩm hoàn chỉnh, để em thấy khoảng cách tới đích. Vì vậy, nhiều mục bị trừ điểm là phần **chưa học tới**, không phải làm sai.

## 1. Điều em đã làm tốt

- **Tư duy chia module ở backend đúng ngay từ đầu.** Mỗi module có `route → controller → service → model`. Module `product` giữ ranh giới tầng rất sạch: controller chỉ gọi service, service mới gọi Mongoose. Đây là nền móng khó nhất, nhiều bạn phải sửa lại sau vài tháng.
- **Middleware `validate({ body, query, params })` viết gọn và đúng chuẩn**: duyệt từng phần của request, gom lỗi, gắn kết quả vào `req.validated`. Đây là mẫu để dùng lại cho mọi module.
- **ESM và Express 5 dùng nhất quán.** Em đã tận dụng việc Express 5 tự bắt lỗi async nên không có `try/catch` thừa trong controller.
- **Frontend tách layout/page theo vai trò** (admin/client/common), dùng Data Router, route admin tách riêng, có `ProtectedRoute` theo role.
- **Tiến trình `useProducts` → `useCRUD(apiService)`** cho thấy em hiểu cách đi từ code cụ thể tới trừu tượng hoá khi đã thấy lặp lại. Đây đúng là "rule of three".
- Form sản phẩm dùng react-hook-form + Zod, hiển thị lỗi theo field, input số dùng `valueAsNumber`. Làm đúng ngay từ lần đầu.

## 2. Lỗi mang tính hệ thống (lặp lại ở nhiều nơi)

1. **"Để trống cho chạy được trước" nhưng phần để trống làm hỏng hệ thống.** `errorHandler`, `checkAuthentication`, `checkRoles` đều là hàm rỗng. Hàm rỗng không vô hại:
   - Express nhận diện error handler qua **số tham số** (phải đủ 4). Hàm 0 tham số bị coi là middleware thường, nên route sai bị treo và lỗi trả về kèm stack trace (ERR-02).
   - Middleware không gọi `next()` và không trả response sẽ làm request treo (SEC-01).

   → Khi để stub, hãy để stub **an toàn**: `(req, res, next) => next()` kèm `// TODO(SEC-01): ...`, hoặc trả `501 Not Implemented`.

2. **Tin vào dữ liệu đầu vào.** Route sản phẩm đưa `req.body` thẳng vào DB (VAL-01). Controller auth đã validate nhưng lại đọc `req.body` thay vì `req.validated.body` (ARCH-01). Hãy nhớ: **dữ liệu đi vào DB phải là dữ liệu đã qua Zod.**
3. **Nuốt lỗi.** `connectDB` chỉ `console.log` khi thất bại (ERR-03). `useCRUD` bắt lỗi xong không báo cho nơi gọi, nên form vẫn chuyển trang dù lưu thất bại (FE-02). Lỗi phải hoặc được xử lý thật, hoặc được ném tiếp, không được im lặng.
4. **Chưa kiểm chứng sau khi viết.** Login đang luôn lỗi 500 vì `jwt.sign` nhận ObjectId (ERR-01). Chỉ cần gọi thử bằng Postman hoặc một test nhỏ là phát hiện. Tương tự, đường import `../../../../node_modules/...` (FE-03) là do IDE tự gợi ý; mỗi dòng auto-import, AI sinh ra hay copy về đều cần đọc lại trước khi commit.

## 3. Kiến thức còn thiếu và thứ tự nên học bổ sung

1. **Middleware và error handling trong Express**: chữ ký 4 tham số, `next(err)`, `notFound`, map lỗi Mongoose (CastError, ValidationError, 11000).
2. **JWT và bcrypt**: payload là object, verify token, vì sao mỗi mật khẩu cần salt riêng, bản async và bản sync khác nhau ở đâu.
3. **Authentication và authorization**: phân biệt 401/403; bảo vệ ở backend là bắt buộc, `ProtectedRoute` phía FE chỉ là UX.
4. **Kiểm thử API** với Vitest + Supertest: bắt đầu bằng test đăng ký/đăng nhập.
5. **Biến môi trường**: validate lúc khởi động, `VITE_API_URL` cho frontend.
6. Sau đó mới tới **TanStack Query và Zustand**. Em sẽ thấy ngay chúng thay thế được những gì `useCRUD` đang tự làm bằng tay (loading, error, refetch, cập nhật cache).

## 4. Lời khuyên

- Sửa theo thứ tự trong `CHECKLIST.md` (P0 → P1). Mỗi mục là một commit nhỏ, và test lại bằng Postman sau mỗi commit.
- Không cần bỏ cấu trúc hiện tại. 3 mục P0 và `errorHandler` là đủ để repo từ "chạy được khi demo" thành "an toàn để học tiếp".
- Dùng AI là tốt, nhưng em chịu trách nhiệm từng dòng: đọc hiểu, chạy thử, xoá code thừa (`useProducts`, code comment-out) trước khi commit.

## 5. Bảng điểm

| Nhóm                   | Trọng số | Điểm nhóm (/10) | Đóng góp               | Lý do chính                                                                                                                         |
| ---------------------- | -------- | --------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Hoàn thành nghiệp vụ   | 10       | 6               | 6,0                    | CRUD sản phẩm admin chạy end-to-end; đăng ký chạy; **đăng nhập hỏng** (ERR-01); trang auth/client còn placeholder (đúng tiến độ)    |
| Kiến trúc backend      | 15       | 6               | 9,0                    | Module hoá tốt, ESM, Express 5; trừ ARCH-01, BE-01, ERR-03; BE-02 là `[CHUẨN]`                                                      |
| Kiến trúc frontend     | 15       | 6               | 9,0                    | Layout/page/router tốt, hook tái sử dụng; trừ FE-01..04; ARCH-02 `[CHUẨN]` trừ tối đa 1 điểm                                        |
| Bảo mật & phân quyền   | 15       | 3               | 4,5                    | Có 1 Critical (SEC-01) nên trần 4; thêm SEC-02 (High), SEC-03. Điểm cộng: `.env` chưa bao giờ bị commit, ẩn password trong response |
| Database & dữ liệu     | 10       | 6               | 6,0                    | Schema có required/enum/default/timestamps, email unique; trừ DB-01; DB-02 `[CHUẨN]`                                                |
| Validation & xử lý lỗi | 10       | 4               | 4,0                    | Middleware `validate` tốt, Zod 2 phía cho phần đã làm; trừ VAL-01 (High), ERR-02 (High), ERR-04                                     |
| Clean Code & quy ước   | 10       | 5               | 5,0                    | Đặt tên file nhất quán; trừ lint fail (CODE-01), code chết (CODE-02), CODE-03                                                       |
| Kiểm thử               | 8        | 0               | 0,0                    | Không có test (TEST-01)                                                                                                             |
| Tài liệu & vận hành    | 7        | 4               | 2,8                    | Có `.gitignore` gốc, `.env.example`, script chạy đồng thời; thiếu README, docs, API docs, Prettier (DOC-01, OPS-01)                 |
| **Tổng**               | 100      |                 | **46,3/100 → 4,75/10** | Xếp loại: **Chưa đạt** (chấm theo chuẩn sản phẩm hoàn chỉnh)                                                                        |

Không áp dụng trần tổng 5,0 vì chỉ có 1 lỗi Critical. Không cộng điểm nỗ lực: chưa có phần nào vượt yêu cầu ở mức đáng cộng.

**Đánh giá theo tiến độ**: với mốc Day 05, phần đã học (router, props/state, custom hook, form) đạt mức **khá**. Điểm thấp chủ yếu đến từ phần backend auth đang làm dở, cộng với việc chưa có test và docs. Hoàn thành P0, P1 trong `CHECKLIST.md` là lên được khoảng 6,5/10.
