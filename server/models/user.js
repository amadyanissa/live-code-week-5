'use strict';
const hash = require("../helpers/hashPassword")
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model { }
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        validate: {
          notNull: { msg: "user is required" },
          notEmpty: { msg: "user should not be empty" }
        }, allowNull: false
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "email invalid"
        },
        isUnique(value) {
          User.findOne({ where: { email: value } })
            .then(emailFound => {
              if (emailFound) {
                throw new Error('email already used')
              }
            })
        },
        notNull: { msg: "email is required" },
        notEmpty: { msg: "email should not be empty" }
      }, allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "password is required" },
        notEmpty: { msg: "password should not be empty" }
      }, allowNull: false
    }
  }, {
      hooks: {
        beforeCreate: (instance, options) => {
          let hashed = hash(instance.password)
          instance.password = hashed
        }
      }
      , sequelize
    })

  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};