const Color = require('./../models/color');

class ColorService {
  static async createColor(dataColor) {
    const newColor = await Color.create({
      ...dataColor,
    });
    return newColor;
  }

  static async getAllColor() {
    console.log('getAll running');
    const allColor = await Color.findAll();
    return allColor;
  }

  static async getColorByPk(id) {
    const color = await Color.findByPk(id);
    return color;
  }

  static async updateColor(id, dataUpdate) {
    const color = await Color.findByPk(id);
    console.log(color);
    await color.update({
      name: dataUpdate.name,
      description: dataUpdate.description,
    });
    return color;
  }
}

module.exports = ColorService;
