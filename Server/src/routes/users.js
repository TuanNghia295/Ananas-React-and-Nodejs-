const express = require("express");
const router = express.Router();

const userDetailsController = require("../app/Controllers/UserControllers");
router.get("/create", userDetailsController.createUser);
router.post("/storedUser", userDetailsController.storeUser);
router.post("/info", userDetailsController.infoUser);
router.get("/", userDetailsController.checkAccount);

module.exports = router;
