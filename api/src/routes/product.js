const server = require('express').Router();
const { Product, Category, Image, productsInCategory, Review } = require('../db.js');
const isAuthenticated = require('./authenticate').isAuthenticated

server.get('/', (req, res, next) => {
	Product.findAll({ include: { all: true, nested: true } })
		.then((products) => {
			res.json(products);
		})
		.catch(next);
});

server.get('/:id', (req, res, next) => {

	Product.findByPk(req.params.id, { include: {all: true, nested: true}} )
		.then((products) => {
			res.json(products);
		})
		.catch(next);
});


server.post('/', isAuthenticated, (req, res, next) => {
	if(!req.user.admin){
		res.status(403).json('{"error": "Debe ser administrador"}')
	}
	let { name, description, price, stock, image1, image2, image3, category } = req.body;
	const categories = category; // Viene del cliente como category pero sería mejor si dijera categories
	Product.create({
		name: name,
		description: description,
		price: price,
		stock: stock,
		images: [{ url: image1 }, { url: image2 }, { url: image3 }],
	}, { include: [Image] })
		.then((product) =>
			categories.forEach((categoryId) => {
				Category.findByPk(categoryId).then((category) => product.addCategory(category));
			})
		)
		.then(() => res.sendStatus(201))
		.catch(next);
});

server.put('/:id', isAuthenticated, (req, res) => {
	if(!req.user.admin){
		res.status(403).json('{"error": "Debe ser administrador"}')
	}
	console.info('editando producto')
	const { id } = req.params;
	const { name, description, price, stock, image1, image2, image3, category } = req.body;
	const categories = category;
	try {
		Image.destroy({ where: { productId: id } })
			.then(() => {
				Product.update(
					{
						name,
						description,
						price,
						stock,
					},
					{ where: { id } }
				);
			})
			.then(() => {
				Image.bulkCreate([{ productId: id, url: image1 }, { productId: id, url: image2 }, { productId: id, url: image3 }])
			})
			.then(() => {
				console.info('categoy', category);
				productsInCategory.destroy({ where: { productId: id } }).then(() =>
					productsInCategory.bulkCreate(
						categories.map((e) => {
							if (typeof e === 'object') return { productId: id, categoryId: e.id };
							else return { productId: id, categoryId: e };
						})
					)
				);
				//res.sendStatus(200);
			})
			.then(() => res.sendStatus(200));
	} catch (error) {
		console.log(error);
	}
});

server.delete('/:id', isAuthenticated, (req, res, next) => {
	if(!req.user.admin){
		res.status(403).json('{"error": "Debe ser administrador"}')
	}
	try {
		const { id } = req.params;
		Product.destroy({ where: { id } }).then(() => {
			res.sendStatus(200);
		});
	} catch (error) {
		console.error(error.message);
	}
});



// S54
server.post("/:id/review", (req, res, next) => {
	const { rating, description, userId } = req.body;
	Review.create({
		rating,
		description,
		userId,
		productId: req.params.id
	})
		.then((data) => {
			console.log(data)
			res.sendStatus(201);
		})
		.catch(next);
});

// S55
server.put("/:id/review/:idReview", (req, res, next) => {
	const { id, idReview } = req.params;
	const { rating, description } = req.body;
	try {
		Review.update(
			{
				rating,
				description
			},
			{ where: { productId: id, id: idReview } }
		).then(() => {
			res.sendStatus(200);
		})
	} catch (error) {
		console.error(error.message);
	}
});


// S56
server.delete("/:id/review/:idReview", (req, res, next) => {
	const { id, idReview } = req.params;
	try {
		Review.destroy({ where: { productId: id, id: idReview } }).then(() => {
			res.sendStatus(200);
		});
	} catch (error) {
		console.error(error.message);
	}
});

// S57
server.get("/:id/review/", (req, res, next) => { // Devuelve todas las review según el ID del usuario
	const { id } = req.params;
	Review.findAll({ where: { productId: id } })
		.then((reviews) => {
			res.json(reviews);
		})
		.catch(next);
});

server.get("/:id/allReview/", (req, res, next) => { // Devuelve todas las review según el ID del usuario
	const { id } = req.params;
	Review.findAll({ where: { userId: id } })
		.then((reviews) => {
			res.json(reviews);
		})
		.catch(next);
});

module.exports = server;
