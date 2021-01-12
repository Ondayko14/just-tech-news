const sequelize = require('../config/connection');
const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');

//Create our user Module
class User extends Model {
    //set up method to run on instance data to check password
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}
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
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
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