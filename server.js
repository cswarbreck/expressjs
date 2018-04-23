const express = require('express');
const hbs = require ('hbs');
const app = express();
const fs = require('fs');

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');


//Middleware must use 'next' as an argument and must end with next();
//This particular middleware creates a server log file
app.use((req, res, next)=>{
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log +'\n', (err) =>{
        if (err) {
            console.log('Unable to append server.log');
        }
    });
    next();
});


//If you don't use 'next', then this middleare will overrule everything else
/* app.use((req, res)=>{
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance'
    });
}); */


//Instead of using multiple functions to do the same thing, you can use a helper and then inkect it in .hbs
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

app.listen(port, ()=>{

    console.log(`Server is running on port ${port}`)
});