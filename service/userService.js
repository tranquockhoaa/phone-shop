const User = require('.././models/user');

class UserService {
  static async getInforByEmail(email) {
    console.log('userService');
    const user = await User.findOne({ where: { email: email } });
    const infor = {
      email: user.email,
      fullName: user.full_name,
      phoneNumber: user.phone_number,
      address: user.address,
      birthDate: user.birth_date,
      gender: user.gender,
    };
    console.log(user);
    return infor;
  }
}

module.exports = UserService;
