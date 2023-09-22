const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());


const Formation = require('../../Modele/formation/Formation');
const Collaborateur = require('../../Modele/Collaborateur');
const Seance = require('../../Modele/formation/Seance');
const Module = require('../../Modele/formation/Module');
const Role2 = require('../../Modele/Role2');
const Departement = require('../../Modele/Departement')

//Toutes les formations dont tout le mmonde peut assister
router.get('/all_formations', async(req,res) => {
    Formation.findAll({
        include: [
            {
              model: Collaborateur,
              as: 'Auteur',
              attributes: ['nom', 'prenom'],
            },
            {
              model: Collaborateur,
              as: 'Collaborateur',
              attributes: ['nom', 'prenom'],
            },
            {
              model: Collaborateur,
              as: 'Formateur',
              attributes: ['nom', 'prenom'],
            },
            {
              model: Departement,
              as: 'Departement',
              attributes: ['nomDepartement'], // Supposons que vous voulez seulement le nom du département, ajustez-le en conséquence.
            },
          ],
          attributes: ['id', 'theme', 'description', 'auteur', 'personneAFormer', 'formateur', 'departementAFormer'],
            where:
            {
                [Op.or]: [
                    { approbation1: 1 }, // Formation sans approbation nécessaire
                    { destinataireDemande: null }, // Formation sans destinataire spécifique
                    {departementAFormer:null},
                    {personneAFormer:null},
                ],
            },
    })
    .then((formation) => {
        res.status(200).json(formation)
        console.log(formation)
    }) 
})

//Les formations dont une personne doit assister à cause d'une demande 
router.get('/all_formations/:idPersonne', async(req,res) => {
    const idPersonne = req.params.idPersonne
    Formation.findAll({
        include: [
            {
              model: Collaborateur,
              as: 'Auteur',
              attributes: ['nom', 'prenom'],
            },
            {
              model: Role2,
              as: 'Roledestinataire',
              attributes: ['titreRole'],
            },
            {
              model: Collaborateur,
              as: 'Collaborateur',
              attributes: ['nom', 'prenom'],
            },
            {
              model: Collaborateur,
              as: 'Formateur',
              attributes: ['nom', 'prenom'],
            },
            {
              model: Departement,
              as: 'Departement',
              attributes: ['nomDepartement'], // Supposons que vous voulez seulement le nom du département, ajustez-le en conséquence.
            },
          ],
          attributes: ['id', 'theme', 'description', 'auteur', 'personneAFormer', 'formateur', 'departementAFormer','destinataireDemande'],
        where:
        {
            approbation1: 1,
            departementAFormer:null,
            personneAFormer:idPersonne,
            destinataireDemande: {
                [Sequelize.Op.not]: null,
            },
        },
    })
    .then((formation) => {
        res.status(200).json(formation)
        console.log(formation)
    }) 
})

//Les modules et séances d'une formation
router.get('/all_informations/:idformation', async(req,res)=>{
    const formationId = req.params.idformation;
        try {
            const modules = await Module.findAll({
                where:
                    {
                        formation: formationId,
                    },
            });
            const seances = await Seance.findAll({
                where:{
                    module:modules
                }
            })
            const formation = await Formation.findByPk(formationId)
            if (!formation) {
                return res.status(404).json({ error: 'Formation introuvable' });
            }
            res.status(200).json({formation,modules,seances});
        } catch (error) {
            console.error('Erreur lors de la récupération des informations de la formation :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des informations de la formation' });
        }
    });

//Les formations organisées par une personne
router.get('/formations/:idPersonne',async(req,res)=>{
    const idPersonne = req.params.idPersonne;
    Formation.findAll({
        where: {
            formateur: idPersonne ,
        }
    })
    .then((formation) => {
        res.status(200).json(
            formation.map((formation) => {
                return {
                    id : formation.id,
                    theme : formation.theme,
                    description : formation.description,
                    duree : formation.duree,
                    approbation : formation.approbation,
                }
            })
        )
        console.log(formation)
    }) 
})

//Ajout de formation par un formateur sans besoin d'approbation
router.post('/addFormation',async(req,res)=>{
    try{
        const newFormation = await(Formation.create({
            theme:req.body.theme,
            description:req.body.description,
            duree:req.body.duree,
            formateur:req.body.formateur,
            auteur:req.body.auteur,
            approbation1:1
        }))
        const demandeFormation = await newFormation.save();
        res.status(201).json(demandeFormation);
    }
    catch(err){
        console.error(err)
    }

})

module.exports = router;