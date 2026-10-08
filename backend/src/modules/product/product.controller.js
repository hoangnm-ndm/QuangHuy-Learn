import productService from "./product.service.js";

const productController = {
  createProduct: async (req, res) => {
    console.log(req.body);
    const data = await productService.create(req.body);
    return res.status(201).json({
      message: "Tao san pham thanh cong!",
      data,
    });
  },
  getAllProduct: async (req, res) => {
    return;
  },
  getProductById: async (req, res) => {
    return;
  },
};

export default productController;
