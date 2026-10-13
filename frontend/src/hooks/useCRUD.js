import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export const useCRUD = (apiService) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await apiService.getAll();
      setData(data.data);
    } catch (error) {
      setError("Co loi xay ra!");
    } finally {
      setLoading(false);
    }
  };

  const create = async (body) => {
    // trycatch
    const { data } = await apiService.create(body);
    setData((prev) => [...prev, data.data]);
  };

  const update = async (id, body) => {
    // trycatch
    const { data } = await apiService.update(id, body);
    setData((prev) => prev.map((item) => (item._id === id ? data.data : item)));
  };

  const remove = async (id) => {
    try {
      setLoading(true);
      setError(false);
      await apiService.remove(id);
      setData((prev) => prev.filter((item) => item._id !== id));
      toast.success("Xoa thanh cong!");
    } catch (error) {
      setError("Xoa ko thanh cong!");
      toast.error("Xoa khong thanh cong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return {
    data,
    loading,
    error,
    create,
    update,
    remove,
  };
};
