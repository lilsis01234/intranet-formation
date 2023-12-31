import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBarAdmin from '../../NavBar/NavBarAdmin'
import SideBar from '../../SideBarAdmin/SideBar'
import axios from 'axios'
import '../../../Other_component/Page.css'
import './AjoutCollaborateur.css'
import { Avatar, Input, Select, Option, Alert } from '@material-tailwind/react'
import jwt_decode from "jwt-decode";

const AjoutCollaborateur = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('jwt')

        if (token) {
            const decodedToken = jwt_decode(token)
            console.log(decodedToken)
            if (!decodedToken.exp) {
                localStorage.removeItem('jwt');
                navigate('/')
            }
        }
    }, [navigate])


    const Site = [
        { id: 1, nom: 'Fivoarana' },
        { id: 2, nom: 'Ivohasina' },
        { id: 3, nom: 'Soazaraina' }
    ]

    const Entreprise = [
        { id: 1, nom: 'AdValoremSolution' },
        { id: 2, nom: 'Marketica' },
        { id: 3, nom: 'Progressio' },
    ]

    const StatutMatrimoniale = [
        { id: 1, nom: 'Marié(e)' },
        { id: 2, nom: 'Célibataire' }
    ]



    const [nom, setNom] = useState('');
    const [photo, setPhoto] = useState(null);
    const [prenom, setPrenom] = useState('');
    const [lot, setLot] = useState('');
    const [quartier, setQuartier] = useState('');
    const [ville, setVille] = useState('');

    const [tel, setTelephone] = useState('');
    const [telurgence, setTelUrgence] = useState('');

    const [matricule, setMatricule] = useState('');
    const [dateNaissance, setdateNaissance] = useState('');
    const [lieuNaissance, setLieuNaissance] = useState('');
    const [dateEmbauche, setdateEmbauche] = useState('');

    const [CIN, setCIN] = useState('');
    const [dateDelivrance, setDateDelivrance] = useState('');
    const [lieuDelivrance, setLieuDelivrance] = useState('');

    const [statutmatrimoniale, setStatutMatrimoniale] = useState('');
    const [nbEnfant, setNbEnfant] = useState('');

    const [site, setSite] = useState('');
    const [poste, setPoste] = useState('');
    const [sexe, setSexe] = useState('');
    const [email, setEmail] = useState('');

    const [departement, setDepartement] = useState('');
    const [poste2, setposte2] = useState('');
    const [departement2, setdepartement2] = useState('');

    const [entreprise, setEntreprise] = useState('');
    const [categorie, setCategorie] = useState('');
    const [contrat, setContrat] = useState('');

    // const [numCnaps, setNumCnaps] = useState('');
    // const [Banque, setBanque] = useState('');
    // const [RIB, setRIB] = useState('');

    const [projet, setProjet] = useState('');
    const [projet2, setProjet2] = useState('');

    const Sexe = [
        { id: 1, nom: 'masculin' },
        { id: 2, nom: 'feminin' }
    ]

    //Récupération des listes des Projets
    const [listeProjet, setListeProjet] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/api/projet/all')
            .then(((res) => {
                setListeProjet(res.data)
            }))
            .catch(err => console.log(err))
    }, [])



    //Récupération de la liste des postes
    const [listePoste, setListePoste] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/api/poste/all')
            .then((res) => {
                setListePoste(res.data)

            })
            .catch(err => console.log(err));
    }, [])



    //Récupération de la liste des départements
    const [listeDepartement, setListeDepartement] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/api/departement/all')
            .then((res) => {
                setListeDepartement(res.data)
            })
            .catch(err => console.log(err))
    }, [])



    //pour afficher l'image à la saisi des formulaire
    const [selecteImage, setSelecteImage] = useState(null)

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        setPhoto(selectedFile);
        setSelecteImage(selectedFile);

    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            photo,
            matricule,
            nom,
            prenom,
            dateNaissance,
            lieuNaissance,
            sexe,
            lot,
            quartier,
            ville,
            tel,
            telurgence,
            email,
            CIN,
            dateDelivrance,
            lieuDelivrance,
            statutmatrimoniale,
            nbEnfant,
            poste,
            departement,
            poste2,
            departement2,
            entreprise,
            categorie,
            contrat,
            site,
            dateEmbauche,
            projet,
            projet2
            // numCnaps,
            // Banque,
            // RIB,
        }



        axios.post('http://localhost:4000/api/collaborateur/new', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                console.log(res);
                navigate('/admin/collaborateur/liste');
            }).catch(err => console.log(err));

    }

    return (
        <div className="page">
            <NavBarAdmin />
            <div className="content">
                <SideBar />
                <div className="main-content">
                    <div className=" bg-white w-full rounded-lg">
                        <h1 className="text-center font-bold text-2xl pt-5 ">Ajouter un collaborateur</h1>
                        <form onSubmit={handleSubmit} className="collaborateurAddContent_Form">
                            <div className="flex flex-col  ml-10 pl-10 ">
                                <div className="collaborateurAddContent_Form_Photo">
                                    <label >Photo:</label><br></br>
                                    {selecteImage && (
                                        <Avatar src={URL.createObjectURL(selecteImage)} className="w-32 h-32 rounded-full" />
                                    )}
                                    <input type='file' onChange={handleImageChange} accept="image/*" ></input>
                                </div>
                                <div className="grid grid-cols-12 p-5" >
                                    <div className="col-span-4 m-2"> <Input type="text" label="Matricule" onChange={(e) => { setMatricule(e.target.value) }} size="lg" /></div>
                                    <div className="col-span-4 m-2"> <Input type="text" label="Nom" onChange={(e) => { setNom(e.target.value) }} size="lg" /></div>
                                    <div className="col-span-4 m-2"> <Input type="text" label="Prénom" onChange={(e) => { setPrenom(e.target.value) }} size="lg" /></div>
                                </div>
                                <div className="grid grid-cols-12 p-5">
                                    <div className="col-span-4 m-2"> <Input type="date" label="Date de Naissance" onChange={(e) => { setdateNaissance(e.target.value) }} size="lg" /></div>
                                    <div className="col-span-4 m-2"><Input type="texte" label="Lieu de Naissance" onChange={(e) => { setLieuNaissance(e.target.value) }} size="lg" /></div>
                                    <div className="col-span-4 m-2">
                                        <Select label="Sexe" onChange={(e) => setSexe(e)}>
                                            {Sexe.map((sexeitem) => (
                                                <Option key={sexeitem.id} value={sexeitem.nom}>
                                                    {sexeitem.nom}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 p-5">
                                    <div className="col-span-4 m-2"> <Input type="text" label="Lot" onChange={(e) => { setLot(e.target.value) }} size="lg" /></div>
                                    <div className="col-span-4 m-2"> <Input type="text" label="Quartier" onChange={(e) => { setQuartier(e.target.value) }} size="lg" /></div>
                                    <div className="col-span-4 m-2"> <Input type="text" label="Ville" onChange={(e) => { setVille(e.target.value) }} size="lg" /></div>
                                </div>
                                <div className="grid grid-cols-12 p-5">
                                    <div className="col-span-4 m-2"> <Input type="text" label="Téléphone" onChange={(e) => { setTelephone(e.target.value) }} size="lg" /></div>
                                    <div className="col-span-4 m-2"> <Input type="text" label="Téléphone d'urgence" onChange={(e) => { setTelUrgence(e.target.value) }} size="lg" /></div>
                                    <div className="col-span-4 m-2"> <Input type="text" label="Email" onChange={(e) => { setEmail(e.target.value) }} size="lg" /></div>
                                </div>
                                <div className="grid grid-cols-12 p-5">
                                    <div className="col-span-4 m-2"> <Input type="text" label="CIN" onChange={(e) => { setCIN(e.target.value) }} size="lg" /></div>
                                    <div className="col-span-4 m-2"> <Input type="text" label="Date de délivrance" onChange={(e) => { setDateDelivrance(e.target.value) }} size="lg" /></div>
                                    <div className="col-span-4 m-2"> <Input type="text" label="Lieu de délivrance" onChange={(e) => { setLieuDelivrance(e.target.value) }} size="lg" /></div>
                                </div>
                                <div className="grid grid-cols-12 p-5">
                                    <div className="col-span-4 m-2">
                                        <Select label="Statut Matrimoniale" onChange={(e) => setStatutMatrimoniale(e)}>
                                            {StatutMatrimoniale.map((statumatrimoniale) => (
                                                <Option key={statumatrimoniale.id} value={statumatrimoniale.id.toString()}>
                                                    {statumatrimoniale.nom}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="col-span-4 m-2"> <Input type="number" label="Nombre d'enfant" onChange={(e) => { setNbEnfant(e.target.value) }} size="lg" /></div>
                                </div>
                                <div className="grid grid-cols-12 p-5">
                                    <div className="col-span-4 m-2"> <Input type="date" label="Date d'embauche" onChange={(e) => { setdateEmbauche(e.target.value) }} size="lg" /></div>
                                    <div className="col-span-4 m-2">
                                        <Select label="Site" onChange={(e) => setSite(e)}>
                                            {Site.map((site) => (
                                                <Option key={site.id} value={site.nom}>
                                                    {site.nom}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="col-span-4 m-2">
                                        <Select label="Entreprise" onChange={(e) => setEntreprise(e)}>
                                            {Entreprise.map((entreprise) => (
                                                <Option key={entreprise.id} value={entreprise.nom}>
                                                    {entreprise.nom}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 p-5">
                                    <div className="col-span-4 m-2">
                                        <Select label="Poste" onChange={(e) => setPoste(e)}>
                                            {listePoste.map((poste) => (
                                                <Option key={poste.id} value={poste.id.toString()}>
                                                    {poste.titrePoste}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="col-span-4 m-2">
                                        <Select label="Département" onChange={(e) => setDepartement(e)}>
                                            {listeDepartement.map((departement) => (
                                                <Option key={departement.id} value={departement.id.toString()}>
                                                    {departement.nomDepartement}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="col-span-4 m-2">
                                        <Select label="Projet" onChange={(e) => setProjet(e)}>
                                            {listeProjet.map((projet) => (
                                                <Option key={projet.id} value={projet.id.toString()}>
                                                    {projet.nomProjet}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 p-5">
                                    <div className="col-span-4 m-2"> <Input type="text" label="Catégorie" onChange={(e) => { setCategorie(e.target.value) }} size="lg" /></div>
                                    <div className="col-span-4 m-2"> <Input type="text" label="Contrat" onChange={(e) => { setContrat(e.target.value) }} size="lg" /></div>
                                </div>
                                <div>
                                    <Alert color="amber" className="text-xs">Les informations suivantes sont à compléter au cas où le collaborateur possède une deuxième poste.</Alert>
                                    <div className="grid grid-cols-12 p-5">
                                        <div className="col-span-4 m-2">
                                            <Select label="Deuxième poste" onChange={(e) => setposte2(e)}>
                                                {listePoste.map((poste) => (
                                                    <Option key={poste.id} value={poste.id.toString()}>
                                                        {poste.titrePoste}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                        <div className="col-span-4 m-2">
                                            <Select label="Département" onChange={(e) => setdepartement2(e)}>
                                                {listeDepartement.map((departement) => (
                                                    <Option key={departement.id} value={departement.id.toString()}>
                                                        {departement.nomDepartement}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                        <div className="col-span-4 m-2">
                                            <Select label="Projet" onChange={(e) => setProjet2(e)}>
                                                {listeProjet.map((projet) => (
                                                    <Option key={projet.id} value={projet.id.toString()}>
                                                        {projet.nomProjet}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                                <button type='submit' className="collaborateurAddContent_Form_Button">Ajouter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AjoutCollaborateur
