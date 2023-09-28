import React from 'react'
import NavBarAdmin from '../NavBar/NavBarAdmin'
import SideBar from '../SideBarAdmin/SideBar'
import ListeProjet from './ListeProjet/ListeProjet'


const Projet = () => {
  return (
    <div className='page'>
      <NavBarAdmin/>
      <div className='content'>
        <SideBar/>
        <div className='main-content'>
            <div className='flex flex-col content-center w-full rounded-lg'>
               <ListeProjet/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Projet
