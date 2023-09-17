const express = require('express');
const router = express.Router();

const newsConTroller = require('../app/Controllers/NewsControllers');

router.get('/:slug', newsConTroller.hotNews);
router.get('/', newsConTroller.index);

module.exports = router;
