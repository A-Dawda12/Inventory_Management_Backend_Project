
export const validateRequest = (req, res, next) => {
    const {name, price, imgUrl} = req.body;
    let errors = [];
    if(!name || name.trim() === ''){
        errors.push("Name is required")
    }
    if(!price || parseFloat(price) < 1){
        errors.push("Price must be positive value")
    }
    try {
        const validUrl = new URL(imgUrl)
    } catch (error) {
        errors.push("Url is invalid")
    }

    if(errors.length >= 0){
        return res.render("new-product", {errorMessage : errors[0]});
    }
    next();
}