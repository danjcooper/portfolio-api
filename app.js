const express = require('express');
const notion = require('./notion');
const { getHeaderBlockUpdate } = require('./helpers');

const cors = require('cors');
const app = express();

const AlbumReviews = require('./models/albumReviews');

app.use(cors());
app.use(express.json());
require('dotenv').config();

const portfolioRoutes = require('./routes/portfolio');
app.use('/portfolio', portfolioRoutes);

const mealPrepRoutes = require('./routes/mealPrep');
app.use('/mealPrep', mealPrepRoutes);

app.get('/homepage', async (req, res) => {
  const artworkBlockId = '51f50ba447854e338d57065e780a5195';
  const artistBlockId = 'c8973f491fe8472a8749740449c5c4b4';
  const titleBlockId = '07f44e6de3fc4978b98051bcf6650457';
  const yearBlockId = 'e9803e5c74dd499c8e4d5cced73ea4a1';
  const ratingBlockId = '2f0b93ff4ce14aa488cd1f829e6fd7ef';
  const reviewBlockId = '98af62f1fef04e00ae13bbd430adc440';

  const { artist, title, artworkUrl, year, rating, review, spotifyUrl } =
    await AlbumReviews.getRandomReview();

  const response = await notion.blocks.update({
    block_id: artworkBlockId,
    //...other keys excluded
    image: {
      external: {
        url: artworkUrl,
      },
    },
  });

  await notion.blocks.update({
    block_id: artistBlockId,
    heading_3: getHeaderBlockUpdate(`Artist: ${artist}`),
  });
  await notion.blocks.update({
    block_id: titleBlockId,
    heading_3: getHeaderBlockUpdate(`Title: ${title}`),
  });
  await notion.blocks.update({
    block_id: yearBlockId,
    heading_3: getHeaderBlockUpdate(`Released: ${year}`),
  });
  await notion.blocks.update({
    block_id: ratingBlockId,
    heading_3: getHeaderBlockUpdate(`Rating: ${rating}`),
  });
  await notion.blocks.update({
    block_id: reviewBlockId,
    heading_3: getHeaderBlockUpdate(`My Review: ${review}`),
  });

  res.send(response);
});

app.get('/reviews', async (req, res) => {
  const result = await AlbumReviews.all;
  res.send(result);
});

module.exports = app;
