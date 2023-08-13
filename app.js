require("dotenv").config();
const express = require("express");
const app = express();
const Middleware = require("./middlewares/common");
const mongoose = require("mongoose");
const swagger = require("./swagger");

const userRoutes = require("./routes/user");

// Port
const port = process.env.PORT || 1000;
//connection url
const DB = process.env.MONGOLAB_URI_PROD || "mongodb://167.99.95.190/edu";

Middleware(app);

//REGISTER ROUTES HERE
app.use("/api/v1/user", userRoutes);

swagger(app, port);

app.get("/api", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: `Welcome to EDU API served on port ${port}`,
  });
});

//Handling unhandle routes
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: "Error 404",
    message: `Page not found. Can't find ${req.originalUrl} on this server`,
  });
});

// Database Connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DATABASE connection successfull"))
  .catch((err) => {
    console.log(err);
    console.log("Error connecting to database");
  });

//listening to port
app.listen(port, () => {
  console.log(`STA Server is running on port ${port}`);
});
