const Voucher = require('./../models/voucher');

class VoucherService {
  static async createVoucher(data) {
    console.log('service');
    const newVoucher = await Voucher.create({
      code: data.code,
      description: data.description,
      start_date: data.startDate,
      end_date: data.endDate,
    });
    return newVoucher;
  }
}

module.exports = VoucherService;
