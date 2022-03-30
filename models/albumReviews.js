const notion = require('../notion');
require('dotenv').config();

const databaseId = process.env.NOTION_ALBUM_REVIEWS_DATABASE_ID;

module.exports = class AlbumReviews {
  constructor(data) {
    this.id = data.id;
    this.artist = data.properties.Artist.rich_text[0].plain_text;
    this.title = data.properties.Title.title[0].plain_text;
    this.year = data.properties.Year.number;
    this.ownOnVinyl = data.properties.Vinyl.checkbox;
    this.spotifyUrl = data.properties.Link.url;
    this.artworkUrl = data.properties.Artwork.url;
    this.rating = data.properties.Rating.number;
    this.genres = data.properties.Genre.multi_select.map((item) => item.name);
    this.review = data.properties.Review.rich_text[0].plain_text;
  }

  static create(data) {
    return new AlbumReviews(data);
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await notion.databases.query({
          database_id: databaseId,
        });
        const reviews = result.results.map((item) => this.create(item));
        resolve(reviews);
      } catch (error) {
        reject(error);
      }
    });
  }
  static getRandomReview() {
    return new Promise(async (resolve, reject) => {
      try {
        const reviews = await this.all;
        const randomIndex = Math.floor(Math.random() * reviews.length);
        resolve(reviews[randomIndex]);
      } catch (error) {
        reject(error);
      }
    });
  }
};
