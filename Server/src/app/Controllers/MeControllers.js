const ProductList = require("../models/ProductList");
const { Sequelize } = require("sequelize");
const { Op } = Sequelize;
const { sequelize } = require("../../util/sql");
const { QueryTypes } = require("sequelize");

class MeControllers {
  // [GET] /me/stored/courses
  async storedCourses(req, res, next) {
    try {
      const courses = await ProductList.findAll();
      res.render("me/stored-courses", {
        courses: courses, // Truyền mảng courses như một biến
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MeControllers();
