import React from "react";
import { Link } from "react-router";

const AdminSibebar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={"/admin"}>Dashboard</Link>
          </li>
          <li>
            <Link to={"san-pham"}>San pham</Link>
          </li>
          <li>
            <Link></Link>
          </li>
          <li>
            <Link></Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSibebar;
