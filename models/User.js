const sequelize = require('../config/connection');
const {Model, DataTypes} = require('sequelize');

//Create our user Module
class User extends Model {}
//Define table Cloumns and Config
User.init(
    {
    //Table Columns Definitions & Data Types Go Here
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            //Makes this a primary Key
            primaryKey: true,
            //Must turn this on in order to use auto
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //Prevents Duplicate Entries
            unique: true,
            //Validation only works if allowNull = false
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //this means the password must be at least four characters long
                len:[4]
            }
        }
    },
    {
    //Table Configuration Goes Here
      sequelize,
      timestamps: false,
      //Dont pluralize the name of the db table
      freezeTableName: true,
      //use "_" instead of camelCase
      underscored: true,
      //lives under sequeliz.models as this
      modelName: 'user'
    }
);

module.exports = User;