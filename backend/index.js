const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
    res.json("backend connected to frontend")
});

//routes for user behaviour
app.use("/user", require('./routes/user-route'));

app.listen(5000, () => {console.log("Server Started on Port 5000")});