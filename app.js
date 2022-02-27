const express = require('express');
const app = express();
// import { Client } from '@notionhq/client';
const { Client } = require('@notionhq/client');

require('dotenv').config();

const notion = new Client({ auth: process.env.NOTION_KEY });

app.get('/', async (req, res) => {
  await addItem('Yurts in Big Sur, California');
  res.send('Item added.');
});

module.exports = app;

const databaseId = process.env.NOTION_DATABASE_ID;

async function addItem(text) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
      },
    });
    console.log(response);
    console.log('Success! Entry added.');
  } catch (error) {
    console.error(error.body);
  }
}
