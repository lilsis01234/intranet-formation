const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/database');
// const CompteCollab = require('./CompteCollab');
const Role= require ('../Modele/Role');
// const CompteCollab = require('../Modele/CompteCollab');

class Role2 extends Model{}

Role2.init({
    role:{
        type : DataTypes.INTEGER,
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