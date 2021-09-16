const auth = require('../middleware/auth');
const express = require('express');
const route = express.Router();

route.get('/',auth,(req,res)=>{
    res.render("blog",{
        pageTitle:"Our Certificate & Online Program For 2021"
    });
});


module.exports = route;