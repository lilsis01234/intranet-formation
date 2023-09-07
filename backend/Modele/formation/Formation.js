const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../database/database');
const Collaborateur = require('../Collaborateur');
const Departement = require('../Departement');
const Role2 = require('../Role2');

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
        allowNull : true,
        references : {
        model : Collaborateur,
        key : 'id'
    }
    },
    auteur:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
        model : Collaborateur,
        key : 'id'
    }
    },
    destinataireDemande:{
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
        model : Role2,
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
    },
    approbation1:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
    // },
    // approbation2:{
    //     type: DataTypes.BOOLEAN,
    //     defaultValue: false,
    // }
    },{
        sequelize,
        modelName : 'Formation'
    })
    Formation.belongsTo(Collaborateur, {
        foreignKey : 'formateur',
        as: 'Formateur',
        onDelete : 'CASCADE'
    })
    Formation.belongsTo(Collaborateur, {
        foreignKey : 'auteur',
        as: 'Auteur',
        onDelete : 'CASCADE'
    })
    Formation.belongsTo(Collaborateur, {
        foreignKey: 'personneAFormer',
        as: 'Collaborateur', 
      });     
    Formation.belongsTo(Departement, {
        foreignKey: 'departementAFormer',
        as: 'Departement', // Alias défini ici
    });
    Formation.belongsTo(Role2, {
        foreignKey: 'destinataireDemande', // Alias défini ici
    });

// atao ato ny @ demande de Formation, asina destinataire atao nullable dia formateur ilay olona mapiditra azy ato, soloina daholo ny route
module.exports = Formation;