const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/database');
const Collaborateur = require('./Collaborateur');
const Role2 = require('./Role2');

class CompteCollab extends Model{}

CompteCollab.init({
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    collaborateur : {
        type : DataTypes.INTEGER, 
        allowNull : false,
        references : {
            model : Collaborateur,
            key : 'id'
        }
    }, 
    lastResetRequest : {
       type : DataTypes.DATE, 
    }
}, {
    sequelize,
    modelName : 'CompteCollab'
})

CompteCollab.belongsTo(Collaborateur, {
    foreignKey : 'collaborateur',
    onUpdate : 'CASCADE',
    onDelete : 'CASCADE',
})

Role2.hasMany(CompteCollab);
CompteCollab.belongsTo(Role2, {});


module.exports = CompteCollab;

