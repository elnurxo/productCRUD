const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const { v4: uuidv4 } = require("uuid");

const data = [
  { id: 1, data: { name: "iPhone", price: 1000, costPrice: 400, img: "" } },
  { id: 2, data: { name: "Samsung", price: 800, constPrice: 300, img: "" } },
  { id: 3, data: { name: "Samsung", price: 800, constPrice: 300, img: "" } },
  { id: 4, data: { name: "Samsung", price: 800, constPrice: 300, img: "" } },
  { id: 5, data: { name: "Samsung", price: 800, constPrice: 300, img: "" } },
  { id: 6, data: { name: "Samsung", price: 800, constPrice: 300, img: "" } },
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
    data = data.filter(data => data.id !== ID)
    res.send(data)
})

// app.delete('/update/:id', (req, res) => {
//     const ID = req.params.id;
//     data = data.filter(data => data.id !== ID)
//     res.send(data)
// })

app.listen(8080, () => {
  console.log("Server running on 8080");
});
