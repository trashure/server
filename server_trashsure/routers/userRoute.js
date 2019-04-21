const Route = require("route-label")(require("express")()),
  controller = require("../controllers/userCtrl");

//
//  U S E R   R O U T E R
//
Route.post("Register_User", "/register", controller.register);
Route.post("Login_User", "/login", controller.login);

module.exports = Route;
