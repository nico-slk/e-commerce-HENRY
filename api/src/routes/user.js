const server = require("express").Router();
const { User, Order, OrderLine, Product } = require("../db.js");
var Sequelize = require("sequelize");
//Ariel

//S45
server.get("/:id/order/", (req, res, next) => {
  Order.findAll({ where: { userId: req.params.userId }, include: Product })
    .then((userOrders) => {
      res.json(userOrders);
      console.log(userOrders);
    })
    .catch(next);
});

//Nicolás

// order.js

// S38
server.post("/:userId/cart", (req, res, next) => {
const { total, productId, quantity, price } = req.body;
const order = Order.findOrCreate({where: {
  orderStatus: 'carrito',
  userId: req.params.userId}})
const product = Product.findByPk(productId);

Promise.all([order, product])
.then(data => {
  const order = data[0]
  const product = data[1]
  OrderLine.create({
    productId,
    price: product.price,
    quantity,
    orderId: order[0].id
  })
  res.status(201)
  res.json({order: order[0].id, price: product.price, quantity, product })
}).catch(err => console.log(err))

})


//Traspaso de GuestCart a UserCart

server.post("/:userId/guestToCart", (req, res, next) => {
  const { orderLines } = req.body;
  const order = Order.findOrCreate({where: {
    orderStatus: 'carrito',
    userId: req.params.userId}})
  const container = []
  const productsSearch =  Promise.all(orderLines.map((orderLine) => {
   return  Product.findByPk(orderLine.product.id).then((data)=>{
      container.push(data)
    })
  })
  )

  Promise.all([order, productsSearch])
  .then(data => {
    const order = data[0]
    console.log(order[0].id)
    console.log(container)
    return Promise.all(container.map((p, i) => {
      console.log({id: p.id, name: p.name, orderId: order[0].id, quantity: orderLines[i].quantity, price: p.price})
      OrderLine.findOne({where: {productId: p.id, orderId: order[0].id}})
      .then((data)=>{
        if(data){
          return OrderLine.increment({quantity: +orderLines[i].quantity},{where: {productId: p.id, orderId: order[0].id}})
         //return OrderLine.update({quantity: orderLines[i].quantity}, {where: {productId: p.id, orderId: order[0].id}})
        }
        else {
          return OrderLine.create({
            productId: p.id, 
            orderId: order[0].id, 
            quantity: orderLines[i].quantity,
            price: p.price
          })
        }
      })
      
  })
    ).then(()=> res.sendStatus(200))

  })
  .catch(err => console.log(err))
})





//S39
server.get("/:userId/cart", (req, res, next) => {
  Order.findOne({where: {
    userId: req.params.userId,
    orderStatus: 'carrito'
  }, include: { all: true, nested: true } })
    .then((orders) => {
      // console.log(products);
      res.json(orders.orderLines);
    })
    .catch(next);
});

//S40
server.delete("/:userId/cart", (req, res, next) => {
  try {
    const { userId } = req.params;
    Order.destroy({ where: { userId, orderStatus: 'carrito' } }).then(() => {
    })
    .then((data)=>{
    Order.create({
      userId,
      orderStatus: "carrito"
    })
    .then(data => {
      res.status(200)
      res.json([])
    })
    })

  } catch (error) {
    console.error(error.message);
  }
});
//  return OrderLine.increment({quantity: +orderLines[i].quantity},{where: {productId: p.id, orderId: order[0].id}})
server.put("/:userId/cart/completo", (req, res, next) => {
  try {
    const { total, cart, locality, address, state, checkoutDate } = req.body;
    const decreaseStock = cart.map(e => {
      Product.decrement({stock: e.quantity}, {where: {id: e.product.id}})
    })

    const orderComplete = Order.update(
      {
        total,
        orderStatus: "creada",
        locality,
        address,
        state,
        checkoutDate
      },
      { where: { userId: req.params.userId, orderStatus: "carrito" } }
    )

Promise.all([orderComplete, decreaseStock])
  .then((data) => {
      res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
  }
});


//orderLine.js
// S41
server.put("/:userId/cart", (req, res, next) => {
  try {
    const { id, quantity } = req.body;
    console.log(quantity)
    OrderLine.update(
      {
        quantity
      },
      { where: { id } }
    ).then((data) => {
      console.log(data)
      res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
  }
});


//Pela

server.get("/", (req, res, next) => {
  User.findAll()
    .then((data) => {
      res.json(data);
      console.log(data)
    })
    .catch(next);
});

server.post("/", (req, res, next) => {
  const { email, first_name, last_name, address, locality, state, password, admin, securityQuestion, securityAnswer } = req.body;
  User.create({
    email,
    first_name,
    last_name,
    address,
    locality,
    state,
    password,
    admin,
    securityQuestion,
    securityAnswer,
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(next);
});


server.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    User.destroy({ where: { id } }).then(() => {
      res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
  }
});

server.put("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, first_name, last_name, address, locality, state, password, admin, securityQuestion, securityAnswer } = req.body;
    User.findByPk(id).then(user => {
        if (user) {
            user.email = email
            user.first_name = first_name
            user.last_name = last_name
            user.address = address
            user.locality = locality
            user.state = state
            user.password = password
            user.admin = admin
            user.securityQuestion = securityQuestion
            user.securityAnswer = securityAnswer
            return user.save()
        }
    })
    .then( () => {
      res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
  }
});

//S67

server.post("/auth/promote/:id", (req, res, next) => {
  const { id } = req.params;

  User.update({
    admin: true
  },
  { where: { id } })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
        console.error(`Error a promocionar usuario ${id}`)
        next()
    });
});

server.get('/:userId/purchasedProducts', (req, res, next)=>{
  Order.findAll({ where: { orderStatus: "completa", userId: req.params.userId }, include: OrderLine })
  .then((data) => {
    const orderLines = data.map(e => e.orderLines)
    let products = []
    orderLines.map(o => o.map(p => products.push(p.productId)))
    res.json(products)
  })
})



module.exports = server;
