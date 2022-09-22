const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const { v4: uuidv4 } = require("uuid");

let data = [
    { id: 1, data: { name: "iPhone Static", price: 1000, costPrice: 400, img: "" } },
];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.resolve("assets")));

app.get("/", (req, res) => {
    res.send(JSON.stringify(data));
});

app.post("/post", (req, res) => {
    const schema = {
        id: uuidv4(),
        data: req.body,
    };
    data.push(schema);
    console.log(schema);
    res.send(data);
});

app.delete('/delete/:id', (req, res) => {
    const ID = req.params.id;
    console.log(ID)
    data = data.filter(data => data.id !== ID)
    console.log(data)
    res.send(data)
})

app.put('/update/:id', (req, res) => {
    const ID = req.params.id;
    data = data.filter(dat => dat.id === ID ? dat.data = req.body : dat)
    res.send(data)
})

app.listen(8080, () => {
    console.log("Server running on 8080");
});
