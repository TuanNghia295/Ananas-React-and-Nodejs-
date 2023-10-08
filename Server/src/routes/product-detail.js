const express = require("express");
const router = express.Router();

const productDetailsController = require("../app/Controllers/ProductDetailsControllers");

router.get("/", productDetailsController.showDetail);

module.exports = router;
