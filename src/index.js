require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import responseHandler from "./helpers/responseHandler";
import passport from "./services/localStrategy";
import cors from "cors";
import { csLg } from "./logger";
const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8');

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.use("/api", routes);
app.get("/", (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(content));
  res.end(content);
});

app.use((req, res, next) =>
  next({
    status: 404,
    message: "The url you requested is currently unavaillable",
  })
);
app.use((err, req, res, next) => {
  csLg("error", err.message);
  return responseHandler(res, err.message, err.status || 500);
});

const server = app.listen(process.env.PORT || port, () => {
  csLg("info", `--------Evenhelp listening to port  ${process.env.PORT || port}--------`);
});

const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('connect');
});
export default app;
