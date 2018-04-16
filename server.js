const express = require('express');
const hbs = require ('hbs');
const app = express();


app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');



hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
});

// You can register as many helpers as you like:

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res)=>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'are you having a good time?',
        bodyContent: new Date(),
        
    });
});

app.get('/about', (req, res)=>{

    res.render('about.hbs', {
        pageTitle: 'About Page',
        
    });
});

app.listen(3000, ()=>{

    console.log('Server Running')
});