"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post, { foreignKey: "user_id" });
    }

    static generateHash(password) {
      const saltRounds = 10;
      return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (error, hash) {
          if (error) {
            reject(error);
          } else {
            resolve(hash);
          }
        });
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.prototype.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  User.beforeCreate(async function (user, options) {
    const hash = await User.generateHash(user.password);
    user.password = hash;
  });
  return User;
};
