const ProductDetails = require('./../models/productDetails');

class ProductDetailsSerVice {
  static async createProductDetail(data) {
    console.log(data);
    const newProduceDetail = await ProductDetails.create({
      ...data,
      product_detail_id: undefined,
    });
    return newProduceDetail;
  }

  static async getAllProductDetails() {
    const allProductDetails = await ProductDetails.findAll();
    return allProductDetails;
  }

  static async getProductDetailByid(id) {
    const productDetails = await ProductDetails.findByPk(id);
    return productDetails;
  }
  static async updateProductDetail(id, data) {
    {
      const productDetails = ProductDetails.findByPk(id);
      await productDetails.updateProductDetail({
        name: data.name,
        description: data.description,
      });
    }
  }
}

module.exports = ProductDetailsSerVice;
