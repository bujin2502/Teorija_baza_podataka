const express = require('express');
const neo4j = require('neo4j-driver');
const bodyParser = require('body-parser');

const opener = require('opener');

opener('http://localhost:3000');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 3000;
app.listen(port);

module.exports = app;


// Otvaranje sesije
var driver = neo4j.driver('neo4j+s://b796b3cf.databases.neo4j.io', neo4j.auth.basic('neo4j', 'kMYW_K_rH26Ox20Rn5V-dg6pzFWmNFoCttWKbUeiGfM'));
session = driver.session();

// Routes      
app.get('/', (req, res) => {
    res.render('index', {
        title: 'O aplikaciji',
    });
});

app.post('/izmjena_hdd', function (req, res) {
    
    var usage = req.body.usage;
    
    session
    .run(
        'MATCH (n:HDUsage {CPU: 2, oznaka: 2, timestamp: date("2023-06-08")}) SET n.usage = $usage RETURN n', {usage: usage})
    .then(function (result) {
    res.redirect('/izmjena_hdd');
    session.close;
})
    .catch(function (err) {
        console.log(err);
    });
    });

app.post('/izmjena_printer', function (req, res) {
    
        var id = req.body.id;
        var status = req.body.status;
        
        session
        .run(
            'MATCH (p:Printer {id:$id}) SET p.status = $status RETURN p', {id: id, status: status})
        .then(function (result) {
        res.redirect('/izmjena_printer');
        session.close;
    })
        .catch(function (err) {
            console.log(err);
        });
        });

app.get('/izmjena_hdd', (req, res) => {
    res.render('izmjena_hdd', {
        title: 'Izmjena opterećenja HDD-a'
    });
});

app.get('/izmjena_printer', (req, res) => {
    res.render('izmjena_printer', {
        title: 'Izmjena podataka o printeru'
    });
});

app.get('/kontrolna_ploca', (req, res) => {
    res.render('kontrolna_ploca', {
        title: 'Kontrolna ploča'
    });
});