const express = require('express');

const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const app = express();

const data = [{ id: 1, name: "iPhone", price:1000, costPrice:400, img:"" }, { id: 2, name: "Samsung" }]

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use('/public', express.static(path.resolve('assets')))

app.get('/', (req, res) => {
    res.send(JSON.stringify(data))
})

app.post('/post', (req, res) => {
    data.push(req.body)
    console.log(req.body)
})

app.listen(8080, () => {
    console.log('Server running on 8080')
})
