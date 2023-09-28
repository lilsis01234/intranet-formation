const Role = require('../../Modele/RoleModel/Role');
const RoleHierarchique = require('../../Modele/RoleModel/RoleHierarchique');
const Permission = require('../../Modele/RoleModel/Permission') 
const RolePermission = require('../../Modele/RoleModel/RolePermission');



const router = require('express').Router();

//Créer un rôle
router.post('/new', async(req, res) => {
    try {
        const {roleHierarchique, RoleId, permission} = req.body;

        const newRoleHierarchique = await RoleHierarchique.create({
            roleHierarchique,
            RoleId,
        })

        if(permission && permission.length > 0){
            for (const permissionId of permission){
                const permissionInstance = await Permission.findByPk(permissionId)
                if (!permissionInstance){
                    console.log('Permission non trouvé', permissionId)
                }
                await  RolePermission.create({
                    role : newRoleHierarchique.id,
                    permission : departementId
                })
            }
        }

        return res.status(201).json({message : 'Role crée avec succès'})
    }
    catch(err){
        console.error('Erreur lors de la création d\'un rôle hiérarchique:' , err);
        res.status(201).json({message : 'Erreur lors de la création d\'un rôle'})
    }
})

//Liste de tous les rôles
router.get('/all', async(req, res) => {
    try {
        const listRoleHierarchique = await RoleHierarchique.findAll({
            include : [
                {
                    model : Permission,
                    as : 'permission'
                }
            ]
        });
        res.status(201).json(listRoleHierarchique);
    }
    catch (error){
        console.error('Erreur lors de la génération du liste des rôles:', error)
        res.status(500).json({message : 'Erreur lors de la génération du liste des rôles hierarchiques'})
    }
})

//Mise à jour des rôles existants
router.put('/edit/:id', async(req, res) => {
    const {id} = req.params;
    try{

        const {roleHierarchique, RoleId, permission} = req.body;

        const updateRoleHierarchique = await RoleHierarchique.findByPk(id);
        if (!updateRoleHierarchique) {
            return res.status(404).json({error : 'Rôle introuvable'})
        }
        const updatedRolHierarchique = await updateRoleHierarchique.update({
            roleHierarchique,
            RoleId
        })

          //Récupérer les associtions actuelles du poste
        const association = await RolePermission.findAll({
            where : {
                role : updateRoleHierarchique
            }
        })

        //Récupérer les id des departements associés 
        const PermissionActuelle = association.map((assoc) => assoc.permission)

         //Identifier les departement à ajouter
        const permissionAajouter = permission.filter((permissionId) => !PermissionActuelle.includes(permissionId))

        //Identifier les departements avec les associations à supprimer
        const permissioonASupprimer = PermissionActuelle.filter((permissionId) => !permission.includes(permissionId))

        //Supprimer les associations avec les départements
        await RolePermission.destroy({
            where : {
                role : updateRoleHierarchique.id,
                permission : permissioonASupprimer
            }
        })


        for (const permissionId of permissionAajouter){
            const permissions = await Permission.findByPk(permissionId)
            if (!permissions){
                console.log('Permission non trouvé', permissionId)
            }

            await RolePermission.create({
                role : updateRoleHierarchique.id,
                permission : permissions.id
            })
        }
        


        res.status(201).json(updatedRolHierarchique)
    }
    catch(error){
        console.error('Erreur lors de la mise à jour du rôle', error);
        res.status(500).json({error : 'Erreur lors de la mise à jour du rôle'})
    }
})

//Voir le rôle hierarchique
router.get('/view/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const roleHierarchique = await RoleHierarchique.findByPk(id, {
            include : [
                {
                    model : Permission,
                    as : 'permission'
                }
            ]
        });
        if(!roleHierarchique){
            return res.status(404).json({error: 'Rôle introuvable'})
        }
        res.status(201).json(roleHierarchique)
    }
    catch(error){
        console.error('Erreur lors de l\'affichage du rôle', error);
        res.status(500).json({error : 'Erreur lors de l\'affichage du rôle'})
    }
})

//Effacer le rôle hierarchique
router.delete('/delete/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const deleteRole = await RoleHierarchique.findByPk(id);
        if(!deleteRole){
            return res.status(404).json({error : 'Rôle introuvable'});
        }

        await RolePermission.destroy({
            where : {
                role : deleteRole.id
            }
        })

        await deleteRole.destroy();
        res.sendStatus(204).json({message : 'Poste supprimé avec succès'})
    }
    catch(error){
        console.error('Erreur lors de la suppréssion du rôle:', error)
        res.status(500).json({message : 'Erreur lors de la suppression du rôle'})
    }

})

module.exports = router;