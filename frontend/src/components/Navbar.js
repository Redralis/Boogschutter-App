import React, { useState, useEffect, useRef } from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { getUser } from '../ApiServices/GetUser';
import * as BsIcons from 'react-icons/bs'
import '../styles/Navbar.css'



function Navbar() {
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    const closeSidebar = () => setSidebar(!sidebar)
    const [isAdmin, setIsAdmin] = useState(false);

    // Create a ref that we add to the element for which we want to detect outside clicks
    const ref = useRef();
    // State for our modal
    const [isModalOpen, setModalOpen] = useState(false);
    // Call hook passing in the ref and a function to call on outside click
    useOnClickOutside(ref, () => setModalOpen(false))
    function getIsAdmin() {
        getUser(localStorage.getItem('mail')).then(res => {
            setIsAdmin(res.result.isAdmin);
        })
    }
    function useOnClickOutside(ref, handler) {
        useEffect(
            () => {
                const listener = (event) => {
                    // Do nothing if clicking ref's element or descendent elements
                    if (!ref.current || ref.current.contains(event.target)) {
                        return;
                    }
                    handler(event);
                };
                document.addEventListener("mousedown", listener);
                document.addEventListener("touchstart", listener);
                return () => {
                    document.removeEventListener("mousedown", listener);
                    document.removeEventListener("touchstart", listener);
                };
            },
            // Add ref and handler to effect dependencies
            // It's worth noting that because passed in handler is a new ...
            // ... function on every render that will cause this effect ...
            // ... callback/cleanup to run every render. It's not a big deal ...
            // ... but to optimize you can wrap handler in useCallback before ...
            // ... passing it into this hook.
            [ref, handler]
        );
    }
    return (
        <>
            <div className="navbar sticky-top">
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
                {getIsAdmin()}
                {isAdmin && <Link to="/adminpage"><BsIcons.BsFillShieldLockFill className="menu-bars" /></Link>}
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
                                    {item.icon}
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