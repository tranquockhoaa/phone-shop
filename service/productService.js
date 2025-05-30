const Product = require('./../models/product');
const ProductDetails = require('./../models/productDetails');
const Brand = require('./../models/brand');
const Memory = require('./../models/memory');
const Color = require('./../models/color');
const AppError = require('./../utils/appError');
const sequelize = require('./../config/database');
const { QueryTypes } = require('sequelize');

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

  // static async getCodeProductForHomePage(data) {
  //   const brand = await Brand.findOne({
  //     where: {
  //       name: data.brandName,
  //     },
  //   });
  //   if (!brand) {
  //     throw new AppError('Brand not found', 404);
  //   }

  //   const query = `SELECT code, product_id FROM products where brand_id = ${brand.brand_id} ORDER BY "createdAt" DESC LIMIT 6;`
  //   const codes = await sequelize.query(query, {
  //   type: QueryTypes.SELECT,}); 
  //   if (codes.length === 0) {
  //     throw new AppError('No product found', 404);
  //   }
  //   return codes;
  // }

  static async getLastestProducts(queryParams) {
    // const limit = queryParams.limit || 6;
    const brandName = queryParams.brandName;
    const query = `
       WITH product_variants AS (
  SELECT 
    p.product_id,
    p.code,
    p.name,
    p."createdAt",
    pd.price,
    c.name AS color_name,
    m.storage_size,
    m.ram_size,
    pd.quantity,
    b.name AS brand_name,
    ROW_NUMBER() OVER (
      PARTITION BY p.product_id 
      ORDER BY pd.price ASC
    ) AS rn
    FROM products p
    JOIN brands b ON p.brand_id = b.brand_id
    JOIN product_details pd ON p.product_id = pd.product_id
    JOIN memories m ON pd.memory_id = m.memory_id
    JOIN colors c ON c.color_id = pd.color_id
    WHERE b.name = '${brandName}'
    )
    SELECT *
    FROM product_variants
    WHERE rn = 1
    ORDER BY "createdAt" DESC
    LIMIT 10;
    `
      const data = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return data;
    }

  static async getInfoDetailByCodeName(queryParams) {
  const codeProduct = queryParams.codeProduct;

  const product = await Product.findOne({ 
    where: { code: codeProduct }
  });

  const query = `
    SELECT 
  p.name AS name, 
  price, 
  quantity, 
  m.storage_size, 
  m.ram_size, 
  c.name AS color, 
  b.name AS brand_name,
  product_detail_id as product_detail_id
  FROM 
    product_details pd
  JOIN 
    memories m ON pd.memory_id = m.memory_id
  JOIN 
    colors c ON pd.color_id = c.color_id
  JOIN 
    products p ON p.product_id = pd.product_id
  JOIN 
    brands b ON b.brand_id = p.brand_id
  WHERE 
    p.product_id =  ${product.product_id}
  ORDER BY 
  CAST(regexp_replace(m.ram_size, '[^0-9]', '', 'g') AS INTEGER) ASC,  m.storage_size ASC,
    price ASC,
    c.name ASC;
  `;

  const rawData = await sequelize.query(query, {
    type: QueryTypes.SELECT
  });

  const grouped = {};

  for (const item of rawData) {
    const key = `${item.ram_size}_${item.storage_size}`;

    if (!grouped[key]) {
      grouped[key] = {
        ram: item.ram_size,
        storage: item.storage_size,
        options: []
      };
    }

    grouped[key].options.push({
      name: item.name,
      brandName: item.brand_name,
      color: item.color,
      price: item.price,
      quantity: item.quantity
    });
  }

  const result = Object.values(grouped);

  result.sort((a, b) => {
    const ramA = parseInt(a.ram);
    const ramB = parseInt(b.ram);
    const storageA = parseInt(a.storage);
    const storageB = parseInt(b.storage);

    if (ramA !== ramB) return ramA - ramB;
    if (storageA !== storageB) return storageA - storageB;

    const priceA = Math.min(...a.options.map(o => o.price));
    const priceB = Math.min(...b.options.map(o => o.price));
    return priceA - priceB;
  });

  return result;
}

}
module.exports = ProductService;
