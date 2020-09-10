//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");

const {
  conn,
  Product,
  Category,
  productsInCategory,
  Image,
  User,
  Order,
  OrderLine,
  Review
} = require("./src/db.js");
const {
  initialCategories,
  initialProducts,
  imageUrls,
  prodXCat,
  initialUsers,
  initialOrders,
  initialOrderLines,
  initialReview
} = require("./src/seed.js");

//const Category = require("./src/models/Category.js");
// Syncing all the models at once.
conn
  .sync({ force: true })
  .then(() => {
    server.listen(3001, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  })
  .then(() => {
    Category.bulkCreate(initialCategories);
  })
  .then(() => {
    Product.bulkCreate(initialProducts);
  })
  .then(() => {
    productsInCategory.bulkCreate(prodXCat);
  })
  .then(() => {
    Image.bulkCreate(imageUrls);
  })
  .then(() => {
    const users = initialUsers.map(u => User.create(u, {individualHooks: true}))
      /*User.bulkCreate(initialUsers, 
          // para que ejecute el hook beforeCreate y hashee el pasword
          {individualHooks: true});*/
    Promise.all(users)  
    .then(() => {
      Order.bulkCreate(initialOrders);
    })
    .then(() => {
      OrderLine.bulkCreate(initialOrderLines)
    })
    .then(() => {
      Review.bulkCreate(initialReview)
    })
  })


  .catch((error) => console.log('Error al bulkcreate', error))
