const ingredientsModal = require('../models/ingredients');
const { fullUrl } = require('../helpers');

const index = (req, res) => {
  const routeInformation = [
    {
      endpoint: `${fullUrl(req)}all`,
      description:
        'Returns all ingredients used in all means and their relevant data.',
    },
    {
      endpoint: `${fullUrl(req)}all/byDepartment`,
      description:
        'Returns all Ingredients sorted by their department property.',
    },
  ];
  res.status(200).send(routeInformation);
};

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

module.exports = { getAllMeals, updateMeals, getAllMealsByDepartment, index };
