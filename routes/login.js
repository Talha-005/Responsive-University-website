const bcrypt = require('bcrypt');
const SignUp = require('../models/signup');
const express = require('express');
const route = express.Router();


route.get('/', (req, res) => {
    res.render('login');
});

route.post('/', async (req, res) => {

    const password = req.body.password;
    const email = await SignUp.findOne({ email: req.body.email });
    if (!email) return res.status(404).render('login', { check: '⚠ Invalid email or password' });

    const isMatch = await bcrypt.compare(password, email.password);

    if (isMatch) {
        const token = await email.generateAuthToken();
        res.cookie('uniJWT', token, {
            expires: new Date(Date.now() + 1800000),
            httpOnly: true,
            secure:true 
        });
        res.redirect('/');
     }
    else {
        res.status(404).render('login', { check: '⚠ Invalid email or password' });
    }

});


module.exports = route;