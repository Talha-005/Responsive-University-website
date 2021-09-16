const express = require('express');
const route = express.Router();

route.get('/',(req,res)=>{
    res.render("404",{
        errorComment:'Page not Found',
        pageTitle:"404 Page"
    });
});


module.exports = route;