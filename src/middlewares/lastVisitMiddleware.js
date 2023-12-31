export const setLastVisit = (req, res, next) => {

    //1. If ccokie is set, then add a local varaiable with last time data.

    if(req.cookies.lastVisit){
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    }
    res.cookie('lastVisit', new Date().toISOString(), {
        maxAge : 2*24*60*60*1000
    });
    next();

}