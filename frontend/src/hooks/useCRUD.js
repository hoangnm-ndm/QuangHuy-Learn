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
  const fetchById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await apiService.getById(id);
      return data.data;
    } catch (error) {
      setError("Co loi xay ra!");
    } finally {
      setLoading(false);
    }
  };

  const create = async (body) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await apiService.create(body);
      setData((prev) => [...prev, data.data]);
      toast.success("Them thanh cong!");
    } catch (error) {
      setError("Co loi xay ra!");
      toast.error("Them khong thanh cong!");
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, body) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await apiService.update(id, body);
      setData((prev) =>
        prev.map((item) => (item._id === id ? data.data : item)),
      );
      toast.success("Cap nhat thanh cong!");
    } catch (error) {
      setError("Co loi xay ra!");
      toast.error("Cap nhat khong thanh cong!");
    } finally {
      setLoading(false);
    }
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
    fetchById,
  };
};
