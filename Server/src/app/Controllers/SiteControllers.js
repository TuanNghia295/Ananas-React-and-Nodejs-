const Banner = require("../models/Banner"); // Import các mô hình SQL
const { multipleSQLToObject } = require("../../util/sql");
const ProductList = require("../models/ProductList");
// sử dụng toán tử "Op.like" của Sequelize trong điều kiện tìm kiếm
// để  tìm kiếm các sản phẩm có tên chứa một từ khóa cụ thể.
const { Op } = require("sequelize");

class SiteControllers {
  async home(req, res, next) {
    try {
      const khoahoc = await Banner.findAll({}); // Sử dụng phương thức findAll() để lấy tất cả các bản ghi
      // res.json(multipleSQLToObject(khoahoc));
      res.render("home", {
        courses: khoahoc,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // sử dụng async await để sử dụng Express
  async search(req, res) {
    try {
      const pro_name = req.query.name; // Lấy giá trị pro_name từ query parameters
      const timkiem = await ProductList.findAll({
        where: {
          pro_name: {
            [Op.like]: `%${pro_name}%`,
          },
        },
      });

      if (timkiem) {
        console.log("Tìm kiếm thành công", timkiem);
        res.status(200).json(timkiem);
      } else {
        console.log("Không tìm thấy sản phẩm có tên:", pro_name);
        // res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sản phẩm:", error);
      res.status(500).json({ message: "Lỗi server khi tìm kiếm" });
    }
  }
}

module.exports = new SiteControllers();
