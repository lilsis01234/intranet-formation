import React, { useState } from 'react'
import SideBar from '../../../Administrateur/SideBarAdmin/SideBar'
import NavBarAdmin from '../../../Administrateur/NavBar/NavBarAdmin'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ListeFormationAdmin from '../listeFormationsAdmin/listeFormationsAdmin'
import './demandeFormation.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const DemandeFormation = () => {
  const navigate = useNavigate();
  const [listevisible,setVisible] = useState(false);
  
  useEffect(() => {
    // const token = Cookies.get('jwt');
    const token = localStorage.getItem('jwt');
    if (!token){
        navigate('/');
    }

    const role = localStorage.getItem('role'); 
    if (!(role === "Administrateur")){
        navigate('/home');
    }
    }, [navigate])
    


const Demandes = ()=>{
  const idrole = localStorage.getItem('idrole');
  console.log(idrole);

  const[demandeFormation,setDemandeFormation] = useState([]);

  const fetchCollaborateur = () => {
    axios.get(`http://localhost:8000/api/demande_formation/all_demandes_formations/${idrole}`)
      .then(res => {setDemandeFormation(res.data)
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchCollaborateur();
  }, [idrole])
  

  const handleApprove = (formationId) => {
    axios.post(`http://localhost:8000/api/demandeformation/approuver/${formationId}`)
        .then(response => {
            console.log(response.data); // Message de succès ou d'erreur
            // Effectuer des actions supplémentaires si nécessaire
            fetchCollaborateur();
            console.log(demandeFormation)
        })
        .catch(error => {
            console.error("Error:", error);
        });
  };

  const handleDesapprove = (formationId) => {
    axios.delete(`http://localhost:8000/api/demandeformation/desapprouver/${formationId}`)
        .then(response => {
            console.log(response.data); // Message de succès ou d'erreur
            // Effectuer des actions supplémentaires si nécessaire
            fetchCollaborateur();
            console.log(demandeFormation)
        })
        .catch(error => {
            console.error("Error:", error);
        });
  };


  const [recherche,setRecherche] = useState(null);
  return (
    <>
    <center>
    <div className='content'>
      <div className='collabListes'>
        <h1 className="collabListes_title font-bold">Liste des demandes de formations</h1>
          <div className="collabListes_Item">
            <div className="search_form">
            <input type='text' placeholder='rechercher ici' onChange={(e) => {
              setRecherche(e.target.value);
            }}
          onKeyUp={(e) => {
               if (e.key === "Enter") {
                e.target.focus(); // Maintenir le focus sur l'input après avoir appuyé sur "Enter"
              }}}/>
            </div>
          </div>
      </div>
    </div>
    </center>

    {demandeFormation.length !== 0 ? (
      <table className="listDepartementUser_table">
          <thead>
              <tr>
                  <th className="w-40">Thème</th>
                  <th className="w-60">Description</th>
                  <th className="w-60">Organisateur(trice)</th>
                  <th className="w-60">Voir plus</th>
                  <th className="w-60">Approuver</th>
                  <th className="w-60">Supprimer</th>
              </tr>
          </thead>
          <tbody>
              {recherche === '' || recherche === null ? (demandeFormation.map((formation)=> (
              <tr key={formation.id}>
                  <td >{formation.theme}</td>
                  <td >{formation.description}</td>
                  <td >{formation.nomformateur} {formation.prenomformateur}</td>

                  <td ><button className="table_item_icon"><Link to= {`/admin/formation/${formation.id}`}>Voir plus</Link></button></td>
                  <td >
                    <button className="table_item_icon" onClick={() => handleApprove(formation.id)}>Approuver</button>
                  </td>
                  <td >
                    {/* lien '/delete id' */}
                    <button className="table_item_icon" onClick={() => handleDesapprove(formation.id)}>Supprimer</button>
                  </td>
              </tr>
              ))) : (

              demandeFormation.filter((formations)=>formations.theme.toLowerCase().includes(recherche.toLowerCase())||formations.description.toLowerCase().includes(recherche.toLowerCase()) ).map((formation) => (
              <tr key={formation.id}>
                  <td >{formation.theme}</td>
                  <td >{formation.description}</td>
                  <td >{formation.nomformateur} {formation.prenomformateur}</td>
                  {/* lien formation/idFormation voir plus */}
                  <td><button className="table_item_icon"><Link to= {`/admin/formation/${formation.id}`}>Voir plus</Link></button></td>
                  <td >
                    <button className="table_item_icon" onClick={() => handleApprove(formation.id)}>Approuver</button>
                  </td>
                  <td >
                    {/* lien '/delete id' */}
                    <button className="table_item_icon" onClick={() => handleDesapprove(formation.id)}>Supprimer</button>
                  </td>
              </tr>
              ))
              )}
          </tbody>
      </table>):
    (
      <h3>Aucune demande de formation pour le moment</h3>
    ) 
    }
    </>
  )
}

  return (
    <div className='page'>
      <NavBarAdmin />
        <div className='content'>
          <SideBar/>
            <div>
              <div className="collabListes">
                <button className="visible" onClick={() => setVisible(!listevisible)}>
                <h1>{listevisible ? 'Voir les demandes de formations' : 'Voir les formations disponibles'}</h1>
                </button>
                {listevisible ? <ListeFormationAdmin /> : <Demandes />}
              </div>
            </div>
        </div>
    </div>
  )
}

export default DemandeFormation