const ProductList = require("../models/ProductList");
class ProductDetailsControllers {
  // [GET] /product-detail/:id
  showDetail(req, res, next) {
    // Get id on the params bar
    const productId = req.params.id;
    // handle logic to get product info from database based on ProductID
    ProductList.findByPk(productId)
      .then((proInfo) => res.json(proInfo))
      .catch((err) => {
        console.log("error getting product Id", err);
        next(err);
      });
  }
}

module.exports = new ProductDetailsControllers();
