const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const searchRouter = require('./search.js');
const bodyParser = require('body-parser');
const categoryRouter = require('./category.js')
const orderRouter = require('./order.js')
const orderLineRouter = require('./orderLine.js')
const userRouter = require('./user.js')
const reviewRouter = require('./review.js')
const authRouter = require('./authenticate')
const emailRouter = require('./email')
const resetPassword = require('./resetPassword')

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use(bodyParser.json());
router.get("/", (req, res, next) => {
    res.json(req.user)
  });

router.use('/resetPassword', resetPassword);
router.use('/email', emailRouter);
router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/search', searchRouter);
router.use('/order', orderRouter);
router.use('/orderLine', orderLineRouter);
router.use('/users', userRouter);
router.use('/review', reviewRouter);

module.exports = router;
