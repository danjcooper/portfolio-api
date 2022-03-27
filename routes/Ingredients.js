const express = require('express');
const router = express.Router();
const ingredientsController = require('../controllers/ingredients');

router.get('/', ingredientsController.index);
router.get('/all', ingredientsController.getAllMeals);
router.get('/all/byDepartment', ingredientsController.getAllMealsByDepartment);
router.patch('/update', ingredientsController.updateMeals);

module.exports = router;
