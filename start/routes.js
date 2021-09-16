const hbs = require('hbs');
const path = require('path');
const express = require('express');
const error = require('../middleware/error');
const cookieParser = require('cookie-parser');
const _404 = require('../routes/404');
const blog = require('../routes/blog');
const home = require('../routes/home');
const about = require('../routes/about');
const login = require('../routes/login');
const logout = require('../routes/logout');
const signup = require('../routes/signup');
const contact = require('../routes/contact');
const courses = require('../routes/course');
const staticPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.set('view engine','hbs');
    app.set('views', viewsPath);
    hbs.registerPartials(partialsPath);
    app.use(express.static(staticPath));
    app.use('/',home);
    app.use('/course',courses);
    app.use('/blog',blog);
    app.use('/about',about);
    app.use('/contact',contact);
    app.use('/login',login);
    app.use('/logout',logout);
    app.use('/signup',signup);
    app.use('/*',_404);
    app.use(error);
}