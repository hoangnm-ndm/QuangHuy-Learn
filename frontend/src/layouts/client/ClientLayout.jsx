import { Outlet } from "react-router";
import ClientHeader from "./ClientHeader";
import ClientFooter from "./ClientFooter";

const ClientLayout = () => {
  return (
    <>
      <ClientHeader />
      <main>
        <Outlet />
      </main>
      <ClientFooter />
    </>
  );
};

export default ClientLayout;
