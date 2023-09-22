import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import SideBarFormateurExt from '../SideBarFormateurExt/SideBarFormateurExt';
import NavBarFormateurExt from '../NavBarFormateurExt/NavBarFormateurExt'
import FormationsSuggestion from '../FormationsSuggestion/FormationsSuggestion';
const HomeFormateur = () => {
    const navigate = useNavigate()
    const role2 = localStorage.getItem('role2');
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
        <FormationsSuggestion/>
        </div>
    </div>
    </div>
    </>
  )
}

export default HomeFormateur