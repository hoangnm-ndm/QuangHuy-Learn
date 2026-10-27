import apiClient from "./index.js";

export const categoryAPI = {
  getAll: () => apiClient.get("/categories"),
  getById: (id) => apiClient.get(`/categories/${id}`),
  create: (data) => apiClient.post("/categories", data),
  update: (id, data) => apiClient.put(`/categories/${id}`, data),
  remove: (id) => apiClient.delete(`/categories/${id}`),
};
