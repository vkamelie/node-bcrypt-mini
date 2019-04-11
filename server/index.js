require('dotenv').config();
const express = require('express');
const session = require('express-session');
const controller = require('../server/controller/authController.js')
const massive = require('massive');

const app = express();

app.use(express.json());

let { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
); 

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
});

app.route('/auth/signup').post(controller.signup)
.get()
// .post()
// .put()
// .delete()
app.route('/auth/login').post(controller.login)
app.route("auth/logout").get(controller.logout)
app.route("/api/user").get(controll.er)

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port: ${SERVER_PORT}`);
});
