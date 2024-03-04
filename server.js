const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 8000;

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
app.get('/states/cities', (req, res) => {
    const stateName = req.query.state;
    const stateCities = cities.filter(city => city.state_name === stateName);
    const data = stateCities.map((item) => {
        return {
            city: item.name
        };
    });
    
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
