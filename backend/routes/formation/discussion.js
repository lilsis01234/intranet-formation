const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());

const Formation = require('../../Modele/formation/Formation');
const Collaborateur = require('../../Modele/Collaborateur');
const DiscussionFormation = require('../../Modele/formation/discussionFormation');

router.get('/all_discussions/:idformation', async(req,res)=>{
    const formationId = req.params.idformation;
        try {
            const discussionFormation = await DiscussionFormation.findAll({
                include: {
                    model: Collaborateur,
                    attributes: ['nom', 'prenom']
                },
                where:
                    {
                        formation: formationId,
                    },
            });
            res.status(200).json(discussionFormation);
        } catch (error) {
            console.error('Erreur lors de la récupération des discussions sur la formation :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des discussions sur la formation' });
        }
    });

module.exports = router;