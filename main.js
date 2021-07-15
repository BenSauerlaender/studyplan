const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  cors = require("cors"),
  router = require("./routes/index"),
  serveStatic = require("serve-static");

app.use(express.json());
app.use(express.urlencoded());

const mongodbURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/studyplan";

mongoose.connect(mongodbURI, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("Can not connect to the database" + err);
  }
);
mongoose.set("useFindAndModify", false);

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("public")); //In order to use static file

app.use(cors());

app.use(serveStatic(__dirname + "/dist"));

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs"); //To use EJS

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

module.exports = app;
