const mealsModal = require('../models/meals');

const getAllMeals = async (req, res) => {
  try {
    const result = await mealsModal.all;
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
    const result = mealsModal.updateShoppingList(req.body);
    res.send({ data: result });
    return;
  } catch (error) {
    res.send(error.message);
    return;
  }
};

module.exports = { getAllMeals, updateMeals };
