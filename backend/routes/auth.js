const CompteCollab = require('../Modele/CompteCollab');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

// require('dotenv').config();

const crypto = require('crypto');
const Role = require('../Modele/Role');
const Role2 = require('../Modele/Role2');

const router = require('express').Router();

router.use(cookieParser());

const secretKey = crypto.randomBytes(32).toString('hex');

//pour se connecter
router.post('/login', (req, res, next) => {
    CompteCollab.findOne({
        where: { email: req.body.email },
        include: [{ model: Role2,
            attributes:['id','titreRole2'],
            include: [
                {
                    model: Role, 
                    attributes: ['id','titreRole'] 
                }
            ]
            }] 
    })
    .then(comptes => {
        if (!comptes) {
            return res.status(401).json({ message: 'Identifiant non trouvé' })
        }

        bcrypt
            .compare(req.body.password, comptes.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: 'Mot de passe incorrect' })
                }

                const userRole2 = comptes.Role2; 
                const userRole = userRole2.Role ;

                if (!userRole) {
                    return res.status(401).json({ message: 'Rôles non définis pour l\'utilisateur ' });
                }

                const roleTitle = userRole.titreRole;
                const roleTitle2 = userRole2.titreRole2;

                const token = jwt.sign(
                    { id: comptes.id, role: roleTitle, role2: roleTitle2 },
                    secretKey,
                    { expiresIn: '1h' }
                )

                res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 86400000 })

                res.status(200).json({
                    id: comptes.id,
                    role: roleTitle,
                    role2: roleTitle2,
                    token: token,
                    // idrole: userRole.id
                })

                console.log('Utilisateur connecté avec succès')
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json(error));
})

module.exports = router;