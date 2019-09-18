const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Meu backend!!!');
});

app.listen(3333, () => {
    console.log('Backend executando.');
});