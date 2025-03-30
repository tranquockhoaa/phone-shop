const CartDetail = require('./../models/cartDetail');

class CartDetaiService {
  static async createCartDetail(data) {
    const newCartDetail = await CartDetail.create({
      ...data,
    });
    return newCartDetail;
  }

  static async updateCartDetail(id, data) {
    const cartDetail = await CartDetail.findByPk(id);
    await cartDetail.update({
      quantity: data.quantity,
      unit_price: data.unitPrice,
    });
    return cartDetail;
  }

  static async getAllCartDetail() {
    const allCartDetail = await CartDetail.findAll();
    return allCartDetail;
  }

  static async getCartDetailById(id) {
    const cartDetail = await CartDetail.findByPk(id);
    return cartDetail;
  }

  static async removeCartDetail(id) {
    const deleteCartDetail = await CartDetail.destroy({
      where: { cart_detail_id: id },
    });
    if (deleteCartDetail) {
      return `cartDetail have been deleted`;
    } else return 'cart not exited';
  }
}

module.exports = CartDetaiService;
