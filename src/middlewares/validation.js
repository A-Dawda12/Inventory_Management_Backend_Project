import { body, validationResult } from "express-validator";

export const validateRequest = async (req, res, next) => {

    // const {name, price, imgUrl} = req.body;
    // let errors = [];
    // if(!name || name.trim() === ''){
    //     errors.push("Name is required")
    // }
    // if(!price || parseFloat(price) < 1){
    //     errors.push("Price must be positive value")
    // }
    // try {
    //     const validUrl = new URL(imgUrl)
    // } catch (error) {
    //     errors.push("Url is invalid")
    // }
    // if(errors.length >= 0){
    //     return res.render("new-product", {errorMessage : errors[0]});
    // }

    //using express-validator instead of basic js to validate

    const rules = [
        body('name').notEmpty().withMessage('Name is required'),
        body('price').isFloat({ gt: 0 }).withMessage('Price should be a positive value'),
        // body('imgUrl').isURL().withMessage('Invalid url')
    ];

    // 2. run those rules.
    await Promise.all(
    rules.map((rule) => rule.run(req))
    );

    // 3. check if there are any errors after running the rules.
    var validationErrors = validationResult(req);
    console.log(validationErrors);

    // 4. if errros, return the error message
    if (!validationErrors.isEmpty()) {
        return res.render('new-product', {
        errorMessage:
            validationErrors.array()[0].msg,
        });
    }

    next();
}