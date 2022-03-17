const express = require('express');
const router = express.Router();
const mealsController = require('../controllers/meals');

router.get('/all', mealsController.getAllMeals);
router.patch('/update', mealsController.updateMeals);

module.exports = router;
