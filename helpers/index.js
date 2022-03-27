var url = require('url');

const getAllDepartments = (data) => {
  const output = [];

  data.forEach((elm) => {
    const department = elm.properties.Department.multi_select[0].name;
    if (output.indexOf(department) === -1) output.push(department);
  });
  return output;
};

const sortIngredientsByDepartment = (departments, ingredients) => {
  const output = {};
  departments.forEach((department) => (output[department] = null));

  for (let i = 0; i < departments.length; i++) {
    var departmentIngredients = ingredients.filter(
      (ingredient) => ingredient.department === departments[i]
    );

    output[departments[i]] = departmentIngredients;
  }
  return output;
};

const getIngredientNotes = (ingredient) => {
  return ingredient.properties.Notes.rich_text.length > 0
    ? ingredient.properties.Notes.rich_text[0].text.content
    : null;
};

const itemIsInShoppingList = (ingredient) => {
  const checkboxes = Array.from(
    ingredient.properties['Add to Shopping List'].rollup.array
  );

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checkbox) {
      return true;
    }
  }
  return false;
};

const getIngredientDepartment = (ingredient) => {
  return ingredient.properties.Department.multi_select[0].name;
};

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl,
  });
}

module.exports = {
  getAllDepartments,
  sortIngredientsByDepartment,
  getIngredientNotes,
  itemIsInShoppingList,
  getIngredientDepartment,
  fullUrl,
};
