const Brand = require('./../models/brand');

class BrandService {
  static async createBrand(data) {
    const newBrand = await Brand.create({
      ...data
    });
    return newBrand;
  }

  static async updateBrand(id, data) {
    const brand = await Brand.findByPk(id);
    await brand.update({
      name: data.name,
      infomation: data.infomation,
    });
    return brand;
  }

  static async getBrandByPk(id) {
    const brand = await Brand.findByPk(id);
    return brand;
  }

  static async getAllBrand() {
    const allBrand = await Brand.findAll();
    return allBrand;
  }
}

module.exports = BrandService;
