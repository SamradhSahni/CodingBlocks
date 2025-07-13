const path=require('path')
const express=require('express')
const router=express.Router();
const loginController=require('../controllers/login')
const mypassport=require('../auth/passport');
const userController = require('../controllers/shop/products')

router.get('/',userController.getProducts);
router.get('/products',userController.getProducts);
router.get('/details',userController.getProductDetails);
router.post('/submitReview',userController.postSubmitReview);
router.get('/addtocart',userController.getAddToCart);
router.get('/cart',userController.getCart);
router.get('/increaseQty',userController.getIncreaseQty);
router.get('/decreaseQty',userController.getDecreaseQty);
router.get('/deletecartitem',userController.getDeleteCartItem);


module.exports=router;