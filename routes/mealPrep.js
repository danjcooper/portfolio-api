const express = require('express');
const router = express.Router();
const ingredientsController = require('../controllers/ingredients');
const mealsController = require('../controllers/meals');

router.get('/', ingredientsController.index);

router.get('/meals/all', mealsController.index);
router.patch('/meals/update', mealsController.updateIsInMealPlan);

router.get('/ingredients/all', ingredientsController.getAllMeals);
router.get(
  '/ingredients/all/byDepartment',
  ingredientsController.getAllMealsByDepartment
);
router.get(
  '/ingredients/notInRecipe',
  ingredientsController.getAllIngredientsNotInARecipe
);
router.get(
  '/ingredients/departments/all',
  ingredientsController.getAllDepartmentNames
);
router.patch('/ingredients/update', ingredientsController.updateMeals);
router.patch(
  '/ingredients/removeAllFromBasket',
  ingredientsController.removeAllFromBasket
);

module.exports = router;
