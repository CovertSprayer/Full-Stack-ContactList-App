const express = require('express');
const path = require('path');
port = 8000;

const db = require('./config/mongoose')
const Contact = require('./models/contact')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded());
app.use(express.static('assets'));

/*
//middleware1
app.use(function(req, res, next){
    req.myName = "Shrey";
    console.log('middleware 1 called');
    next();
});

//middleware 2
app.use(function(req, res, next){
    console.log('My name from MW2', req.name);
    console.log('middleware 2 called');
    next();
});
*/

var contactList = [
    {
        name: "ABC",
        phone: "23872892"
    },
    {
        name: "XYZ",
        phone: "48375839"
    },
    {
        name: "PQR",
        phone: "89347538"
    }

]



app.get('/', function(req, res){
    return res.render('home', {
        title: "Contact List",
        contact_List: contactList
    });
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "practice"
    });
});

app.post('/', function(req, res){
    // console.log(req.body);
    contactList.push(req.body)
    return res.redirect('back');
});

app.get('/delete-contact', function(req, res){
    let phone = req.query.phone;
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }

    return res.redirect('back');
})




app.listen(port, function(err){
    if(err) console.log(err);

    console.log("Server is working fine!");
});



