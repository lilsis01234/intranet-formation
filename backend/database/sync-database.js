const sequelize = require('../database/database');
const Departement = require('../Modele/Departement');
const Poste = require('../Modele/Poste'); 
const Collaborateur = require ('../Modele/Collaborateur');
const CompteCollab = require('../Modele/CompteCollab');
const RoleCollab = require('../Modele/Role');
const PasswordResetRequest = require('../Modele/PasswordResetRequest');
const ArchiveCollab = require('../Modele/ArchiveCollab');
const Formation = require('../Modele/formation/Formation');
const CommentaireFormation = require('../Modele/formation/CommentaireFormation');
const DiscussionFormation= require('../Modele/formation/discussionFormation');
const Module = require('../Modele/formation/Module');
const Seance = require('../Modele/formation/Seance');
const ParticipantsSeance = require('../Modele/formation/ParticipantsSeance');
const DemandeFormation = require('../Modele/formation/demandeFormation');

const association = require('../Modele/formation/associationSeanceCollab');

//Synchronisation de la base de donnée 
async function syncDatabase(){
    try{
        await sequelize.sync({force : false}); 
        const { Seance, Collaborateur, ParticipantsSeance } = association;

        Collaborateur.belongsToMany(Seance, { through: ParticipantsSeance });
        Seance.belongsToMany(Collaborateur, { through: ParticipantsSeance });
        console.log('La base de donnée est synchronisée avec succès')
    }  catch (error){
        console.error('Erreur lors de la synchronisation de la base de données :', error )
    } finally {
        sequelize.close();
    }
}

syncDatabase();