const Ram = require('./../models/ram');

class RamService {
  static async createRam(data) {
    console.log('sv running');
    const newRam = await Ram.create({
      size: data.size,
    });
    return newRam;
  }

  static async getAllRam() {
    const allRam = await Ram.findAll();
    return allRam;
  }
  static async getRamById(id) {
    const ram = await Ram.findByPk(id);
    return ram;
  }
  static async updateRam(id, data) {
    const ram = await Ram.findByPk(id);
    await ram.update({ size: data.size });
    return ram;
  }
}
module.exports = RamService;
