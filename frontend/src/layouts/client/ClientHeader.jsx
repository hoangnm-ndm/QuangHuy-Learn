import React from "react";
import { Link } from "react-router";

const ClientHeader = () => {
  return (
    <header>
      <div className="logo">Logo</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/san-pham">San pham</Link>
          </li>
          <li>
            <Link to="/ve-chung-toi">Ve chung toi</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default ClientHeader;
