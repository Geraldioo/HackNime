const express = require("express");
const ControllerAuth = require("../controllers/authController");
const { authentication } = require("../middlewares/authentication");
const { errHandler } = require("../middlewares/errHandler");
const route = express.Router();

route.post("/login", ControllerAuth.login);

route.use(authentication);

route.use(errHandler);

module.exports = route;
