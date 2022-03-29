const notion = require('../notion');
const {
  getAllDepartments,
  getIngredientNotes,
  itemIsInShoppingList,
  getIngredientDepartment,
  sortIngredientsByDepartment,
  removeDuplicatesFromArray,
  ingredientIsUsedInRecipe,
} = require('../helpers');
require('dotenv').config();

const databaseId = process.env.NOTION_INGREDIENTS_DATABASE_ID;

module.exports = class Ingredients {
  constructor(data) {
    (this.id = data.id),
      (this.name = data.properties.Name.title[0].text.content),
      (this.department = getIngredientDepartment(data)),
      (this.quantity = data.properties.QTY.rollup.number),
      (this.notes = getIngredientNotes(data)),
      (this.inShoppingList = itemIsInShoppingList(data)),
      (this.manuallyAdded = data.properties['Manually Add'].checkbox),
      (this.inShoppingBasket = data.properties['Picked Up'].checkbox);
    this.isUsedInRecipe = ingredientIsUsedInRecipe(data);
  }

  static create(data) {
    const newIngredient = new Ingredients(data);
    return newIngredient;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await notion.databases.query({
          database_id: databaseId,
        });

        const data = response.results.map((elm) => Ingredients.create(elm));

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static updateShoppingList(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await notion.pages.update({
          page_id: data.page_id,
          properties: {
            'Picked Up': {
              checkbox: data.checked,
            },
          },
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  static get allIngredientsByDepartment() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await notion.databases.query({
          database_id: databaseId,
        });

        const departments = getAllDepartments(response.results);
        const allIngredients = await Ingredients.all;

        const result = sortIngredientsByDepartment(departments, allIngredients);

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async removeAllIngredientsFromBasket() {
    const allIngredients = await Ingredients.all;

    allIngredients.forEach((ingredient) => {
      Ingredients.updateShoppingList({
        page_id: ingredient.id,
        checked: false,
      });
    });
  }

  static get getAllDepartmentNames() {
    return new Promise(async (resolve, reject) => {
      try {
        const allIngredients = await Ingredients.all;
        let result = allIngredients.map((item) => item.department);
        result = removeDuplicatesFromArray(result);

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  static get getAllIngredientsNotInARecipe() {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await Ingredients.all;
        result = result.filter((item) => !item.isUsedInRecipe);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async updateManuallyAddedItem(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = notion.pages.update({
          page_id: data.page_id,
          properties: {
            'Manually Add': {
              checkbox: data.checked,
            },
          },
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
};
