const User = require("../models/User");
const bcrypt = require("bcrypt");

class UserController {
  // [GET] /usersAccount/checkAccount
  async checkAccount(req, res, next) {
    try {
      // Fetch all accounts from the database
      const accounts = await User.findAll();

      // Respond with JSON data
      res.json(accounts);
    } catch (error) {
      // Handle any errors
      console.error(error);
      next(error);
    }
  }

  // [GET] /usersAccount/user
  // Render the create user form
  createUser(req, res, next) {
    res.render("usersAccount/user");
  }

  // [GET] /usersAccount/storeUser
  // [Post] /login/create
  async storeUser(req, res, next) {
    try {
      const formData = req.body;

      // Check user exist already or not
      const existingUser = await User.findOne({
        where: {
          acc_email: formData.acc_email,
        },
      });

      if (existingUser) {
        return res.status(200).json({
          exist: true,
          canCreate: false,
          error: "Người dùng với cùng acc_email đã tồn tại",
        });
      }

      // check password length larger than 6 or not
      if (formData.acc_pass.length < 6) {
        return res.status(200).json({
          passInvalid: true,
          canCreate: false,
          error: "Độ dài mật khẩu phải lớn hơn hoặc bằng 6",
        });
      } else {
        const result = res.status(200).json({
          canCreate: true,
          message: "Đăng ký thành công",
        });
        // Create a new user using your User model and the provided form data
        await User.create(formData);

        return result;
      }
    } catch (error) {
      // Handle any errors during user creation
      console.error("Error inserting user:" + error);
      next(error);
    }
  }

  // [Get] /users/infoUser
  async infoUser(req, res) {
    try {
      const { acc_email, acc_pass } = req.body; // Lấy thông tin từ client
      const user = await User.findOne({
        where: { acc_email: acc_email },
      });

      if (user) {
        // So sánh mật khẩu được cung cấp từ client với mật khẩu đã băm và mã hóa từ cơ sở dữ liệu
        const passwordMatch = await bcrypt.compare(acc_pass, user.acc_pass);
        if (passwordMatch) {
          // Mật khẩu hợp lệ
          res
            .status(200)
            .json({ success: true, message: "Đăng nhập thành công" });
        } else {
          // Mật khẩu không hợp lệ
          res
            .status(200)
            .json({ success: false, message: "Mật khẩu không hợp lệ" });
        }
      } else {
        // Không tìm thấy tài khoản, phản hồi về client
        res
          .status(200)
          .json({ success: false, message: "Tài khoản không tồn tại" });
      }
    } catch (error) {
      console.log(req.body);
      console.error("Lỗi khi từ cơ sở dữ liệu:", error);
      res
        .status(500)
        .json({ success: false, message: "Lỗi khi xử lý yêu cầu" }); // Phản hồi lỗi 500 nếu có lỗi xảy ra
    }
  }
}

module.exports = new UserController();
