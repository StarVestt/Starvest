const app = require("./app");
const PORT = process.env.PORT || 3001;
const connectDB = require("./config/db");
require("dotenv").config();

connectDB();

app.listen(PORT, () => {
    console.log("listening on port", PORT);
})