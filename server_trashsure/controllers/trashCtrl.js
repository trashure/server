const Trash = require("../models/trash"),
  getError = require("../helpers/getError");

class Controller {
  static create(req, res) {
    req.body.userID = req.userLoggedIn.id;
    if (req.file !== undefined) req.body.path = req.file.cloudStoragePublicUrl;

    Trash.create(req.body)
      .then(trash => {
        return trash.populate('userID').execPopulate();
      })
      .then(trash => {
        res.status(201).json(trash);
      })
      .catch(err => {
        if (err.message) {
          res.status(400)
            .json({ message: getError(err) });
        }
        else {
          res.status(500)
            .json({ message: `Internal Server Error` });
        }
      });
  }
  static read(req, res) {
    Trash.find().populate('userID')
      .then(trashs => {
        res.status(200).json(trashs);
      })
      .catch(err => {
        if (err.message) {
          res.status(400)
            .json({ message: getError(err) });
        }
        else {
          res.status(500)
            .json({ message: `Internal Server Error` });
        }
      });
  }
  static delete(req, res) {
    Trash.deleteOne({ _id: req.params.id })
      .then(info => {
        res.status(200).json(info);
      })
      .catch(err => {
        if (err.path === '_id') {
          res.status(404)
            .json({ message: 'Trash not found' });
        }
        else {
          res.status(500)
            .json({ message: `Internal Server Error` });
        }
      });
  }
}
module.exports = Controller;
