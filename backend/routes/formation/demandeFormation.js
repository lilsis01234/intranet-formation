const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());

const Formation = require('../../Modele/formation/Formation');
const Collaborateur = require('../../Modele/Collaborateur');
const Departement = require('../../Modele/Departement');
const Seance = require('../../Modele/formation/Seance');
const Module = require('../../Modele/formation/Module');
const DemandeFormation = require('../../Modele/formation/demandeFormation')

router.get('/all_demandes_formations', async (req, res) => {
    DemandeFormation.findAll({
      include: [
        {
          model: Collaborateur,
          as: 'Auteur',
          attributes: ['nom', 'prenom'],
        },
        {
          model: Collaborateur,
          as: 'Formateur',
          attributes: ['nom', 'prenom'],
        },
        {
          model: Collaborateur,
          as: 'Collaborateur',
          attributes: ['nom', 'prenom'],
        },
        {
          model: Departement,
          as: 'Departement',
          attributes: ['nomDepartement'], // Supposons que vous voulez seulement le nom du département, ajustez-le en conséquence.
        },
      ],
      attributes: ['id', 'themeDemande', 'description', 'auteur', 'collaborateurId', 'formateur', 'departementId'],
      where: {
        approbation1: 1,
        approbation2: 0,
      },
    })
      .then((demandeFormation) => {
        res.status(200).json(
          demandeFormation.map((formation) => {
            return {
              id: formation.id,
              themeDemande: formation.themeDemande,
              description: formation.description,
              auteur: formation.Auteur ? `${formation.Auteur.nom} ${formation.Auteur.prenom}` : null,
              formateur: formation.Formateur ? `${formation.Formateur.nom} ${formation.Formateur.prenom}` : null,
              collaborateurId: formation.Collaborateur ? `${formation.Collaborateur.nom} ${formation.Collaborateur.prenom}` : null,
              departement: formation.Departement ? formation.Departement.nomDepartement : null,
            };
          })
        );
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des demandes de formation.' });
      });
  });

// router.post('/approuver/:id', async (req, res) => {
//     const formationId = req.params.id;
    
//     try {
//         const updatedFormation = await Formation.update(
//             { approbation: 1 },
//             { where: { id: formationId } }
//         );

//         if (updatedFormation[0] === 0) {
//             return res.status(404).json({ message: "Formation not found." });
//         }

//         return res.status(200).json({ message: "Formation approved successfully." });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "An error occurred while approving the formation." });
//     }
// });

// router.post('/annulerapprobation/:id', async (req, res) => {
//     const formationId = req.params.id;
//     try {
//         const updatedFormation = await Formation.update(
//             { approbation: 0 },
//             { where: { id: formationId } }
//         );

//         if (updatedFormation[0] === 0) {
//             return res.status(404).json({ message: "Formation not found." });
//         }

//         return res.status(200).json({ message: "Formation approved successfully." });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "An error occurred while approving the formation." });
//     }
// });

// router.delete('/desapprouver/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deleteFormation = await Formation.findByPk(id);
//         if (!deleteFormation) {
//             return res.status(404).json({ error: 'Formation introuvable' });
//         }
        
//         // Supprimer les séances associées
//         await Seance.destroy({
//             where: {
//                 formation: id
//             }
//         });

//         // Supprimer les modules associés
//         await Module.destroy({
//             where: {
//                 formation: id
//             }
//         });

//         // Supprimer la formation elle-même
//         await deleteFormation.destroy();

//         res.sendStatus(204);
//     } catch (error) {
//         console.error('Erreur lors de la suppression :', error);
//         res.status(500).json({ message: 'Erreur lors de la suppression' });
//     }
// });
// router.post('/addDemandeFormation',async(req,res)=>{
//     try{
//         const newFormation = await(Formation.create({
//             theme:req.body.theme,
//             description:req.body.description,
//             duree:req.body.duree,
//             formateur:req.body.formateur,
//             approbation:0
//         }))
//         const demandeFormation = await newFormation.save();
//         res.status(201).json(demandeFormation);
//     }
//     catch(err){
//         console.error(err)
//     }
// })

module.exports = router;