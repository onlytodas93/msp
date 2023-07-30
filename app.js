const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { ObjectID } = require("mongodb");

class App {

  constructor() {
    this.server = express();
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(cors({}));
   
    let db_string = "mongodb+srv://razorsoftbr:bXTHq0M4jbHMSid7@master-premios.dckdjrh.mongodb.net/core?retryWrites=true&w=majority";

    mongoose.connect(db_string, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    this.middlewares();
    this.routes();
  }

  middlewares() {
   
    this.server.use((req, res, next) => {
   
      try {
        //     console.log(req.headers)
        req.jwt = jwt;
        var token = req.headers["x-access-token"];
        var empresa = req.headers["x-access-empresa"];
       
        if (token && token != undefined && token != 'undefined' && token != 'razorsoft-inc') {
          jwt.verify(token, "b03e148fc2d70bb33bfbbf15b7eee9e7", function (err, decoded) {

            if (err) {
              console.log(err);
              return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
            }
            try {
              req.id = ObjectID(decoded.usuario);
            } catch {
              req.id = decoded.usuario
            }

            try {
              if (empresa)
                req.empresa = ObjectID(empresa)
              else 
                req.empresa = empresa

            } catch {
              req.empresa = empresa
            }
           
            next();
          })
        } else {
          next();
        }
      } catch (ee) {
        console.log(ee)
        next();
      }
    })

  }

  routes() {

    this.server.use(require('./api/routes/sorteios'));
    this.server.use(require('./api/routes/usuario'));

  }

}
module.exports = new App().server