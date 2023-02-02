const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
require("dotenv").config();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/api/blogs", require("./routes/blogRoutes"))

app.use(errorHandler)

app.listen(PORT, () => {
    console.log("listening on port", PORT);
})