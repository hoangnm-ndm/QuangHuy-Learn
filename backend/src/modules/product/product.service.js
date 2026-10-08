import Product from "./product.model.js";

const productService = {
  getById: () => {},
  getAll: () => {},
  create: async (data) => {
    const result = await Product.create(data);
    console.log(result);

    return result;
  },
  update: () => {},
  remove: () => {},
};

export default productService;
