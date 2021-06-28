const express = require('express');
const path = require('path');
const http = require('http');
const request = require('request');
const { strict } = require('assert');
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
    let VIN = req.query.vehicle;
    let manufacturer = req.query.manufacturer;
    let manufacturers = req.query.manufacturers;
    if (VIN){
        console.log(VIN);
        url = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/"+VIN+"?format=json"
        request(url, function(err, resp, body) {
            data = JSON.parse(resp.body);
            if (data.Results[1].Value == 0){
                let make = data.Results[6].Value;
                let model = data.Results[8].Value;
                let year = data.Results[9].Value;
                console.log(make + model + year);
            } else {
                console.log("Error - Bad VIN")
            }
        }); 
    } else if (manufacturer){
        console.log(manufacturer);
        let url =  "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakeForManufacturer/"+manufacturer+"?format=json"
        request(url, function(err, resp, body) {
            data = JSON.parse(resp.body);
            if (data.Results.length != 0){
                console.log("works!");
            } else {
                console.log("Error - Bad VIN")
            }
        });
    } else if (manufacturers) {
        let url =  "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
        request(url, function(err, resp, body) {
            data = JSON.parse(resp.body);
            for (let i = 0; i < data.Results.length; i++) {
                console.log(data.Results[i].Make_Name); 
            } 
        });
        
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
