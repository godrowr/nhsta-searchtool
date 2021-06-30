const express = require('express');
const path = require('path');
const http = require('http');
const request = require('request');
const { strict } = require('assert');

const app = express();
const port = process.env.PORT || 3000;


app.set('port', port);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/api/vehicle/', (req, res) => {
    let vin = req.query.vehicle;
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
            res.send(vehicle);
        } else {
            console.log("Error - Bad VIN")
            res.send("Error - Bad VIN");
        }
    });
});

app.get('/api/makes/', (req, res) => {
    let manufacturer = req.query.manufacturer;
    console.log(manufacturer);
    let url =  "https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/"+manufacturer+"?format=json"
    let response = []
    request(url, function(err, resp, body) {
        data = JSON.parse(resp.body);
        if (data.Results.length != 0){
            for (let i = 0; i < data.Results.length; i++) {
                response.push(data.Results[i].Model_Name); 
            } 
            var makes = {Manufacturer: manufacturer, Makes: response}
            console.log(makes);
            res.send(makes);
        } else {
            console.log("Error - Bad Manufacturer")
            res.send("Error - Bad Manufacturer");
        }
    });
});

app.get('/api/manufacturers/', (req, res) => {
    let url =  "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
    request(url, function(err, resp, body) {
        data = JSON.parse(resp.body);
        let response = []
        for (let i = 0; i < data.Results.length; i++) {
            makename = data.Results[i].Make_Name;
            response.push(makename);
        } 
        var manufacturers = {Manufacturers: response}
        console.log(manufacturers);
        res.send(manufacturers);
    });
});

app.listen(port, () => console.log(`Listening on port ${port} ..`))
