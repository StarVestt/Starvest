const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/api/blogs", require("./backend/routes/blogRoutes"))

app.listen(PORT, () => {
    console.log("listening on port", PORT);
})