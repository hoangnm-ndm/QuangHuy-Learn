import React from "react";
import { useProducts } from "../../../hooks/useProducts";

const ProductFormPage = () => {
  const { createProduct, udpateProduct } = useProducts();
  return (
    <div>
      <h1>Product Form</h1>
      <form action=""></form>
    </div>
  );
};

export default ProductFormPage;
