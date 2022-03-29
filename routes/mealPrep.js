const express = require('express');
const router = express.Router();
const ingredientsController = require('../controllers/ingredients');
const mealsController = require('../controllers/meals');

router.get('/', ingredientsController.index);

//Meals
router.get('/meals/all', mealsController.index);
router.patch('/meals/update', mealsController.updateIsInMealPlan);

//Ingredients
//Get
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
//Patch
router.patch('/ingredients/update', ingredientsController.updateMeals);
router.patch(
  '/ingredients/removeAllFromBasket',
  ingredientsController.removeAllFromBasket
);
router.patch(
  '/ingredients/update/manuallyAdded',
  ingredientsController.updateIngredientManuallyAdd
);

module.exports = router;
