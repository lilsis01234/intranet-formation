import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import SideBarFormateurExt from '../SideBarFormateurExt/SideBarFormateurExt';
import NavBarFormateurExt from '../NavBarFormateurExt/NavBarFormateurExt'

const MesFormations = () => {
    const[Sugg, setListSuggestion]= useState([]);
    const id = localStorage.getItem('idUser');

    const fetchFormations = () => {
        axios.get(`http://localhost:8000/api/formation/formations/${id}`)
          .then(res => {setListSuggestion(res.data)})
          .catch(err => console.log(err));
    }
      
      useEffect(() => {
        fetchFormations();
      }, [])
      
        return (
            <div className="page">
            <NavBarFormateurExt/>
             <div className="content">
                <SideBarFormateurExt/>
                <div>
                    <div className='collabListes'>
                    <h1 className="collabListes_title font-bold">Vos formations</h1>
                        {Sugg.length !== 0 
                        ?
                        (
                            <>
                            <table className="listDepartementUser_table">
                                {/* <thead>
                                <tr>
                                    <th className="w-40">Thème</th>
                                    <th className="w-60">Description</th>
                                    <th className="w-60">Auteur</th>
                                    <th className="w-60">Departement à former</th>
                                    <th className="w-60">Personne à former</th>
                                    <th className="w-60">Prendre le relai</th>
                                </tr>
                                </thead> */}
                                <tbody>
                                {Sugg.map((formation)=> (
                                <tr key={formation.id}>
                                    <td className="w-40">{formation.theme}</td>
                                    <td className="w-60">{formation.description}</td>
                                    <td className='w-60'>{formation.auteur}</td>
                                {formation.departementAFormer !== null
                                &&
                                ( 
                                <td className='w-60'>demande à former l'équipe {formation.departementAFormer}</td>)
                                }
                                {formation.personneAFormer !== null
                                &&
                                ( 
                                <td className='w-60'>demande à former {formation.personneAFormer}</td>)
                                }
                                <td className='w-60'> <button className="table_item_icon"><Link to= "#">Voir les détails</Link></button></td>
                                </tr>))} 
                                </tbody>
                            </table>
                            </>) 
                            :
                            (
                                <h3>Vous n'avez pas encore organisé de formation</h3>
                            )}
                    </div>
                </div>
            </div>
        </div>
        )
}

export default MesFormations