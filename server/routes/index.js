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

route.get("/anime", Controller.getAnime);

route.use(authentication);

route.get("/anime/:id", Controller.getAnimeById);

route.get("/payment", Controller.paymentMidtrans);
route.patch("/upgrade", Controller.upgradeAccount);

route.get("/score", Controller.getScore);

// route.use(authorization)
route.get("/favorite", Controller.getFav);
route.post("/favorite/:animeId", Controller.addFav);
route.put("/favorite/:animeId", Controller.editFav);
route.delete("/favorite/:animeId", Controller.deleteFav);

route.use(errHandler);

module.exports = route;
