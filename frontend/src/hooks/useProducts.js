import { useEffect } from "react";
import { useState } from "react";
import { productAPI } from "../../api/productAPI";
import { toast } from "react-toastify";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await productAPI.getAll();
      setProducts(data.data);
    } catch (error) {
      setError("Co loi xay ra!");
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (body) => {
    // trycatch
    const { data } = await productAPI.create(body);
    setProducts((prev) => [...prev, data.data]);
  };

  const updateProduct = async (id, body) => {
    // trycatch
    const { data } = await productAPI.update(id, body);
    setProducts((prev) =>
      prev.map((item) => (item._id === id ? data.data : item)),
    );
  };

  const removeProduct = async (id) => {
    try {
      setLoading(true);
      setError(false);
      await productAPI.remove(id);
      setProducts((prev) => prev.filter((item) => item._id !== id));
      toast.success("Xoa thanh cong!");
    } catch (error) {
      setError("Xoa ko thanh cong!");
      toast.error("Xoa khong thanh cong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    removeProduct,
  };
};
