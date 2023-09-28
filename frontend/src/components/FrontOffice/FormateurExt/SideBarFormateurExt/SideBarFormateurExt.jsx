import React, { useState } from 'react'
import {HiOutlineHome} from 'react-icons/hi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdClose} from 'react-icons/io'
import { Link } from 'react-router-dom';

const SideBarFormateurExt = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toogleSideBar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    return (
        <div className="sideBar_container">
        {isSidebarOpen && (
            <div className={`sideBar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <ul className="sideBar_menu">
                    <li className="sideBar_menu_item " ><Link className="flex flex-row items-center" to="#"><HiOutlineHome className="mr-2"/>Acceuil</Link></li>
                    <li className="sideBar_menu_item " ><Link className="flex flex-row items-center" to="/formateurExt"><HiOutlineHome className="mr-2"/>Formations</Link></li>
                    {/* <li className="sideBar_menu_item " ><Link className="flex flex-row items-center" to="/mesFormations"><HiOutlineHome className="mr-2"/>Vos formations</Link></li> */}
                </ul>
            </div>
        )}
        <button onClick={toogleSideBar} className="sideBar_button">
                {isSidebarOpen ? <IoMdClose/> : <GiHamburgerMenu />}
        </button>
    </div>
    )
    }
export default SideBarFormateurExt