const server = require("express").Router();
const { Product, Category, Image, Review } = require("../db.js");
var Sequelize = require("sequelize");

server.get(`/`, (req, res, next) => {
  let { query } = req.query;
  query = "%" + query + "%";
  // --> en airTable dice que pasemos por query, como?
  Product.findAll({
    where: {
      [Sequelize.Op.or]: [
        {
          name: {
            [Sequelize.Op.iLike]: query,
          },
        },
        {
          description: {
            [Sequelize.Op.iLike]: query,
          },
        },
      ],
    },
    include: [Category, Image, Review]
  })
    .then((products) => {
      res.json(products);
    })

    .catch(next);
  //res.json(query)
});

module.exports = server;
