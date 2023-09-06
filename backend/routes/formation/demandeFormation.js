const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());


const Collaborateur = require('../../Modele/Collaborateur');
const Departement = require('../../Modele/Departement');
// const DemandeFormation = require('../../Modele/formation/demandeFormation');
const Role2 = require('../../Modele/Role2');
const Module = require('../../Modele/formation/Module');
const Formation = require('../../Modele/formation/Formation');

//demande d'approbation pour la direction/coatch/rrh
router.get('/all_demandes_formations/:idRole', async (req, res) => {
    const Roleid = req.params.idRole;
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
          model: Departement,
          as: 'Departement',
          attributes: ['nomDepartement'], // Supposons que vous voulez seulement le nom du département, ajustez-le en conséquence.
        },
      ],
      attributes: ['id', 'theme', 'description', 'auteur', 'personneAFormer', 'formateur', 'departementAFormer'],
      where: {
        approbation1:0,
        destinataireDemande:Roleid,
      },
    })
      .then((demandeFormation) => {
        res.status(200).json(
          demandeFormation.map((formation) => {
            return {
              id: formation.id,
              theme: formation.theme,
              description: formation.description,
              auteur: formation.Auteur ? `${formation.Auteur.nom} ${formation.Auteur.prenom}` : null,
              formateur: formation.Formateur ? `${formation.Formateur.titreRole}` : null,
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


// 19 April
//demandes acceptées par la direction ou les RRH
  router.get('/all_confirmed_formations/:idRole', async (req, res) => {
    const Roleid = req.params.idRole;
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
      attributes: ['id', 'theme', 'description', 'auteur', 'personneAFormer', 'formateur', 'departementAFormer'],
      where: {
        approbation1: 1,
        destinataireDemande:Roleid,
      },
    })
      .then((demandeFormation) => {
        res.status(200).json(
          demandeFormation.map((formation) => {
            return {
              id: formation.id,
              theme: formation.theme,
              description: formation.description,
              auteur: formation.Auteur ? `${formation.Auteur.nom} ${formation.Auteur.prenom}` : null,
              formateur: formation.Formateur ? `${formation.Formateur.titreRole}` : null,
              personneAFormer: formation.Collaborateur ? `${formation.Collaborateur.nom} ${formation.Collaborateur.prenom}` : null,
              departementAFormer: formation.Departement ? formation.Departement.nomDepartement : null,
            };
          })
        );
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des demandes de formation.' });
      });
  });



// envoi des demandes pour la direction à partir des RRH, approbation des RRH
router.post('/envoiDirection/:id', async (req, res) => {
  const formationId = req.params.id;
  
  try {
      const updatedFormation = await Formation.update(
          {destinataireDemande:1},
          { where: { id: formationId } }
      );

      if (updatedFormation[0] === 0) {
          return res.status(404).json({ message: "Formation not found." });
      }

      return res.status(200).json({ message: "Formation approved successfully." });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while approving the formation." });
  }
});

//approbation de la direction
router.post('/approbationDirection/:id', async (req, res) => {
  const formationId = req.params.id;
  
  try {
      const updatedFormation = await Formation.update(
          {approbation1:1},
          { where: { id: formationId } }
      );

      if (updatedFormation[0] === 0) {
          return res.status(404).json({ message: "Formation not found." });
      }

      return res.status(200).json({ message: "Formation approved successfully." });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while approving the formation." });
  }
});

//anulation de l'approbation par la direction
router.post('/annulerDesapprobation/:id', async (req, res) => {
  const formationId = req.params.id;
  
  try {
      const updatedFormation = await Formation.update(
          {approbation1:0},
          { where: { id: formationId } }
      );

      if (updatedFormation[0] === 0) {
          return res.status(404).json({ message: "Formation not found." });
      }

      return res.status(200).json({ message: "Formation approved successfully." });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while approving the formation." });
  }
});

// Approbation des Demandes pour le coatch
router.post('/approuverpourCoatch/:id', async (req, res) => {
  const formationId = req.params.id;
  
  try {
      const updatedFormation = await Formation.update(
          { approbation1: 1 },
          { where: { id: formationId } }
      );

      if (updatedFormation[0] === 0) {
          return res.status(404).json({ message: "Formation not found." });
      }

      return res.status(200).json({ message: "Formation approved successfully." });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while approving the formation." });
  }
});

//annulation de l'approbation par le coatch
router.post('/annulerapprobation/:id', async (req, res) => {
    const formationId = req.params.id;
    try {
        const updatedFormation = await Formation.update(
            { approbation1: 0 },
            { where: { id: formationId } }
        );

        if (updatedFormation[0] === 0) {
            return res.status(404).json({ message: "Formation not found." });
        }

        return res.status(200).json({ message: "Formation approved successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while approving the formation." });
    }
});


//desapprobation
router.delete('/desapprouver/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteDemandeFormation = await Formation.findByPk(id);
        if (!deleteDemandeFormation) {
            return res.status(404).json({ error: 'Formation introuvable' });
        }
        
        // Supprimer les séances associées
        await Seance.destroy({
            where: {
                formation: id
            }
        });

        // Supprimer les modules associés
        await Module.destroy({
            where: {
                formation: id
            }
        });

        // Supprimer la formation elle-même
        await deleteDemandeFormation.destroy();

        res.sendStatus(204);
    } catch (error) {
        console.error('Erreur lors de la suppression :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression' });
    }
});

// ajout demande de formation
router.post('/addDemandeFormation',async(req,res)=>{
    try{
        const newFormation = await(Formation.create({
            theme:req.body.theme,
            description:req.body.description,
            duree:req.body.duree,
            formateur:req.body.formateur,
            auteur:req.body.auteur,
            departementAFormer: req.body.departementAFormer,
            personneAFormer:req.body.personneAFormer,
            destinataireDemande:req.body.destinataireDemande,
            approbation1:0,
        }))
        const demandeFormation = await newFormation.save();
        res.status(201).json(demandeFormation);
    }
    catch(err){
        console.error(err)
    }
})


module.exports = router;