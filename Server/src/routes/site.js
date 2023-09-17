const express = require("express");
const router = express.Router();

const siteConTroller = require("../app/Controllers/SiteControllers");

router.get('/search', siteConTroller.search);
router.get("/", siteConTroller.home);

module.exports = router;
