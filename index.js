import express from 'express';
import ProductController from './src/controllers/productController.js';
import UserController from './src/controllers/userController.js';
import { validateRequest } from './src/middlewares/validation.js';
import { auth } from './src/middlewares/authMiddleware.js';
import { uploadFile } from './src/middlewares/file-upload.js';
import { setLastVisit } from './src/middlewares/lastVisitMiddleware.js';
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';

const server = express();
server.use(express.static('public'));
server.use(cookieParser());
//server.use(setLastVisit);

server.use(session({
    secret:'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie:{secure:false},
}));


server.use(express.urlencoded({ extended: true }));
server.use(express.static('src/views'));
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'src', 'views'));
server.use(ejsLayouts);

const productController = new ProductController();
const userController = new UserController(); 

server.get('/register', userController.getRegister); 
server.get('/login', userController.getLogin);
server.post('/login', userController.postLogin);
server.post('/register', userController.postRegister);
server.get('/logout', userController.logout);
server.get('/', setLastVisit, auth,  productController.getProducts);
server.get('/new', auth, productController.getAddForm);
server.post('/', auth, uploadFile.single('imgUrl'), validateRequest, productController.addnewProduct);
server.get('/update-product/:id', auth, productController.getUpdateProductView);
server.post('/update-product', auth, productController.postUpdateProduct);
server.post('/delete-product/:id', auth, productController.deleteProduct);


server.listen(3040, () => {
    console.log('Server is listening on port 3040');
});
