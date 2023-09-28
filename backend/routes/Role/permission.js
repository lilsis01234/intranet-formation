const router = require('express').Router()
const Permission = require('../../Modele/RoleModel/Permission') 

//Afficher toutes les permissions
router.get('/all', async(req, res) => {
    try {
        const permission = await Permission.findAll()
        res.status(200).json(permission)
    }
    catch (error){
        console.error('Erreur lors de la récupération des permission', error)
        res.status(500).json({message : 'Une erreur s\'est produite lors de la récupération des permissions'})
    }
})

//Création d'une nouvelle permission
router.post('/new', async(req, res) => {
    try {
        const newPermission = await Permission.create({
            permission : req.body.permission,
        })
        const savedPermission = await newPermission.save();
        res.status(201).json(savedPermission)
    }
    catch (error){
        console.error('Erreur lors de la création de la permission:', error)
        res.status(500).json({message : 'Erreur lors de la création de la permission'})
    }
})


//Afficher un permission
router.get('/view/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const permission = await Permission.findByPk(id);
        if (!permission){
            return res.status(404).json({error : 'Permission non trouvé'})
        }
        res.json({permission})
    } catch(err){
        console.error('Erreur lors de la récupération des permissions:', error)
        res.status(500).json({error : 'Erreur lors de la récupération des permissions'})
    }
})

//Mise à jour de la permission
router.put('/edit/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const updatPermission = await Permission.findByPk(id)
        if (!updatPermission){
            return res.status(404).json({error : 'Permission non trouvé'})
        }
        const newPermission = await updatPermission.update({
            permission : req.body.permission
        })
        res.status(201).json(newPermission)
    } catch (error){
        res.status(401).json({message : 'Erreur lors de la mise à jour de la permission'})
        console.error('Erreur lors de la mise à jour du permission', error)
    }
})

//Supprimer la direction
router.delete('/delete/:id', async(req, req) => {
    const {id} = req.params;
    try {
        const deletePermission = await Permission.findByPk(id); 
        if (!deletePermission){
            return res.status(404).json({error : 'Permission non trouvé'})
        }
        await deletePermission.destroy()
        res.sendStatus(204)
    }
    catch (error){
        console.error('Erreur lors de la suppréssion du direction:', error)
    }
})

module.exports = router;