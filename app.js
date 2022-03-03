const express = require('express');
const notion = require('./notion');
const cors = require('cors');
const app = express();

app.use(cors());
require('dotenv').config();

app.get('/', async (req, res) => {
  await addItem('Yurts in Big Sur, California');
  res.send('Item added.');
});

app.post('/message', async (req, res) => {
  await addItem('Yurts in Big Sur, California');
  res.send('Item added.');
});

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

module.exports = app;
