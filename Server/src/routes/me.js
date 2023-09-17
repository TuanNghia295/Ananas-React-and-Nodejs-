const express = require('express');
const router = express.Router();

const meConTroller = require('../app/Controllers/MeControllers');

router.get('/stored/courses', meConTroller.storedCourses);

module.exports = router;
