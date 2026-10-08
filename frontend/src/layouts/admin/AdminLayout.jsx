import { Outlet } from "react-router";
import AdminHeader from "./AdminHeader";
import AdminSibebar from "./AdminSibebar";

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <main>
        <AdminSibebar />
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
