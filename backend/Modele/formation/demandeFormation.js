const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../database/database');
const Collaborateur = require('../Collaborateur');
const Departement = require('../Departement')

class DemandeFormation extends Model{}

DemandeFormation.init({
    themeDemande:{
        type : DataTypes.STRING(50), 
        allowNull : false, 
    },
    description:{
        type : DataTypes.STRING(500), 
        allowNull : false, 
    },
    collaborateurId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Collaborateur,
          key: 'id',
        },
    },
    departementId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Departement,
          key: 'id',
        },
    },
    auteur:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
        model : Collaborateur,
        key : 'id'
    }
    },
    formateur:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
        model : Collaborateur,
        key : 'id'
    }
    },
    approbation1:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    approbation2:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
    },{
        sequelize,
        modelName : 'DemandeFormation'
    })
    DemandeFormation.belongsTo(Collaborateur, {
        foreignKey: 'auteur',
        as: 'Auteur', // Alias défini ici
      });
      
      DemandeFormation.belongsTo(Collaborateur, {
        foreignKey: 'formateur',
        as: 'Formateur', // Alias défini ici
      });
      
      DemandeFormation.belongsTo(Collaborateur, {
        foreignKey: 'collaborateurId',
        as: 'Collaborateur', // Alias défini ici
      });
      
      DemandeFormation.belongsTo(Departement, {
        foreignKey: 'departementId',
        as: 'Departement', // Alias défini ici
      });


module.exports = DemandeFormation;