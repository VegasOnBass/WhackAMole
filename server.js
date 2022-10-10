const express = require("express");
const routes = require('./routes.js');
const cors = require("cors");
const mongoose = require('mongoose');

require("dotenv").config({ path: "./config.env" });

const app = express();

const port = process.env.PORT || 5000;

// Connect to the database
mongoose
  .connect(process.env.ATLAS_URI, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use('', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
 }

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
