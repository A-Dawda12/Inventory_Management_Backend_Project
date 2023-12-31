import UserModel from "../models/user.js"
import ProductModel from "../models/products.js";

export default class UserController {
    getRegister(req, res){
        res.render('register');
    }

    getLogin(req, res){
        res.render('login', {errorMessage : null});
    }

    postRegister(req, res){
        const {name, email, password} = req.body;
        UserModel.add(name, email, password);
        res.render('login', {errorMessage : null});
    }

    postLogin(req, res){
        const{email, password} = req.body;
        const user = UserModel.isValidUser(email, password);
        if(!user){
            res.render('login',{errorMessage : "Invalid login credentials"});
        }

        req.session.userEmail = email;
        var products = ProductModel.get();
        res.render('index', {products, userEmail : req.session.userEmail});
    }

    logout(req, res){
        req.session.destroy((err) =>{
            if(err){
                console.log(err);
            }
            else{
                res.redirect('/login');
            }
        })
        res.clearCookie('lastVisit');
    }
}