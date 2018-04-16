const express = require('express');
const handlebars = require('handlebars');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{

    res.send('Hello Express!');
});

app.listen(3000, ()=>{

    console.log('Server Running')
});