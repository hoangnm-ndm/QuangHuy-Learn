import React from "react";
import { Link } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import { productAPI } from "../../../../api/productAPI";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await productAPI.getAll();
      setProducts(data.data);
    })();
    // IIFE
  }, []);

  const handleSortDelete = async (id) => {
    console.log(id);
  };
  return (
    <>
      <h1>Product Management</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length !== 0 &&
            products.map((item) => (
              <tr className="product-row" key={item._id}>
                <td>{item._id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                  <Link to={`update/${item._id}`}>Update</Link>{" "}
                  <button onClick={() => handleSortDelete(item._id)}>
                    Archive
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductManagement;
