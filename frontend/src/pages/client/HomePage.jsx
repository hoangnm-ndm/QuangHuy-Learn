import React from "react";
import { useCRUD } from "../../hooks/useCRUD";
import { productAPI } from "../../../api/productAPI";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

const HomePage = () => {
  const { data } = useCRUD(productAPI);
  const { cart, addToCart } = useContext(CartContext);
  const initCart = JSON.parse(localStorage.getItem("cart" || "{}")) ?? {
    items: [],
    userId: "123",
    total: 0,
  };
  // total tinh sai
  // khi them san pham da co thi can tang so luong thay vi tao 1 ban ghi moi
  return (
    <div>
      {data.map((item) => (
        <div className="product-card" key={item._id}>
          <img src={item.thumbnail} alt={item.title} />
          <div className="product-infor">
            <h2>{item.title}</h2>
            <div>Giá: {item.price}</div>
            <p>Mô tả: {item.description}</p>
            <button onClick={() => addToCart(item)}>Add to cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
