const auth = require('../middleware/auth');
const express = require('express');
const route = express.Router();

route.get('/', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((cur) => {
            return cur.token !== req.token;
        });
        // req.user.tokens = [];
        res.clearCookie('uniJWT');
        await req.user.save();
        res.redirect('/login');
    } catch (error) {
        res.redirect('/login');
    }
})


module.exports = route;