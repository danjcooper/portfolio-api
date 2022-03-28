const Meals = require('../models/meals');
const { fullUrl } = require('../helpers');

const index = async (req, res) => {
  try {
    const result = await Meals.all;
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateIsInMealPlan = async (req, res) => {
  try {
    const response = await Meals.updateIsInMealPlan(req.body);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { index, updateIsInMealPlan };
