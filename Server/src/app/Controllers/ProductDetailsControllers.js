const ProductList = require("../models/ProductList");

class ProductDetailsControllers {
  // GET /product-detail/:id
  async showDetail(req, res, next) {
    try {
      // Get id from the query parameters
      const { id } = req.query;

      // Handle logic to get product info from the database based on ProductID
      const proInfo = await ProductList.findByPk(id);

      if (proInfo) {
        // Product found, send it as JSON response
        res.json(proInfo);
      } else {
        // Product not found, send a 404 status
        res.status(404).json({ error: "Product not found" });
      }
    } catch (err) {
      console.error("Error getting product Id", err);
      next(err);
    }
  }
}

module.exports = new ProductDetailsControllers();
