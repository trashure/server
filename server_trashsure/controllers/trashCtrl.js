const Trash = require("../models/trash"),
  getError = require("../helpers/getError"),
  axios = require('axios'),
  getColor = require('../helpers/getColor'),
  firebase = require('../api/firebase'),
  getAddress = require('../helpers/getAddress');

class Controller {
  static iot(req, res) {
    if (req.file !== undefined) req.body.path = req.file.cloudStoragePublicUrl;

    let data = {
      "imageURL": req.body.path,
      "name": new Date().toISOString() + '.jpg'
    }
    console.log(data);

    axios({
      url: 'http://35.247.132.37/GarbageAPI',
      method: 'POST',
      data
    })
      .then(({ data }) => {
        if (data.type === 'plastic') {
          firebase.database()
            .ref('trashs/1')
            .update({ value: 1 })
          res.status(200).json({ message: 'Plastic' });
        }
        else {
          firebase.database()
            .ref('trashs/1')
            .update({ value: 2 })
          res.status(200).json({ message: 'Not Plastic' });
        }
      })
      .catch(err => {
        res.status(500)
          .json({ message: 'internal Server Error' })
      })

  }


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
        req.body.type = data.type;
        req.body.color = getColor(data.type);
        req.body.prediction = data.prediction[0];
        let coordinate = JSON.parse(req.body.coordinate);
        return getAddress(coordinate.latitude, coordinate.longitude)
      })
      .then(data => {
        req.body.address = data;
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
    Trash.find({ userID: req.userLoggedIn.id }).populate('userID')
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
