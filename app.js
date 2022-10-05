const http = require('http');
const express = require('express'); 
const fs = require('fs');
const path =require ('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}
const app = express();
const port = 80;


// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    description: String,    
  });
const contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC 
app.use('/static',express.static('static'));// for serving static files 
app.use(express.urlencoded());

// PUG SPEICIFIC 
app.set('view engine', 'pug');// setting the template engine as pug
app.set('views',path.join(__dirname,'views'));// set the views directory

app.get('/',(req, res)=>{
    
    const params={}
    res.status(200).render('home.pug', params);
});
app.get('/contact',(req, res)=>{
    const params={}
    res.status(200).render('contact.pug', params);
});
app.post('/contact',(req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved ")
    }).catch(()=>{
        res.status(400).send("item was not sent to the database")
    })
    // res.status(200).render('contact.pug');
});





// STARTING THE SERVER
app.listen(port,()=>{
    console.log(`this app started successfully on port ${port}`);
});