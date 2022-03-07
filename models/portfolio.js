const notion = require('../notion');
require('dotenv').config();

const databaseId = process.env.NOTION_DATABASE_ID;

module.exports = class Message {
  constructor(data) {
    this.subject = data.subject;
    this.message = data.message;
    this.signed = data.signed;
  }
  static get all() {
    // TODO Return all messages.
  }

  static async create(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const newMessage = new Message(data);
        const response = await notion.pages.create({
          parent: { database_id: databaseId },
          properties: {
            title: {
              title: [
                {
                  text: {
                    content: newMessage.subject,
                  },
                },
              ],
            },
            message: {
              rich_text: [
                {
                  text: {
                    content: newMessage.message,
                  },
                },
              ],
            },
            from: {
              rich_text: [
                {
                  text: {
                    content: newMessage.signed,
                  },
                },
              ],
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
