const express = require('express');

const cors = require('cors')
const path = require('path')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/public', express.static(path.resolve('assets')))

app.get('/', (req, res) => {
    const data = ['test', 'test2']
    console.log(req.body)
    res.send(data)
})

app.listen(8080, () => {
    console.log('Server running on 8080')
})
