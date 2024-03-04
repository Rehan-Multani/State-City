const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 8000;
const doctor = require('../../GitHub/Doctor/Models/DoctorModel')
app.use(bodyParser.json());
app.use(cors());

const states = require('./states.json');
const cities = require('./cities.json');

// Endpoint to get all states
app.get('/states', (req, res) => {
    const stateNames = states.map(state => state.name);
    res.json(stateNames);
});

// Endpoint to get cities of a specific state
// app.get('/states/cities', (req, res) => {
//     const stateName = req.query.state;
//     const stateCities = cities.filter(city => city.state_name === stateName);
//     const data = stateCities.distinct('city')

//     res.json(data);
// });

app.get('/states/cities', (req, res) => {
    const stateName = req.query.state;
    const stateCities = cities.filter(city => city.state_name === stateName);
    const uniqueCities = [...new Set(stateCities.map(city => city.name))];

    res.json(uniqueCities);
});

app.get('/states/cities', async (req, res) => {
    const state = req.query.state;
    if (state) {
        const data = await doctor.find({city:req.query.city})
        res.json(data);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
