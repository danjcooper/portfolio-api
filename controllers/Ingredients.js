const ingredientsModal = require('../models/Ingredients');

const getAllMeals = async (req, res) => {
  try {
    const result = await ingredientsModal.all;
    res.status(200);
    res.send({ data: result });
    return;
  } catch (error) {
    res.status(500);
    res.send(error.message);
    return;
  }
};

const getAllMealsByDepartment = async (req, res) => {
  try {
    const result = await ingredientsModal.allIngredientsByDepartment;
    res.status(200);
    res.send({ data: result });
    return;
  } catch (error) {
    res.status(500);
    res.send(error.message);
    return;
  }
};

const updateMeals = async (req, res) => {
  try {
    const result = ingredientsModal.updateShoppingList(req.body);
    res.status(200);
    res.send({ data: result });
    return;
  } catch (error) {
    res.status(500);
    res.send(error.message);
    return;
  }
};

module.exports = { getAllMeals, updateMeals, getAllMealsByDepartment };
