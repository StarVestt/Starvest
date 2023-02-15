const app = require("./app");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const connectDB = require("./config/db");
require("dotenv").config();

mongoose.set("strictQuery", false);

connectDB();

app.listen(PORT, () => {
    console.log("listening on port", PORT);
})