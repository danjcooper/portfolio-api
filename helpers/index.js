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
  const output = [];

  for (let i = 0; i < departments.length; i++) {
    let departmentInfo = {};

    //Filter all products who are in the department.
    var departmentIngredients = ingredients.filter(
      (ingredient) => ingredient.department === departments[i]
    );

    //Add the info to the object.
    departmentInfo.name = departments[i];
    departmentInfo.ingredients = departmentIngredients;

    //Push new object into returned array.
    output.push(departmentInfo);
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
