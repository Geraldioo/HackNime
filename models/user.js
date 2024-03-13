'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username Can't be empty",
        },
        notEmpty: {
          msg: "Username Can't be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email Already Exist",
      },
      validate: {
        notNull: {
          msg: "Email Can't be empty",
        },
        notEmpty: {
          msg: "Email Can't be empty",
        },
        isEmail: {
          msg: "Email Must Be Email Format",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password Can't be empty",
        },
        notEmpty: {
          msg: "Password Can't be empty",
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Not Premium"
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};