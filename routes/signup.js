const SignUp = require('../models/signup');
const express = require('express');
const route = express.Router();



route.get('/', (req, res) => {
    res.render('signup');
});

route.post('/', async (req, res) => {

            const emailCheck = await SignUp.findOne({ email: req.body.email });
        if (emailCheck) return res.status(400).render('signup', { emailValidate: '⚠ Please use unique email' });

        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (password === confirmPassword) {

            const signupUser = new SignUp({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: password,
                confirmPassword: confirmPassword,
            });

            const token = await signupUser.generateAuthToken();
            // res.cookie('jwt', token);
            res.cookie('uniJWT', token, {
                httpOnly: true,
                secure:true 
            });
            await signupUser.save();
            res.status(201).redirect('/login');
        }
        else {
            res.status(400).render('signup', { passCheck: '⚠ Password not match' });
        }

});


module.exports = route;