# frontend

React 19 + Vite 7 (`@vitejs/plugin-react-swc`), JSX, không TypeScript.
Lệnh: `npm run dev` | `npm run lint` | `npm run build` (chạy trong `frontend/` hoặc dùng script ở gốc).

## Thư viện và cách dùng

- Router: React Router 7, import từ `"react-router"` (không dùng `react-router-dom`, dù
  `package.json` khai báo gói này). Router tạo bằng `createBrowserRouter`.
- HTTP: axios, đi qua instance trong `api/index.js`.
- Form: `react-hook-form` + `zodResolver` + schema Zod để trong `src/shared/validation/`;
  input số thì dùng `valueAsNumber`.
- Thông báo: `toast` của `react-toastify` (`<ToastContainer />` đặt trong `App.jsx`).

## Cấu trúc

- `api/` nằm **ngoài** `src/`: mỗi resource là một file `xxxAPI.js`, export object
  `{ getAll, getById, create, update, remove }`.
- `src/routes/`: `AppRoute.jsx` (cây route), `adminRoutes.jsx` (mảng route con của `/admin`),
  `ProtectedRoute.jsx` (kiểm tra theo `roles`).
- `src/layouts/{admin,client,common}`, `src/pages/{admin,client,common}`, trang con của
  một resource đặt trong thư mục riêng (vd `pages/admin/product/`).
- `src/hooks/useCRUD.js`: hook CRUD dùng chung, nhận một object `xxxAPI` → resource mới
  dùng hook này (`useProducts.js` là bản cũ).
- `src/shared/`: hằng số (`constanst.js`, giữ nguyên tên file), schema validate.

## Quy ước

- Path route viết tiếng Việt không dấu, dạng kebab: `/san-pham`, `/ve-chung-toi`,
  `/admin/san-pham/add`, `/admin/san-pham/update/:id`.
- Component dùng arrow function và `export default`.
