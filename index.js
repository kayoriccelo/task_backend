const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// middlewares
const myJson = () => (req, res, next) => {
    console.log('My middleware.');
    next();
};
app.use(myJson());
app.use(bodyParser.json());


// gets
app.get('/', (req, res) => {
    res.status(200).send('My backend!!!');
});

app.get('/params/:test', (req, res) => {
    console.log('testing params.');
    res.status(200).send(`Show Params: ${req.params.test}`);
});

app.get('/query', (req, res, next) => {
    console.log('Testing query.');
    res.status(200).send(`Show Query: ${req.query.test}`);
    next();
});

app.get('/query', (req, res) => {
    console.log(`Testing next();`);
});

// posts
app.post('/example-post', (req, res) => {
    console.log('Testing body-parser.');
    res.status(200).send(`Body: ${JSON.stringify(req.body)}, Body 2: ${req.body.test}`);
});

// service
app.listen(3333, () => {
    console.log('Backend executed.');
});
