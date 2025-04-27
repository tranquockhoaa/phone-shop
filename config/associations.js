const ProductDetail = require('../models/productDetails');
const Color = require('../models/color');
const Brand = require('../models/brand');
const Product = require('../models/product');
const CartDetail = require('../models/cartDetail');
const Review = require('../models/review');
const Image = require('../models/image');
const Cart = require('../models/cart');
const User = require('../models/user');
const ProductDetails = require('../models/productDetails');
const Memory = require('../models/memory');
const Voucher = require('../models/voucher');
const UserVoucher = require('../models/userVoucher');
const ReviewImage = require('../models/reviewImage');

const defineAssociations = () => {
  Color.hasMany(ProductDetail, { foreignKey: 'color_id' });
  ProductDetail.belongsTo(Color, { foreignKey: 'color_id' });

  Brand.hasMany(Product, { foreignKey: 'brand_id' });
  Product.belongsTo(Brand, { foreignKey: 'brand_id' });

  Product.hasMany(ProductDetail, { foreignKey: 'product_id' });
  ProductDetail.belongsTo(Product, { foreignKey: 'product_id' });

  ProductDetail.hasMany(Review, { foreignKey: 'product_detail_id' });
  Review.belongsTo(ProductDetail, { foreignKey: 'product_detail_id' });

  Memory.hasMany(ProductDetail, { foreignKey: 'memory_id' });
  ProductDetail.belongsTo(Memory, { foreignKey: 'memory_id' });

  Cart.hasMany(CartDetail, { foreignKey: 'cart_id' });
  CartDetail.belongsTo(Cart, { foreignKey: 'cart_id' });
  ProductDetails.hasMany(CartDetail, { foreignKey: 'product_detail_id' });
  CartDetail.belongsTo(ProductDetail, { foreignKey: 'product_detail_id' });

  Review.hasMany(Image, { foreignKey: 'review_id' });
  Image.belongsTo(Review, { foreignKey: 'review_id' });

  User.hasMany(Cart, { foreignKey: 'user_id' });
  Cart.belongsTo(User, { foreignKey: 'user_id' });

  User.belongsToMany(Voucher, { through: UserVoucher });
  Voucher.belongsToMany(User, { through: UserVoucher });

  ProductDetail.hasMany(ReviewImage, { foreignKey: 'product_detail_id' });
  ReviewImage.belongsTo(ProductDetail, { foreignKey: 'product_detail_id' });
``};

module.exports = defineAssociations;
