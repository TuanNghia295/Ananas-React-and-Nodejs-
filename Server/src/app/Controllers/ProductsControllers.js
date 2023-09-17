const ProductList = require("../models/ProductList");

class CourseController {
  // [GET] /product-list/:slug
  async show(req, res, next) {
    try {
      const response = await ProductList.findAll();
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // [GET] /product-list/create
  create(req, res, next) {
    res.render("product-list/create");
  }

  // [POST] /product-list/store
  // [POST] /product-list/store
  store(req, res, next) {
    const formData = req.body;
    formData.image1 = `https://ananas.vn/wp-content/uploads/${req.body.image1}-500x500.jpeg`;
    formData.image2 = `https://ananas.vn/wp-content/uploads/${req.body.image2}-500x500.jpeg`;
    formData.image3 = `https://ananas.vn/wp-content/uploads/${req.body.image3}-500x500.jpeg`;
    formData.image4 = `https://ananas.vn/wp-content/uploads/${req.body.image4}-500x500.jpeg`;

    ProductList.create(formData)
      .then((createdProduct) => {
        console.log("Inserted product:", createdProduct);
        res.redirect("/");
      })
      .catch((error) => {
        console.error("Error inserting product:" + error);
        next(error);
      });
  }

  // [GET] /product-list/:id/edit
  edit(req, res, next) {
    const productId = req.params.id;
    ProductList.findByPk(productId)
      .then((product) =>
        res.render("product-list/edit", {
          dataCourse: product.toJSON(),
        })
      )
      .catch(next);
  }

  // [PUT] /product-list/:id
  update(req, res, next) {
    const productId = req.params.id;
    const productBody = req.body;

    ProductList.findByPk(productId)
      .then((product) => {
        // Kiểm tra nếu product không tồn tại
        if (!product) {
          throw new Error("Product not found");
        }

        // Cập nhật dữ liệu product
        product.set(productBody);

        // Set the slug to the id value
        product.slug = product.id.toString();

        // Kiểm tra nếu slug mới trùng với slug của bất kỳ product nào khác
        return ProductList.findOne({ where: { slug: product.slug } }).then(
          (existingProduct) => {
            if (
              existingProduct &&
              existingProduct.id.toString() !== productId
            ) {
              product.slug =
                product.id.toString() +
                "-" +
                Math.random().toString(36).substr(2, 5);
            }

            // Lưu dữ liệu đã được cập nhật
            return product.save();
          }
        );
      })
      .then(() => res.redirect("/me/stored/courses"))
      .catch((error) => {
        console.log("error:", error.message);
        next(error);
      });
  }

  // [DELETE] /product-list/:id
  delete(req, res, next) {
    const productId = req.params.id;
    ProductList.destroy({ where: { id: productId } })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [POST] /product-list/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        const courseIds = req.body.courseIds;
        ProductList.destroy({ where: { id: courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;

      default:
        res.json({ message: "Action invalid" });
        break;
    }
  }
}

module.exports = new CourseController();
