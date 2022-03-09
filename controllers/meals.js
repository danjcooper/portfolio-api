const mealsModal = require('../models/meals');

const getAllMeals = async (req, res) => {
  try {
    const result = await mealsModal.all;
    res.status(200).send({ data: result });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getAllMeals };
