import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Input, Select, Typography, Option} from '@material-tailwind/react';

const ModifierProjet = ({projetToEdit, onUpdateProjet}) => {
    const [nomProjet, setNomProjet] = useState(projetToEdit?.nomProjet || '')
    const [departement, setDepartement] = useState(projetToEdit?.departement || '')

    const [listeDepartement, setListeDeparetment] = useState([]);

    //Récupérer les listes des directions
    useEffect(() => {
        axios.get('http://localhost:4000/api/departement/all')
            .then((response) => {
                setListeDeparetment(response.data)
            })
            .catch((error) => {
                alert('Erreur lors de la récupération des données')
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            nomProjet,
            departement,
        }

        axios.put(`http://localhost:4000/api/projet/edit/${projetToEdit.id}`, formData)
            .then((response) => {
                alert('Projet modifié avec succés')
                onUpdateProjet()
            })
            .catch((error) => {
                console.error(error)
                alert("Erreur lors de la modification de l'équipe")
            })
    }


    return (
        <div>
            <Typography variant="h3">Modifier une équipe</Typography>
            <form className='w-full' onSubmit={handleSubmit}>
                <div>
                    <Input type="text" label="Projet" onChange={(e) => setNomProjet(e.target.value)} />
                </div>
                <div>
                    <Select label="Département" onChange={(e) => setDepartement(e)}>
                        {listeDepartement && listeDepartement.map((departement) => (
                            <Option key={departement.id} value={departement.id.toString()}>
                                {departement.nomDepartement}
                            </Option>
                        ))}
                    </Select>
                </div>
                <button type='submit' className='flex flex-col self-center'>Ajouter</button>
            </form>
        </div>
    )
}

export default ModifierProjet
