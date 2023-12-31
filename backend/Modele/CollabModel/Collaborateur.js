const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database/database');
const TestDepartement = require('../Structure/TestDepartement');
const TestPoste = require('../Structure/TestPoste');
const Projet = require('../Structure/Projet')

class Collaborateur extends Model{};

Collaborateur.init({
    matricule: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    nom: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING(40),
    },
    sexe: {
        type: DataTypes.STRING(10),
    },
    dateNaissance: {
        type: DataTypes.DATE()
    },
    lieuNaissance : {
        type : DataTypes.STRING(20)
    },
    lot: {
        type: DataTypes.STRING(15)
    },
    quartier: {
        type: DataTypes.STRING(20)
    },
    ville: { 
        type: DataTypes.STRING(20) 
    },
    tel: { 
        type: DataTypes.STRING(14) 
    },
    telurgence : {
        type : DataTypes.STRING(14)
    },
    CIN : {
        type : DataTypes.STRING(12),
        unique : true
    },
    dateDelivrance : {
        type : DataTypes.DATE
    },
    lieuDelivrance : {
        type : DataTypes.STRING(20),
    },
    statutmatrimoniale : {
        type : DataTypes.STRING(20)
    },
    nbEnfant : {
        type: DataTypes.INTEGER
    },

    dateEmbauche: { 
        type: DataTypes.DATE 
    },
    site: { 
        type: DataTypes.STRING(20) 
    },
    image: { 
        type: DataTypes.STRING 
    },
    entreprise : {
        type : DataTypes.STRING(25),
        allowNull: false, 
    },
    categorie : {
       type : DataTypes.STRING(20), 
    },
    contrat : {
        type: DataTypes.STRING(20)
    },
    poste : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model: TestPoste,
            key : 'id'
        }
    }, 
    poste2 : {
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
            model: TestPoste,
            key : 'id'
        }
    }, 
    departement : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : {
                model : TestDepartement,
                key : 'id'
            }
        }
    },
    departement2 : {
        type: DataTypes.INTEGER,
        allowNull : true,
        references : {
            model : TestDepartement,
            key : 'id'
        }
    },
    projet : {
        type : DataTypes.INTEGER,
        references : {
            model : Projet,
            key : 'id'
        }
    },
    projet2 : {
        type : DataTypes.INTEGER,
        references : {
            model : Projet,
            key: 'id'
        }
    },


}, {
    sequelize,
    modelName: 'Collaborateur'
})


Collaborateur.belongsTo(TestPoste, {
    foreignKey : 'poste',
    onUpdate : 'CASCADE',
    as : 'poste1'
})

Collaborateur.belongsTo(TestPoste, {
    foreignKey : 'poste2',
    onUpdate : 'CASCADE',
    as : 'postes'
})

Collaborateur.belongsTo(TestDepartement, {foreignKey:"departement", targetKey:'id', onUpdate:'CASCADE', as: 'departement1'})
Collaborateur.belongsTo(TestDepartement, {foreignKey:"departement2", targetKey:'id', onUpdate:'CASCADE', as:'departements'})

Collaborateur.belongsTo(Projet, {
    foreignKey : 'projet',
    targetKey : 'id',
    onUpdate : 'CASCADE',
    as: 'projet1'
})

Collaborateur.belongsTo(Projet, {
    foreignKey : 'projet2',
    targetKey : 'id',
    onUpdate : 'CASCADE',
    as: 'projets'
})


module.exports = Collaborateur;

