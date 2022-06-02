import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../styles/Navbar.css'

function Navbar() {
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    const closeSidebar = () => setSidebar(!sidebar)
    return (
        <>
            <div className="navbar">
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="navbarList">
                    <li className='navbar-toggle navbarList'>
                        <Link to="#" className='menu-bars'>
                            <AiIcons.AiOutlineClose onClick={closeSidebar} />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}⠀
                                    <span className="navbarItemText">{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}

export default Navbar