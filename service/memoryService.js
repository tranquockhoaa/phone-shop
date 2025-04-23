const { Memory } = require('./../models/index');

class MemoryService {
  static async createMemory(data) {
    const newMemory = await Memory.create({ size: data });
    return newMemory;
  }
}

module.exports = MemoryService;