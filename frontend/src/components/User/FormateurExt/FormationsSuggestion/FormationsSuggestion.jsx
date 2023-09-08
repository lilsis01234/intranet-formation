import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

const FormationsSuggestion = () => {
    const[Sugg, setListSuggestion]= useState([]);

    const fetchFormations = () => {
        axios.get('http://localhost:8000/api/demande_formation/all_confirmed_formations')
          .then(res => {setListSuggestion(res.data)})
          .catch(err => console.log(err));
      }
      
      useEffect(() => {
        fetchFormations();
      }, [])
        console.log(Sugg)
        return (
            <div className='collabListes'>
            <h1 className="collabListes_title font-bold">Vos demandes de formations</h1>
                {Sugg.length !== 0 
                ?
                (
                    <>
                    <table className="listDepartementUser_table">
                        <thead>
                        <tr>
                            <th className="w-40">Thème</th>
                            <th className="w-60">Description</th>
                            <th className="w-60">Demandeur</th>
                            <th className="w-60">Departement à former</th>
                            <th className="w-60">Personne à former</th>
                            <th className="w-60">Prendre le relai</th>

                            {/* <th className="w-60">Accéder au forum</th> */}
                        </tr>
                        </thead>
                        <tbody>
                        {Sugg.map((formation)=> (
                        <tr key={formation.id}>
                            <td className="w-40">{formation.theme}</td>
                            <td className="w-60">{formation.description}</td>
                            <td className='w-60'>{formation.auteur}</td>
                           {formation.departementAFormer !== null
                           ? 
                           ( 
                           <td className='w-60'>{formation.departementAFormer}</td>)
                           : 
                           (<td className='w-60'>Tous</td>)
                           }

                           {formation.personneAFormer !== null
                           ? 
                           ( 
                           <td className='w-60'>{formation.personneAFormer}</td>)
                           : 
                           (<td className='w-60'>Pas de spécification</td>)
                           }
                            <td className='w-60'> <button className="table_item_icon"><Link to= "#">Organiser cette formation</Link></button></td>
                        </tr>))}
                        </tbody>
                    </table>
                    </>) 
                    :
                    (
                        <h3>Aucune demande de formation pour le moment</h3>
                    )}
            </div>
        )
}

export default FormationsSuggestion