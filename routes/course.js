const auth = require('../middleware/auth');
const express = require('express');
const route = express.Router();

route.get('/',auth,(req,res)=>{
    res.render("course",{
        pageTitle:"OUR COURSES"
    });
});



module.exports = route;