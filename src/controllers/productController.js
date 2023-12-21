import path from 'path';
import ProductModel from '../models/products.js';

export default class ProductController {
    getProducts(req, res){
        let products = ProductModel.get()
        // console.log(products);
        res.render("index", {products, layout : 'layout'});
        // return res.sendFile(path.join(path.resolve(), "src", "views", "products.html"))
    }

    getAddForm(req, res){
        res.render('new-product', {errorMessage : null, layout : 'layout'});
    }

    addnewProduct(req, res){
        console.log(req.body);
        ProductModel.add(req.body);
        let products = ProductModel.get();
        res.render('index', {products, layout : 'layout'});
    }
}