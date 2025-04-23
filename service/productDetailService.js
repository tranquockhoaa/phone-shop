const { ProductDetails, Product, Brand } = require('../models/index');
const sequelize = require('../config/database');
const { QueryTypes } = require('sequelize');

class ProductDetailSerVice {
  static async createProductDetail(data) {
    console.log(data);
    const newProduceDetail = await ProductDetails.create({
      ...data,
      product_detail_id: undefined,
    });
    return newProduceDetail;
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
}

module.exports = ProductDetailSerVice;
