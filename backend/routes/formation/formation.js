const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());

const Formation = require('../../Modele/formation/Formation');
const Collaborateur = require('../../Modele/Collaborateur');
const Seance = require('../../Modele/formation/Seance');
const Module = require('../../Modele/formation/Module');


router.get('/all_formations', async(req,res) => {
    Formation.findAll({
        include: {
            model: Collaborateur,
            attributes: ['nom', 'prenom']
        },
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
                    nomformateur: formation.Collaborateur.nom,
                    prenomformateur: formation.Collaborateur.prenom,
                }
            })
        )
        console.log(formation)
    }) 
})

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
            if (!formation || !modules || !seances) {
                return res.status(404).json({ error: 'Formation introuvable' });
            }
            res.status(200).json({formation,modules,seances});
        } catch (error) {
            console.error('Erreur lors de la récupération des informations de la formation :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des informations de la formation' });
        }
    });

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

router.post('/addFormation',async(req,res)=>{
    try{
        const newFormation = await(Formation.create({
            theme:req.body.theme,
            description:req.body.description,
            duree:req.body.duree,
            formateur:req.body.formateur,
            approbation:0
        }))
        const demandeFormation = await newFormation.save();
        res.status(201).json(demandeFormation);
    }
    catch(err){
        console.error(err)
    }

})

module.exports = router;