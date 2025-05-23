const Product = require('./../models/product');
const ProductDetails = require('./../models/productDetails');
const Brand = require('./../models/brand');
const Memory = require('./../models/memory');
const Color = require('./../models/color');
const AppError = require('./../utils/appError');

class ProductService {
  static async createProduct(productData) {
    if(!productData.code) {
      throw new AppError('Product code is required', 400);
    }
    const checkProduct = await Product.findOne({
      where: {
        code: productData.code,
      },
    });
    if (checkProduct) {
      throw new AppError('Product code already exists', 400);
    }

    // get brand id
    const brand = await Brand.findOne({
      where: {
        name: productData.brandName,
      },
    });
    if (!brand) {
      throw new AppError('Brand not found', 404);
    }
    
    //create product
    const newProduct = await Product.create({
      name: productData.name,
      code: productData.code,
      brand_id: brand.brand_id,
      description: productData.description,
    });
    return newProduct;
  }
}
module.exports = ProductService;
