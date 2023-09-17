const { mongooseToObject } = require("../../util/sql");
const Product = require("../models/ProductList");
const slugify = require("slugify");
class CourseController {
  // [GET] /courses/create
  create(req, res, next) {
    res.render("product-list/createOutlet");
  }

  // [POST] /courses/store
  outlet(req, res, next) {
    const formData = req.body;
    formData.image1 = `https://ananas.vn/wp-content/uploads/${req.body.image1}-500x500.jpeg`;
    formData.image2 = `https://ananas.vn/wp-content/uploads/${req.body.image2}-500x500.jpeg`;
    const course = new Product(formData);
    course
      .save()
      .then(() => res.redirect("/"))
      .catch(next);
  }
}

module.exports = new CourseController();
