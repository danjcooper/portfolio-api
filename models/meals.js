const notion = require('../notion');
require('dotenv').config();

const databaseId = process.env.NOTION_RECIPE_DATABASE_ID;

module.exports = class Message {
  constructor(data) {}

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await notion.databases.query({
          database_id: databaseId,
        });
        // console.log(response.results[0].properties.title[0].text.content);
        // console.log(response);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
};
