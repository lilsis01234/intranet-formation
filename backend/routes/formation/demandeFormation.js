const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());


const Collaborateur = require('../../Modele/Collaborateur');
const Departement = require('../../Modele/Departement');
const DemandeFormation = require('../../Modele/formation/demandeFormation');
const Role = require('../../Modele/Role');
const Module = require('../../Modele/formation/Module');

router.get('/all_demandes_formations/:idRole', async (req, res) => {
    const Roleid = req.params.idRole;
    DemandeFormation.findAll({
      include: [
        {
          model: Collaborateur,
          as: 'Auteur',
          attributes: ['nom', 'prenom'],
        },
        {
          model: Role,
          as: 'Formateur',
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
      attributes: ['id', 'themeDemande', 'description', 'auteur', 'collaborateurId', 'formateur', 'departementId'],
      where: {
        approbation1: 1,
        approbation2: 0,
        formateur:Roleid,
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


  router.get('/all_demandes_formations_nonadmin/:idRole', async (req, res) => {
    const Roleid = req.params.idRole;
    DemandeFormation.findAll({
      include: [
        {
          model: Collaborateur,
          as: 'Auteur',
          attributes: ['nom', 'prenom'],
        },
        {
          model: Role,
          as: 'Formateur',
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
      attributes: ['id', 'themeDemande', 'description', 'auteur', 'collaborateurId', 'formateur', 'departementId'],
      where: {
        approbation1: 0,
        approbation2: 0,
        formateur:Roleid,
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
  router.get('/all_confirmed_formations/:idRole', async (req, res) => {
    const Roleid = req.params.idRole;
    DemandeFormation.findAll({
      include: [
        {
          model: Collaborateur,
          as: 'Auteur',
          attributes: ['nom', 'prenom'],
        },
        {
          model: Role,
          as: 'Formateur',
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
      attributes: ['id', 'themeDemande', 'description', 'auteur', 'collaborateurId', 'formateur', 'departementId'],
      where: {
        approbation1: 1,
        approbation2: 1,
        formateur:Roleid,
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

router.post('/approuver/:id', async (req, res) => {
    const formationId = req.params.id;
    
    try {
        const updatedFormation = await DemandeFormation.update(
            { approbation2: 1 },
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
router.post('/approuvernonadmin/:id', async (req, res) => {
  const formationId = req.params.id;
  
  try {
      const updatedFormation = await DemandeFormation.update(
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


router.post('/annulerapprobation/:id', async (req, res) => {
    const formationId = req.params.id;
    try {
        const updatedFormation = await DemandeFormation.update(
            { approbation2: 0 },
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

router.post('/annulerapprobationnonadmin/:id', async (req, res) => {
  const formationId = req.params.id;
  try {
      const updatedFormation = await DemandeFormation.update(
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

router.delete('/desapprouver/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteDemandeFormation = await DemandeFormation.findByPk(id);
        if (!deleteDemandeFormation) {
            return res.status(404).json({ error: 'Formation introuvable' });
        }
        
        // Supprimer les séances associées
        // await Seance.destroy({
        //     where: {
        //         formation: id
        //     }
        // });

        // // Supprimer les modules associés
        // await Module.destroy({
        //     where: {
        //         formation: id
        //     }
        // });

        // Supprimer la formation elle-même
        await deleteDemandeFormation.destroy();

        res.sendStatus(204);
    } catch (error) {
        console.error('Erreur lors de la suppression :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression' });
    }
});


router.post('/addDemandeFormation',async(req,res)=>{
    try{
        const newFormation = await(DemandeFormation.create({
            theme:req.body.theme,
            description:req.body.description,
            duree:req.body.duree,
            formateur:req.body.formateur,
            approbation1:0,
            approbation2:0
        }))
        const demandeFormation = await newFormation.save();
        res.status(201).json(demandeFormation);
    }
    catch(err){
        console.error(err)
    }
})

module.exports = router;