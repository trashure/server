const Route = require("route-label")(require("express")()),
  auth = require('../middlewares/auth'),
  uploadGCP = require('../middlewares/uploadGCP'),
  bufferImg = require('../middlewares/bufferImg'),
  controller = require("../controllers/trashCtrl");

//
//  T R A S H   R O U T E R
//
Route.use('', auth.authentication);
Route.post("Add", "/", bufferImg, uploadGCP.sendUploadToGCS, controller.create);
Route.get("List_Collection_Trash", "/collection", controller.collection);
Route.get("List_All_Trash", "/", controller.read);
Route.delete("Delete", "/:id", controller.delete);

module.exports = Route;
