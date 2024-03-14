"use strict";
const axios = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const response = await axios.get("https://api.jikan.moe/v4/anime");
    const data = response.data.data;
    // let genres = [];
    // data.forEach((el) => {
    //   el.genres.forEach((elm) => {
    //     genres.push(elm.name);
    //   });
    // });
    
    // console.log(genres, "<<<");
    let seedData = data.map((el) => {
      const title = el.title;
      const imgUrl = el.images.jpg.image_url;
      const episode = el.episodes;
      const ScoreId = 1
      const rating = el.score;
      const synopsis = el.synopsis;
      const genre = el.genres.map(genre => genre.name); 
      const trailer = el.trailer.url;
      const status = el.status;
      const type = el.type;
      const updatedAt = new Date();
      const createdAt = new Date();
  
      return {
        title,
        imgUrl,
        episode,
        ScoreId,
        rating,
        synopsis,
        genre,
        trailer,
        status,
        type,
        updatedAt,
        createdAt
      };
    });
    // console.log(seedData, "<<<<");
    await queryInterface.bulkInsert("Animes", seedData);

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Animes", null, {});
  },
};