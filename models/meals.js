const notion = require('../notion');
require('dotenv').config();

const databaseId = process.env.NOTION_MEALS_DATABASE_ID;

module.exports = class Meals {
  constructor(data) {
    (this.id = data.id),
      (this.name = data.properties.Name.title[0].text.content),
      (this.emoji = data.icon.emoji),
      (this.isInMealPlan = data.properties['Add to Shopping List.'].checkbox);
  }

  static create(data) {
    const newMeal = new Meals(data);
    return newMeal;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await notion.databases.query({
          database_id: databaseId,
        });
        const data = response.results.map((item) => Meals.create(item));

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  static updateIsInMealPlan(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await notion.pages.update({
          page_id: data.page_id,
          properties: {
            'Add to Shopping List.': {
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
