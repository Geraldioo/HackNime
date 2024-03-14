const express = require("express");
const ControllerAuth = require("../controllers/authController");
const Controller = require("../controllers/controller");
const { authentication } = require("../middlewares/authentication");
const { errHandler } = require("../middlewares/errHandler");
const { authorization } = require("../middlewares/authorization");
const route = express.Router();

route.post("/register", ControllerAuth.register);
route.post("/login", ControllerAuth.login);
route.post("/google-login", ControllerAuth.googleLogin);

route.use(authentication);

route.get("/anime", Controller.getAnime);

// route.post("/subscription/:userId, Controller)

route.get("/favorite", Controller.getFav);
route.get("/score", Controller.getFav);
route.post("/favorite/:animeId", Controller.addFav);
route.patch("/favorite/:animeId/complete", Controller.editStatus);
route.patch("/favorite/:animeId", Controller.editScore)
// route.delete("/favorite/:animeId", Controller)

route.use(errHandler);

module.exports = route;
