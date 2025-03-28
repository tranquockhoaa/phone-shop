const Cart = require('./../models/cart');

class CartService {
  static async createCart(data) {
    const newCart = await Cart.create({
      total_price: data.totalPrice,
      status: data.status,
    });
    return newCart;
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
