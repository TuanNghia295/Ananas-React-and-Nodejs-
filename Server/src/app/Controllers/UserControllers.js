const User = require("../models/User");

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

  // [POST] /usersAccount/storeUser
  async storeUser(req, res, next) {
    try {
      const formData = req.body;

      // Check user exist already or not
      const existingUser = await User.findOne({
        where: {
          acc_name: formData.acc_name,
        },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Người dùng với cùng acc_name đã tồn tại" });
      }

      // check password length larger than 6 or not
      if (formData.acc_pass.length < 6) {
        return res
          .status(400)
          .json({ error: "Độ dài mật khẩu phải lớn hơn hoặc bằng 6" });
      }

      // Create a new user using your User model and the provided form data
      await User.create(formData);

      // Redirect to a different route or send a response as needed
      res.redirect("/"); // You can change this to the appropriate route
    } catch (error) {
      // Handle any errors during user creation
      console.error("Error inserting user:" + error);
      next(error);
    }
  }

  // [Get] /users/infoUser
  async infoUser(req, res) {
    try {
      const { userName, password } = req.body; // Lấy thông tin từ client
      const user = await User.findOne({
        where: { acc_name: userName },
      });

      if (user) {
        // So sánh mật khẩu được cung cấp từ client với mật khẩu đã băm và mã hóa từ cơ sở dữ liệu
        const passwordMatch = await bcrypt.compare(password, user.acc_pass);

        if (passwordMatch) {
          // Mật khẩu hợp lệ, phản hồi về client
          res.status(200).json({ message: "Mật khẩu hợp lệ" });
        } else {
          // Mật khẩu không hợp lệ, phản hồi về client
          res.status(401).json({ error: "Mật khẩu không hợp lệ" });
        }
      } else {
        // Không tìm thấy tài khoản, phản hồi về client
        res.status(404).json({ error: "Tài khoản không tồn tại" });
      }
    } catch (error) {
      console.error("Lỗi khi lấy mật khẩu từ cơ sở dữ liệu:", error);
      // res.status(500).json({ error: "Lỗi khi xử lý yêu cầu" }); // Phản hồi lỗi 500 nếu có lỗi xảy ra
    }
  }
}

module.exports = new UserController();
