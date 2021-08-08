"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyparser = require("body-parser");
const DepartmentRoute_1 = __importDefault(require("./routes/DepartmentRoute"));
const EmloyeeRoute_1 = __importDefault(require("./routes/EmloyeeRoute"));
require('dotenv').config();
const fs = require("fs");
const https = __importStar(require("https"));
const http = __importStar(require("http"));
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(DepartmentRoute_1.default);
app.use(EmloyeeRoute_1.default);
app.use(bodyparser.json());
const httpsOptions = {
    key: fs.readFileSync("certs/privkey.pem"),
    cert: fs.readFileSync("certs/cert.pem"),
};
const httpsServer = new https.Server(httpsOptions, app);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    console.log("origin", req.headers);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Set-Cookie");
    res.header("Access-Control-Expose-Headers", "location");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
httpsServer.listen(process.env.HTTPS_PORT, () => {
    console.log(`[server]: Server is listening at https://localhost:${process.env.HTTPS_PORT}`);
    console.log(__dirname);
});
http
    .createServer(function (req, res) {
    res.writeHead(301, {
        Location: "https://" + req.headers["host"] + req.url,
    });
    res.end();
})
    .listen(process.env.HTTP_PORT);
app.use(DepartmentRoute_1.default);
app.get("/", async (req, res) => {
    res.send("<h1>Talent Manangment Academy</h1>");
});
//app.listen(port, () => { console.log("server is started")})
