require("dotenv").config();

// *Connects to the database... if we had one :(
const mongoose = require("mongoose");
const MONGO_URI = "mongodb://127.0.0.1:27017/my-first-database";
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("conectados a la DB");
  })
  .catch((err) => {
    console.log(err);
  });
// Handles http requests (express is node js framework)
const express = require("express");
const app = express();

// *Handles the handlebars
const hbs = require("hbs");

// This part runs most pieces of middleware
app.use(express.static("public"));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views/");
const logger = require("morgan");
app.use(logger("dev")); //!ejecutar morgan para entorno de desarrollo en la consola sale el ERROR CODE y mas informacion
const favicon = require("serve-favicon"); //!este paquete es para poner el icono del navegador
app.use(favicon(__dirname + "/public/images/favicon.ico"));
// Local Variables
// TODO

// 👇 Start handling routes here
app.get("/", (req, res, next) => {
  res.render("home.hbs");
});

app.get("/about", (req, res, next) => {
  res.render("about.hbs");
});
const Movie = require("./models/Movie.model.js");

app.get("/movies", (req, res, next) => {
  Movie.find()
    .then((response) => {
      res.render("movies.hbs", {
        allMovies: response,
      });
    })
    .catch((err) => {
      next(err);
      // ! next() si lo invocamos sin parametro salta a la siguiente linea
      //! si lo invocamos con un parametro SIEMPRE SERA PARA UN ERROR 500
    });
});

// To handle errors.
// TODO: GESTOR DE ERRORES
app.use((req, res) => {
  // !gestor de errores 404
  res.status(404).render("not-found.hbs");
});
// ? LA FORMA EN LA QUE ESCRIBIMOS LA FUNCION EXPRESS SABE QUE TIPO DE ERROR ES O 400 O 500
app.use((err, req, res, next) => {
  //!para errores 500 de servidor se tiene que escribir la funcion asi
  console.log(err);
  res.status(500).render("error.hbs");
});
// Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${3000}`);
});
