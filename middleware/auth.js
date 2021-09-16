const jwt = require('jsonwebtoken');
const config = require('config');
const SignUp = require('../models/signup');

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.uniJWT;
        const decode = jwt.verify(token, config.get('jwtPrivateKey'));
        const user = await SignUp.findOne({ _id: decode._id });

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).redirect('/login');
    }
}
