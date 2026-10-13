import Product from "./product.model.js";

const productService = {
  getById: async (id) => {
    const product = await Product.findById(id);
    return product;
  },
  getAll: async () => {
    const products = await Product.find();
    return products;
  },
  create: async (data) => {
    const res = await Product.create(data);
    return res;
  },
  update: async (id, data) => {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    return product;
  },
  remove: async (id) => {
    const product = await Product.findByIdAndDelete(id);
    return product;
  },
};

export default productService;
