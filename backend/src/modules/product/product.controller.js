import productService from "./product.service.js";

const productController = {
  create: async (req, res) => {
    const data = await productService.create(req.body);
    return res.status(201).json({
      message: "Tao san pham thanh cong!",
      data,
    });
  },
  getAll: async (req, res) => {
    const data = await productService.getAll();
    return res.status(200).json({
      message: "Lay danh sach san pham thanh cong!",
      data,
    });
  },
  getById: async (req, res) => {
    const data = await productService.getById(req.params.id);
    return res.status(200).json({
      message: "Lay thong tin san pham thanh cong!",
      data,
    });
  },
  update: async (req, res) => {
    const data = await productService.update(req.params.id, req.body);
    return res.status(200).json({
      message: "Cap nhat san pham thanh cong!",
      data,
    });
  },
  remove: async (req, res) => {
    const data = await productService.remove(req.params.id);
    return res.status(200).json({
      message: "Xoa san pham thanh cong!",
      data,
    });
  },
};

export default productController;
