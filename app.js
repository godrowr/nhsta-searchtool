const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const port = process.env.PORT || 3000;

app.set('port', port);
app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
    res.render('index');
    let vehicle = req.query.vehicle;
    let manufacturer = req.query.manufacturer;
    let manufacturers = req.query.manufacturers;
    if (vehicle){
        console.log(vehicle);
    } else if (manufacturers) {
        console.log(manufacturers);
    } else if (manufacturer){
        console.log(manufacturer);
    }
});


//https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json

app.get('/api/vehicles/:id', (req, res) => {
    let vehicle = vehicles.find(c => c.id === parseInt(req.params.id));
    if (!vehicle) res.status(404).send('Vehicle with the givin VIN does not exist');
    res.send(vehicle);
});

app.get('/api/makes/:manufacturer', (req, res) => {

});

app.get('/api/manufacturers/all', (req, res) => {

});

app.listen(port, () => console.log(`Listening on port ${port} ..`))
