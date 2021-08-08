
import express, { Router } from "express";
import bodyparser = require("body-parser")

import sequelize from "./config/config";
import departmentRoute from "./routes/DepartmentRoute"
import employeeRoute from "./routes/EmloyeeRoute"





require('dotenv').config()


import fs = require("fs");
import * as https from "https";
import * as http from "http";


const app = express();

const port = process.env.PORT || 3000;

app.use(departmentRoute);
app.use(employeeRoute);

app.use(bodyparser.json())

const httpsOptions = {
    key: fs.readFileSync("certs/privkey.pem"),
    cert: fs.readFileSync("certs/cert.pem"),
  };
  
  const httpsServer = new https.Server(httpsOptions, app);
  
  app.use(bodyparser.urlencoded({ extended: false }));

  app.use(function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.log("origin", req.headers);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Set-Cookie"
    );
    res.header("Access-Control-Expose-Headers", "location");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
  
  httpsServer.listen(process.env.HTTPS_PORT, () => {
    
     console.log(`[server]: Server is listening at https://localhost:${process.env.HTTPS_PORT}`);

     console.log(__dirname);
  }
     );
  
  http
    .createServer(function (req, res) {
      res.writeHead(301, {
        Location: "https://" + req.headers["host"] + req.url,
      });
      res.end();
    })
    .listen(process.env.HTTP_PORT);

    app.use(departmentRoute);
  
  app.get("/", async (req, res) => {
    res.send("<h1>Talent Manangment Academy</h1>");
  });
  




//app.listen(port, () => { console.log("server is started")})