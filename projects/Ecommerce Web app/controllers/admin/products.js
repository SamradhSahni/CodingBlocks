const { isAdmin } = require('../../middlewares/admin');
const Products = require('../../models/products');
let Reviews =require('../../models/reviews');

module.exports.getAddProduct =(req,res,next)=>{
    res.render('admin/addproduct',{isAdmin:true,cartCount:req.user.cart.products.length});
};
module.exports.postAddProduct = async (req,res,next)=>{
    const{name,price,imgUrl,description} = req.body;
    try{
        await Products.create({
            name,price,description,imgUrl,user_id:req.user._id
        })
        res.redirect('/admin/products');
    }
    catch(err){
        next(err);
    }
};
module.exports.getProducts = async (req,res,next)=>{
    try{
        let products = await Products.find({user_id:req.user._id});
        res.render('admin/products',{products,isAdmin:true,cartCount:req.user.cart.products.length});
    }
    catch(err){
        next(err)
    }
};
module.exports.getEditProduct = async (req,res,next)=>{
    const {id}=req.query;
    try{
        let product = await Products.findById(id);
        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/admin/products');
        }
        res.render('admin/editproducts', { product, isAdmin: true ,cartCount:req.user.cart.products.length});
    }
    catch(err){
        next(err);
    }
};

module.exports.postEditProduct = async (req, res, next) => {
    const { name, price, description, imgUrl, id } = req.body;
    try {
        if (!id) {
            throw new Error("Product ID is missing.");
        }

        let product = await Products.findById(id);
        if (!product) {
            throw new Error("Product not found.");
        }

        product.name = name;
        product.price = price;
        product.imgUrl = imgUrl;
        product.description = description;
        await product.save();
        
        res.redirect('/admin/products');
    } catch (err) {
        next(err);
    }
};
module.exports.getDeleteProduct = async (req, res, next) => {
    const {id } = req.query;
    try {
       await Products.deleteOne({_id:id})
        
        res.redirect('/admin/products');
    } catch (err) {
        next(err);
    }
};
module.exports.getDeleteReview = async (req, res, next) => {
    const {id, productId} = req.query;
    try {
        // await Reviews.deleteOne({_id:id})
      let product = await Products.findOne({_id:productId}).populate('reviews');
      product.reviews.pull({_id:id});
      await product.save();
        
         res.render('shop/productdetails',{product,isAdmin:req.user.isAdmin,cartCount:req.user.cart.products.length})
    } catch (err) {
        next(err);
    }
};
