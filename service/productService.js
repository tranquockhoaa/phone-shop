const Product = require('./../models/product');
class ProductService {
  static async createProduct(productData) {
    const newProduct = await Product.create({
      product_name: productData.name,
      brand_id: productData.brandId,
      product_detail_id: productData.productDetailId,
      description: productData.description,
    });
    return newProduct;
  }
}

module.exports = ProductService;
