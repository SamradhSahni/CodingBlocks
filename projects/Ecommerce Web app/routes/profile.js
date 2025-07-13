const path = require('path')
const express=require('express')
const router=express.Router();
const signupController=require('../controllers/signup')


router.get('/',(req,res,next)=>{
    if(!req.user) return res.redirect('/login');
    res.render('profile',{
        username:req.user.email,
        isAdmin:req.user.isAdmin,
        cartCount:req.user.cart.products.length
    });
})




module.exports=router;