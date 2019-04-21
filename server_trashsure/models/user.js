const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require("../helpers/bcrypt");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name must be filled"]
  },
  email: {
    type: String,
    required: [true, 'Email must be filled'],
    validate: [
      {
        validator: function (val) {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(val).toLowerCase());
        },
        message: `Email invalid format`
      },
      {
        validator: function (val) {
          return User.findOne({ email: val, _id: { $ne: this._id } })
            .then(data => {
              if (data) {
                throw err;
              }
            })
            .catch(err => {
              throw err;
            });
        },
        message: `Please check your email again`
      }
    ]
  },
  password: {
    type: String,
    required: [true, "Password must be filled"]
  }
});

userSchema.pre("save", function (next) {
  this.password = bcrypt.hash(this.password);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
