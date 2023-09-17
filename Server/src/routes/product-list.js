const express = require("express");
const router = express.Router();

const productsConTroller = require("../app/Controllers/ProductsControllers");
const outletConTroller = require("../app/Controllers/OutletControllers");

router.get("/create", productsConTroller.create);
router.post("/store", productsConTroller.store);

router.get("/outlet", outletConTroller.create);
router.post("/outletStore", outletConTroller.outlet);

router.post("/handle-form-actions", productsConTroller.handleFormActions);
router.get("/:id/edit", productsConTroller.edit);
router.put("/:id", productsConTroller.update);
router.delete("/:id", productsConTroller.delete);
router.get("/", productsConTroller.show);
// router.get("/:slug", productsConTroller.show);
module.exports = router;
