import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';

const FormationApprouve = () => {

  const[Sugg, setListSuggestion]= useState([]);

    const fetchCollaborateur = () => {
        axios.get('http://127.0.0.1:8000/api/demande_formation/approuveparRrh')
          .then(res => {setListSuggestion(res.data)})
          .catch(err => console.log(err));
      }
      
      useEffect(() => {
        fetchCollaborateur();
      }, [])
        console.log(Sugg)
  return (
      <div className='collabListes'>
      <h1 className="collabListes_title font-bold">Les formations que vous avez approuvées</h1>
          {Sugg.length !== 0 ?(
              <>
              <table className="listDepartementUser_table">
                  <thead>
                  <tr>
                      <th className="w-40">Thème</th>
                      <th className="w-60">Description</th>
                      <th className="w-60">Demandeur</th>
                      <th className="w-60">Approuver</th>
                      {/* <th className="w-60">Accéder au forum</th> */}
                  </tr>
                  </thead>
                  <tbody>
                  {Sugg.map((formation)=> (
                  <tr key={formation.id}>
                      <td className="w-40">{formation.theme}</td>
                      <td className="w-60">{formation.description}</td>
                      <td className='w-60'>{formation.auteur}</td>
                      <td className='w-60'> <button className="table_item_icon">Approuver</button></td>
                  </tr>))}
                  </tbody>
              </table>
              </>) :(
                  <h3>Vous n'avez approuvé aucune formation</h3>
              )}
      </div>
  )
}
export default FormationApprouve