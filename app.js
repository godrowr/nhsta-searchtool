const express = require('express');
const path = require('path');
const http = require('http');
const request = require('request');
const { strict } = require('assert');
const fs = require('fs');
// var {mongoose} = require('./public/javascript/mongoose');
// var {Vehicle} = require('./models/vehicle');
// var {Makes} = require('./models/makes');
// var {Manufacturers} = require('./models/manufacturers');

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
    let vin = req.query.vehicle;
    let manufacturer = req.query.manufacturer;
    let manufacturers = req.query.manufacturers;
    if (vin){
        console.log(vin);
        url = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/"+vin+"?format=json"
        request(url, function(err, resp, body) {
            data = JSON.parse(resp.body);
            if (data.Results[1].Value == 0){
                let make = data.Results[6].Value;
                let model = data.Results[8].Value;
                let year = data.Results[9].Value;
                var vehicle = { VIN: vin, Make: make, Model: model, Year: year} 
                console.log(vehicle);
                //vehicle.save();
            } else {
                console.log("Error - Bad VIN")
            }
        }); 
    } else if (manufacturer){
        console.log(manufacturer);
        let url =  "https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/"+manufacturer+"?format=json"
        let response = []
        request(url, function(err, resp, body) {
            data = JSON.parse(resp.body);
            if (data.Results.length != 0){
                for (let i = 0; i < data.Results.length; i++) {
                    response.push(data.Results[i].Model_Name); 
                } 
            } else {
                console.log("Error - Bad VIN")
            }
            console.log(response);
        });
    } else if (manufacturers) {
        let url =  "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
        request(url, function(err, resp, body) {
            data = JSON.parse(resp.body);
            let response = []
            for (let i = 0; i < data.Results.length; i++) {
                makename = data.Results[i].Make_Name;
                response.push(makename);
            } 
            console.log(response);
        });
    } 
});

app.get('/api/vehicles/:id', (req, res) => {
    var id = req.params.id;
    Vehicle.findById(id).then((vehicle) => {
        if (!vehicle) {
            return res.status(404).send();
        }
        res.send({vehicle});
   }).catch((e) => {
      res.status(400).send();
   });
});

app.get('/api/makes/:manufacturer', (req, res) => {

});

app.get('/api/manufacturers/all', (req, res) => {

});

app.listen(port, () => console.log(`Listening on port ${port} ..`))
