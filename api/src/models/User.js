var Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
var bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    // defino el modelo
    const User = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        locality: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        securityQuestion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        securityAnswer: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        googleId: {type: DataTypes.STRING,
            allowNull: true,
        },
        resetPasswordToken: {
            type: DataTypes.STRING
        },
        resetPasswordExpires: {
            type: DataTypes.DATE
        },
    })

    // debe ser function para que funcione this.password
    User.prototype.isPasswordValid = function ( password ) {
        return bcrypt.compare(password, this.password)
        .then(isValid => isValid)
        .catch(err => {
            console.error('isPasswordValid:', err)
            return false
        })
    }

    const hashPassword = password => {
        return new Promise( (resolve, reject) => {
            bcrypt.hash(password, 8)
            .then(hash => resolve(hash))
            .catch(err=> reject(err))
        })
    }

    User.addHook('beforeCreate', (user, options, cb) => {
        // console.info("en el hook beforeCreate", user)
        return hashPassword(user.password).then(hash => user.password = hash)}
    )

    User.addHook('beforeUpdate', (user, options, cb) =>
    {
        // console.info("en el hook beforeUpdate:", user)
        return hashPassword(user.password).then(hash => user.password = hash)}
    )

    return User
}
