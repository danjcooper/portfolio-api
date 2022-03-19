const mealsModal = require('../models/meals');

const getAllMeals = async (req, res) => {
  try {
    const result = await mealsModal.all;
    res.sendStatus(200).send({ data: result });
    return;
  } catch (error) {
    res.sendStatus(500).send(error.message);
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
