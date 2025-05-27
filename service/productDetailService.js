const { ProductDetails, Product, Color, Memory, Brand } = require('../models/index');
const sequelize = require('../config/database');
const { QueryTypes } = require('sequelize');
const AppError = require('../utils/appError');

class ProductDetailService {
  static async createProductDetail(data) {
    const checkProduct = await Product.findOne({
      where: {
        code: data.codeProduct,
      },
    });

    if (!checkProduct) {
      throw new AppError('Product not found', 404);
    }

   

    //get color_id
    const color = await Color.findOne({
      where: {
        name: data.colorName,
      },
    });
    if (!color) {
      throw new AppError('Color not found', 404);
    }
    //get memory
    const memory = await Memory.findOne({
      where: {
        storage_size: data.storageSize,
        ram_size: data.ramSize,
      },
    });
    if (!memory) {
      throw new AppError('Memory not found', 404);
    }
    
     const checkProductDetail = await ProductDetails.findOne({where:{
      color_id: color.color_id,
      memory_id: memory.memory_id,
      product_id: checkProduct.product_id,
    }
    });
    if(checkProductDetail){
      throw new AppError('Product existed', 400);
    }

    //create product details
    const newProductDetail = await ProductDetails.create({
      product_id: checkProduct.product_id,
      color_id: color.color_id,
      ram_id: memory.ram_id,
      memory_id: memory.memory_id,
      price: data.price,
      quantity: data.quantity,
    });
    
    return newProductDetail;
  }

  static async getAllProductDetails() {
    const productDetails = await ProductDetails.findAll({
      include: [
        {
          model: Product,
          attributes: ['name', 'code'],
        },
        {
          model: Color,
          attributes: ['name'],
        },
        {
          model: Memory,
          attributes: ['storage_size', 'ram_size'],
        },
      ],
    });
    return productDetails;
  }

  // static async getAllProductDetails(data) {
  //   console.log('service');
  //   const key = ['color_id', 'ram_id', 'product_id', 'memory_id', 'order_by'];
  //   let sQuery = 'select * from product_details';
  //   let orderBy = ' order by';
  //   let check = 0;
  //   for (let i in data) {
  //     const keyData = data[i][0];

  //     if (key.includes(keyData)) {
  //       const valueData = data[i][1];
  //       if (keyData == 'order_by') {
  //         orderBy += ' color_id' + ` ${valueData}`;
  //       } else if (check == 0) {
  //         sQuery += 'where' + keyData + '=' + valueData;
  //       } else {
  //         const temp = valueData;
  //         sQuery += ' and ' + keyData + '=' + temp;
  //       }
  //       check++;
  //       console.log(check);
  //     }
  //   }
  //   console.log(sQuery + orderBy);
  //   const resultQuery = await sequelize.query(sQuery + orderBy);
  //   return resultQuery;
  // }

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

  static async getProductForHomePage(data) {
    const brand = await Brand.findOne({
      where: {
        name: data.brand,
      },
    });
    if (!brand) {
      throw new AppError('Brand not found', 404);
    }

    const productDetails = await sequelize.query(
      `SELECT * FROM products where brand_id = ${brand.brand_id} ORDER BY "createdAt" DESC LIMIT 6;`,
      { type: QueryTypes.SELECT }
    );
    return productDetails;
  }
}



module.exports = ProductDetailService;
