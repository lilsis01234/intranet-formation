import React from 'react'
import { useNavigate } from 'react-router-dom';
import SideBarFormateurExt from '../SideBarFormateurExt/SideBarFormateurExt';
import NavBarFormateurExt from '../NavBarFormateurExt/NavBarFormateurExt'

const HomeFormateur = () => {
    const Navigate = useNavigate()
    const role2 = localStorage.getItem('role2');
    console.log(role2)

    if(!role2==="FormateurExt"){
        Navigate('/')
    }
  return (
    <>
    <NavBarFormateurExt/>
    <div className="content">
        <SideBarFormateurExt/>
        <h1>Bienvenue sur votre plateforme de formation chez Sahaza Group</h1>
    </div>
    </>
  )
}

export default HomeFormateur