import { Typography, Button} from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdEdit } from 'react-icons/md';
import Modal from 'react-modal';
import AjoutProjet from '../AjoutProjet/AjoutProjet';
import ModifierProjet from '../ModifierProjet/ModifierProjet';
Modal.setAppElement('#root');

const ListeProjet = () => {
    const [listeProjet, setlListProjet] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProjet, setFilteredProjet] = useState([]);

    //Pour la pagination
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 15;

    const fetchProjet = () => {
        axios.get("http://localhost:4000/api/projet/all")
            .then((response) => {
                setlListProjet(response.data)
            })
            .catch((err) => {
                console.error('Erreur lors de la récupération des données', err)
            })
    }

    console.log(listeProjet)

    useEffect(() => {
        fetchProjet()
    }, [])

    //Pagination
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage;
        setFilteredProjet(listeProjet.slice(startIndex, endIndex))
    }, [listeProjet, currentPage])

    //Pour le recherche
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSearch = () => {
        const filteredProjet = listeProjet.filter((projet) => {
            return (
                (projet.nomProjet.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (projet.TestDepartement?.nomDepartement.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        })
        setFilteredProjet(filteredProjet)
        setCurrentPage(1);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

      //Calculer le nombre total de pages 
      const totalPages = Math.ceil(listeProjet.length / itemsPerPage);

      //Pour le formulaire d'ajout
      const [isAddModalOpen, setisAddModalOpen] = useState(false);
      const openAddModal = () => {
        setisAddModalOpen(true)
      }
      const closeAddModal = () => {
        setisAddModalOpen(false)
      }

      const handleAddProjet = () => {
        fetchProjet()
      }

      //Pour le formulaire de modification
      const [projetToEdit, setProjetToEdit] = useState(null)
      const [isModalEditOpen, setIsModalEditOpen] = useState(false)
      
      const openEditModal = () => {
        setIsModalEditOpen(true)
      }

      const closeEditModal = () => {
        setIsModalEditOpen(false)
      }

      const EditProjet = (projetId) => {
        const selectedProjet = listeProjet.find((projet) => projet.id === projetId)
        setProjetToEdit(selectedProjet)
      }

      const handleProjetUpdate = () => {
        setProjetToEdit(null)
        fetchProjet()
      }


    return (
        <>
            <div className='flex flex-col items-center w-full font-[Poppins]'>
                <Typography variant="h2" className="p-5">Liste des équipes</Typography>
                <div className="search_form">
                    <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Rechercher une équipe" />
                    {searchTerm && (
                        <button className="search_clearButton" onClick={() => setSearchTerm('')}>X</button>
                    )}
                    <button className="search_Button mx-5" onClick={handleSearch} >Rechercher </button>
                    <Button variant="filled" onClick={openAddModal}>Ajouter une équipe</Button> 
                </div>
                <table className="m-10 p-5 w-full">
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Projet</th>
                            <th>Département</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchTerm === '' ? (listeProjet.map((projet) => (
                            <tr key={projet.id}>
                                <td>{projet.id}</td>
                                <td>{projet.nomProjet}</td>
                                <td>{projet.TestDepartement?.nomDepartement}</td>
                                <td>
                                    <button onClick={() => {EditProjet(projet.id); openEditModal()}}><MdEdit /></button>
                                </td>
                            </tr>
                        ))) : (
                            filteredProjet.map((projet) => (
                                <tr key={projet.id}>
                                    <td>{projet.id}</td>
                                    <td>{projet.nomProjet}</td>
                                    <td>{projet.TestDepartement?.nomDepartement}</td>
                                    <td>
                                        <button onClick={() => {EditProjet(projet.id); openEditModal()}}><MdEdit /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="list_pagination">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button
                            key={page}
                            className={page === currentPage ? "active" : ""}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <Modal
                    isOpen = {isAddModalOpen}
                    onRequestClose={closeAddModal}
                    style = {
                        {
                            content : {
                                width : '400px',
                                height : '380px',
                                borderRaduis : '10px',
                                margin: 'auto',
                                top : '0',
                                bottom: '0',
                                left: '0',
                                right: '0',
                                
                            }
                        }
                    }
                >
                    <AjoutProjet onProjetAdded={handleAddProjet}/>
                    <button className="my-5" onClick={closeAddModal}>Retourner à la liste des équipes</button>
                </Modal>
            </div>
            <div>
                <Modal
                    isOpen = {isModalEditOpen}
                    onRequestClose={closeEditModal}
                    style = {
                        {
                            content : {
                                width : '400px',
                                height : '380px',
                                borderRaduis : '10px',
                                margin: 'auto',
                                top : '0',
                                bottom: '0',
                                left: '0',
                                right: '0',
                                
                            }
                        }
                    }
                >
                    <ModifierProjet projetToEdit={projetToEdit} onUpdateProjet={handleProjetUpdate}/>
                    <button className="my-5" onClick={closeAddModal}>Retourner à la liste des équipes</button>
                </Modal>
            </div>
        </>
    )
}

export default ListeProjet
