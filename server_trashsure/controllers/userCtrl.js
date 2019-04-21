const jwt = require("jsonwebtoken"),
  User = require("../models/user"),
  bcrypt = require("../helpers/bcrypt"),
  getError = require("../helpers/getError");

class UserController {
  static register(req, res) {
    User.create(req.body)
      .then(user => {
        res.status(201).json(user);
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
  static login(req, res) {
    let { email, password } = req.body;
    if (!password) password = '';
    User.findOne({ email })
      .then(user => {
        if (user) {
          if (bcrypt.compare(password, user.password)) {
            let { _id, name, email } = user;
            let token = jwt.sign({ id: _id, name, email }, process.env.JWT_SECRET);
            res.status(200).json({ token });
          }
          else throw { contMessage: `Email / Password Wrong`, status: 400 };
        }
        else throw { contMessage: `Email / Password Wrong`, status: 400 };

      })
      .catch(err => {
        if (err.contMessage) {
          res.status(err.status).json({
            message: err.contMessage
          });
        }
        else {
          res.status(500)
            .json({ message: `Internal Server Error` });
        }
      });
  }
}
module.exports = UserController;
