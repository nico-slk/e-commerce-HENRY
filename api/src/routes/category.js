const server = require("express").Router();
const { Category, Product } = require("../db.js");
const isAuthenticated = require('./authenticate').isAuthenticated

server.get("/", (req, res, next) => {
  Category.findAll()
    .then((products) => {
      res.json(products);
    })
    .catch(next);
});

server.get("/:nombreCat", (req, res, next) => {
  Category.findOne({where:{
    name: req.params.nombreCat
  }, include: { all: true, nested: true }})
  .then((cat)=>{
    res.json(cat)
  })
})

server.post("/", isAuthenticated, (req, res, next) => {
	if(!req.user.admin){
		res.status(403).json('{"error": "Debe ser administrador"}')
	}
  const { name, description } = req.body;
  Category.create({
    name,
    description,
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(next);
});

server.delete("/:id", isAuthenticated, (req, res, next) => {
	if(!req.user.admin){
		res.status(403).json('{"error": "Debe ser administrador"}')
	}
  try {
    const { id } = req.params;
    Category.destroy({ where: { id: id } }).then(() => {
      res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
  }
});

server.put("/:id", isAuthenticated, (req, res, next) => {
	if(!req.user.admin){
		res.status(403).json('{"error": "Debe ser administrador"}')
	}
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    Category.update(
      {
        name,
        description,
      },
      { where: { id } }
    ).then(() => {
      res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = server;
