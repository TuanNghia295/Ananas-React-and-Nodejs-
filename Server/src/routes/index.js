const newsRouter = require("./news");
const productListRouter = require("./product-list");
const meRouter = require("./me");
const siteRouter = require("./site");
const productDetailsControllers = require("./product-detail");

function route(app) {
  app.use("/me", meRouter);
  app.use("/news", newsRouter);
  app.use("/product-list", productListRouter);
  app.use("/product-detail", productDetailsControllers);
  app.use("/", siteRouter);
}

module.exports = route;
