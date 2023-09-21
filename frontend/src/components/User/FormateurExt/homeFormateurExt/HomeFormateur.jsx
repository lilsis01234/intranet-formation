import React from 'react'
import { useNavigate } from 'react-router-dom';
import SideBarFormateurExt from '../SideBarFormateurExt/SideBarFormateurExt';
import NavBarFormateurExt from '../NavBarFormateurExt/NavBarFormateurExt'
import FormationsSuggestion from '../FormationsSuggestion/FormationsSuggestion';
const HomeFormateur = () => {
    const Navigate = useNavigate()
    const role2 = localStorage.getItem('role2');
    console.log(role2)

    if(!role2.toLowerCase==="formateurExt"){
        Navigate('/')
    }
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