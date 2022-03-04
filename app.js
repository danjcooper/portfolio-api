const express = require('express');
const notion = require('./notion');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
require('dotenv').config();

app.post('/', async (req, res) => {
  // const { subject, message, signed } = req.body;

  try {
    await addItem(req.body);
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

async function addItem({ subject, message, signed }) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [
            {
              text: {
                content: subject,
              },
            },
          ],
        },
        message: {
          rich_text: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
        from: {
          rich_text: [
            {
              text: {
                content: signed,
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
