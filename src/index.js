const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();

// built in middleware
const staticPath = path.join(__dirname,'../public');
const templatePath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//to set template engine
app.set('view engine','hbs');
app.set('views',templatePath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));

//template engine route
app.get('/',(req,res)=>{
    res.render("index",{
        pageTitle:""
    });
});

app.get('/about',(req,res)=>{
    res.render("about",{
        pageTitle:"ABOUT US"
    });
});

app.get('/contact',(req,res)=>{
    res.render("contact",{
        pageTitle:"CONTACT US"
    });
});

app.get('/course',(req,res)=>{
    res.render("course",{
        pageTitle:"OUR COURSES"
    });
});

app.get('/blog',(req,res)=>{
    res.render("blog",{
        pageTitle:"Our Certificate & Online Program For 2021"
    });
});

//    /^\/*[a-z]$/
app.get('*',(req,res)=>{
    res.render("404",{
        errorComment:'Page not Found',
        pageTitle:"404 Page"
    });
});


const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening on port ${port}`));