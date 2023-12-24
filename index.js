import express from 'express'
import ProductController from './src/controllers/productController.js';
import { validateRequest } from './src/middlewares/validation.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';

const server = express();
//parse form data
server.use(express.urlencoded({extended: true}));

server.use(express.static('src/views'))

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));
server.use(ejsLayouts);

//create instance 
const productController = new ProductController()

server.get('/', productController.getProducts);
server.get('/new', productController.getAddForm);
server.post('/', validateRequest, productController.addnewProduct);
server.get('/update-product/:id', productController.getUpdateProductView);
server.post('/update-product', productController.postUpdateProduct)

server.listen(3040, () => {
    console.log("server is listening on 3040");
});