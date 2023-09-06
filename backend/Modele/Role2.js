const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/database');
// const CompteCollab = require('./CompteCollab');
const Role= require ('../Modele/Role');


class Role2 extends Model{}

Role2.init({
    role:{
        type : DataTypes.STRING,
        allowNull : false,
        references : {
            model : Role,
            key : 'id'
        },
        unique : true
    },
    titreRole2 : {
        type : DataTypes.STRING,
        allowNull : true,
        unique : true
    }
}, {
    sequelize,
    modelName : 'Role2',
});

Role2.belongsTo(Role, {
    foreignKey : 'role',
    onUpdate : 'CASCADE',
})


module.exports = Role2;