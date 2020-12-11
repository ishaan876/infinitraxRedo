const express = require('express');
const app = express();
const db = ("./databse.js")
const fitbit = ('fitbit-node ')





app.get('/', (req,res) => {
    res.end("test")
})

app.get('/Diet', (req,res) => {
    res.end('diets are lame')
})

app.listen(3000)