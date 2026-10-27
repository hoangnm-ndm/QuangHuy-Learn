import apiClient from "./index.js";

export const productAPI = {
  getAll: () => apiClient.get("/products"),
  getById: (id) => apiClient.get(`/products/${id}`),
  create: (data) => apiClient.post("/products", data),
  update: (id, data) => apiClient.put(`/products/${id}`, data),
  remove: (id) => apiClient.delete(`/products/${id}`),
};
