const path=require('path')
const express=require('express')
const router=express.Router();
const loginController=require('../controllers/login')
const mypassport=require('../auth/passport');
const adminController = require('../controllers/admin/products')
const userController = require('../controllers/shop/products')

router.get('/add-product',adminController.getAddProduct);
router.post('/add-product',adminController.postAddProduct);
router.get('/products',adminController.getProducts);
router.get('/edit',adminController.getEditProduct);
router.post('/edit',adminController.postEditProduct);
router.get('/delete',adminController.getDeleteProduct);
router.get('/deletereview',adminController.getDeleteReview);
router.get('/details',userController.getProductDetails);

module.exports=router;