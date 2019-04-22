const Trash = require("../models/trash"),
  getError = require("../helpers/getError"),
  axios = require('axios'),
  getColor = require('../helpers/getColor');
getType = require('../helpers/getType');

class Controller {
  static create(req, res) {
    req.body.userID = req.userLoggedIn.id;
    if (req.file !== undefined) req.body.path = req.file.cloudStoragePublicUrl;

    let data = {
      "imageURL": req.body.path,
      "name": new Date().toISOString() + '.jpg'
    }

    axios({
      url: 'http://35.247.132.37/GarbageAPI',
      method: 'POST',
      data
    })
      .then(({ data }) => {
        req.body.type = getType(data.result);
        req.body.color = getColor(data.result);
        req.body.prediction = data.prediction[0];

        return Trash.create(req.body)
      })
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
      .then(garbages => {
        res.status(200).json(garbages);
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

  static collection(req, res) {
    Trash.findOne({ userID: req.userLoggedIn.id }).populate('userID')
      .then(collections => {
        res.status(200).json(collections);
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
