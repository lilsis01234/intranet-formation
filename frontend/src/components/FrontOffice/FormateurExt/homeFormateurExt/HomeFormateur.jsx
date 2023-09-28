import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import SideBarFormateurExt from '../SideBarFormateurExt/SideBarFormateurExt';
import NavBarFormateurExt from '../NavBarFormateurExt/NavBarFormateurExt'
import FormationsSuggestion from '../FormationsSuggestion/FormationsSuggestion';
import MesFormations from '../MesFormations/MesFormations';

const HomeFormateur = () => {
    const navigate = useNavigate()
    const role2 = localStorage.getItem('role2');
    const [listevisible,setVisible] = useState(false)

    console.log(role2)

    useEffect(() => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        navigate('/');
      }
  
      const role2 = localStorage.getItem('role2');
      if (!(role2.toLowerCase() === 'formateurext')) {
        navigate('/');
      }
    }, [navigate]);

  return (
    <>
    <div className="page">
    <NavBarFormateurExt/>
     <div className="content">
        <SideBarFormateurExt/>
        <div>
        <div className='collabListes'>
        <button className="visible" onClick={() => setVisible(!listevisible)}>
        <h1>{listevisible ? 
        'Voir vos formations'
         :
        'Voir vos demandes de formations'}</h1>
        </button>

        {listevisible ?
        <FormationsSuggestion/>
        :
        <MesFormations/>}

        </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default HomeFormateur