const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./connectDB");
const app = express();
const PORT = process.env.PORT || 6000;
const initRouters = require("./src/routers");
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRouters(app);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
