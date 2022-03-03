const express = require('express');
const notion = require('./notion');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
require('dotenv').config();

app.post('/', async (req, res) => {
  const { subject, message, signed } = req.body;

  try {
    await addItem(subject);
    res.status(200).send('Item added.');
  } catch (error) {
    res.status(500).send(e.message);
  }
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
