const server = require("express").Router();
const { Order, OrderLine , User } = require("../db.js");

//A partir de Aca agreo Ariel

//S44
server.get("/", (req, res, next) => {
  Order.findAll({
    where: {
      orderStatus: req.query.orderStatus,
    }, include: {all: true, nested: true}
  })
    .then((orders) => {
      res.json(orders);
    })
    .catch(next);
});

//S46
server.get("/:id", (req, res, next) => {
  Order.findByPk(req.params.id, {include: {all: true, nested: true}})
    .then((orders) => {
      res.json(orders);
    })
    .catch(next);
});

//S47
server.put("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const { orderStatus, total } = req.body;
    Order.update(
      {
        orderStatus,
        total,
      },
      { where: { id } }
    ).then(() => {
      res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
  }
});

server.get('/all/users', (req, res, next) => {
    Order.findAll( {include: {all: true, nested: true}})
        .then(orders => res.json(orders))
        .catch(next)
 });

module.exports = server;
