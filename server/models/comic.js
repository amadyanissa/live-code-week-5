'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Comic extends Model { }
  Comic.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "Title is required" },
        notEmpty: { msg: "Title should not be empty" }
      }, allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "author is required" },
        notEmpty: { msg: "author should not be empty" }
      }, allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
    }
  }, { sequelize })

  Comic.associate = function (models) {
    // associations can be defined here
  };
  return Comic;
};