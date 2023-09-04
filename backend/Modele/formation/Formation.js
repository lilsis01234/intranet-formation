const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../database/database');
const Collaborateur = require('../Collaborateur');
const Departement = require('../Departement');

class Formation extends Model{}

Formation.init({
    theme:{
        type : DataTypes.STRING(50), 
        allowNull : false, 
    },
    description:{
        type : DataTypes.STRING(500), 
        allowNull : false, 
    },
    duree:{
        type : DataTypes.STRING(8), 
        allowNull : false,
    },
    formateur:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
        model : Collaborateur,
        key : 'id'
    }
    },
    departementAFormer:{
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
        model : Departement,
        key : 'id'
    }
    },
    personneAFormer:{
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
        model : Collaborateur,
        key : 'id'
    }
    }
    },{
        sequelize,
        modelName : 'Formation'
    })
    Formation.belongsTo(Collaborateur, {
        foreignKey : 'formateur',
        onDelete : 'CASCADE'
    })
    Formation.belongsTo(Collaborateur, {
        foreignKey: 'personneAFormer',
        as: 'CollaborateurFormation', // Alias défini ici
      });
      
    Formation.belongsTo(Departement, {
    foreignKey: 'departementAFormer',
    as: 'DepartementFormation', // Alias défini ici
    });


module.exports = Formation;