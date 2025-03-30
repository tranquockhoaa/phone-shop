const Cart = require('./../models/cart');
const Product = require('./../models/product');
const CartDetail = require('./../models/cartDetail');
const CartDetaiService = require('./cartDetailService');
const ProductDetails = require('../models/productDetails');

class CartService {
  static async createCart(data) {
    const newCart = await Cart.create({
      data,
      user_id: data.userId,
    });
    return newCart;
  }

  static async addToCart(userId, data) {
    const productDetail = await ProductDetails.findByPk(data.productDetailId);
    if (!productDetail) {
      let message = `cann't find product`;
      return message;
    }

    let cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) {
      data.userId = userId;
      cart = await this.createCart(data);
    }
    const cartId = cart.cart_id;
    let cartDetail = await CartDetail.findOne({
      where: {
        cart_id: cartId,
        product_detail_id: productDetail.product_detail_id,
      },
    });
    if (cartDetail) {
      const newQuantity = data.quantity;
      const addQuantity = newQuantity || 1;
      console.log(addQuantity);
      cartDetail.quantity += addQuantity;
      await cartDetail.save();
    } else {
      cartDetail = await CartDetaiService.createCartDetail({
        unit_price: productDetail.price,
        quantity: data.quantity,
        cart_id: cartId,
        product_detail_id: data.productDetailId,
      });
    }
    return cartDetail;
  }

  static async getAllCart() {
    const allCart = await Cart.findAll();
    return allCart;
  }

  static async getCartById(id) {
    const cart = await Cart.findByPk(id);
    return cart;
  }

  static async updateCart(id, data) {
    console.log('ok');
    const updateData = await Cart.findByPk(id);

    await updateData.update({
      total_price: data.totalPrice,
      status: data.status,
    });

    return updateData;
  }
}

module.exports = CartService;
