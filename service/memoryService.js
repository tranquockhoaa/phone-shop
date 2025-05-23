const { Memory } = require('./../models/index');
const AppError = require('./../utils/appError');
class MemoryService {
  static async createMemory(data) {
    const checkMemory = await Memory.findOne({
      where: {
        storage_size: data.storageSize,
        ram_size: data.ramSize,
      },
    });
    if (checkMemory) {
      throw new AppError('Memory already exists', 400);
    }
    const newMemory = await Memory.create({ storage_size: data.storageSize, ram_size: data.ramSize });
    return newMemory;
  }
}

module.exports = MemoryService;