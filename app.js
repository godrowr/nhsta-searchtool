const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

//https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json

const vehicles = [
    {id: 1, name: 'Car'},
    {id: 2, name: 'Van'},
    {id: 3, name: 'Truck'},
    {id: 4, name: 'Sedan'}
]

app.get(`/`, (req, res) => {
    res.send(`Hello World`);
});

app.get(`/api/vehicles/GetAllMakes`, (req, res) => {
    res.send(vehicles);
});

app.post('/api/vehicles/', (req, res) => {
    const vehicle = {
        id: vehicles.length + 1,
        name: req.body.name
    }
});

app.get(`/api/vehicles/GetModelsForMakeId/:id`, (req, res) => {
    let vehicle = vehicles.find(c => c.id === parseInt(req.params.id));
    if (!vehicle) res.status(404).send('Vehicle with the givin VIN does not exist');
    res.send(vehicle);
});

app.listen(port, () => console.log(`Listening on port ${port} ..`))
