require('dotenv').config();
const httpClient = require('./HttpClient');
const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', async(req, res) => {
    const response = await httpClient.getMedia();
    res.contentType('application/json');
    res.send(response);
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})