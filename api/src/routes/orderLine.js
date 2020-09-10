const server = require("express").Router();
const { OrderLine, Products, Order } = require("../db.js");


server.delete('/:id', (req, res, next) => {
	try {
		const { id } = req.params;
		OrderLine.destroy({ where: { id } }).then(() => {
			res.sendStatus(200);
		});
	} catch (error) {
		console.error(error.message);
	}
});



module.exports = server;

// Products.belongsToMany(Order, {through: 'order_products'})
// Order.belongsToMany(Products, {through: 'order_products'})