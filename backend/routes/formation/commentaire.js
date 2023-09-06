const router = require('express').Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser());
const Commentaire = require('../../Modele/formation/CommentaireFormation')
// const Formation = require('../../Modele/formation/Formation');
const Collaborateur = require('../../Modele/Collaborateur');
// const DiscussionFormation = require('../../Modele/formation/discussionFormation');

router.get('/all_comments/:idDiscussion', async(req,res)=>{
    const formationId = req.params.idDiscussion;
        try {
            const commentaireDiscussion = await Commentaire.findAll({
                include: {
                    model: Collaborateur,
                    attributes: ['nom', 'prenom']
                },
                where:
                    {
                        discussion: formationId,
                    },
            });
            res.status(200).json(commentaireDiscussion);
        } catch (error) {
            console.error('Erreur lors de la récupération des discussions sur la formation :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des discussions sur la formation' });
        }
    });

module.exports = router;