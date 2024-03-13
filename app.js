const express = require("express");
const route = require("./routes");
const app = express();
const port = 6969;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
