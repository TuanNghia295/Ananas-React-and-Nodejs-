const express = require("express");
const router = express.Router();

const productDetalsController = require("../app/Controllers/ProductDetailsControllers");

router.get("/:id", productDetalsController.showDetail);

module.exports = router;
