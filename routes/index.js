const express = require("express");
const ControllerAuth = require("../controllers/authController");
const { authentication } = require("../middlewares/authentication");
const { errHandler } = require("../middlewares/errHandler");
const { default: Controller } = require("../controllers/controller");
const route = express.Router();

route.post("/register", ControllerAuth.register);
route.post("/login", ControllerAuth.login);
route.post("/google-login", ControllerAuth.googleLogin);

route.use(authentication);

route.post("/favorite/:animeId", Controller)

route.use(errHandler);

module.exports = route;
