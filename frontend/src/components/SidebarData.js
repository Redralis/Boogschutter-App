import React from 'react'
import * as BsIcons from 'react-icons/bs'
import {auth} from "../firebase/firebase";
export const SidebarData = [
    {
        title: '‎ Mededelingen',
        path: '/announcements',
        icon: <BsIcons.BsFillMegaphoneFill />,
        cName: 'nav-text'
    },
    {
        title: '‎ Contacten',
        path: '/contacts',
        icon: <BsIcons.BsFillChatLeftTextFill />,
        cName: 'nav-text'
    },
    {
        title: '‎ Agenda',
        path: '/agenda',
        icon: <BsIcons.BsFillCalendarDateFill />,
        cName: 'nav-text'
    },
    {
        title: '‎ ‎ Documenten en ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ Links',
        path: '/documents',
        icon: <BsIcons.BsFillBookFill />,
        cName: 'nav-text'
    },
    {
        title: '‎ Aantekeningen',
        path: '/aantekeningen',
        icon: <BsIcons.BsFillPencilFill />,
        cName: 'nav-text'
    },
    {
        title: '‎ Profiel',
        path: '/profiel',
        icon: <BsIcons.BsFillPersonFill />,
        cName: 'nav-text'
    },
    {
        title: '‎  Uitloggen ',
        path: '/Login',
        icon: <BsIcons.BsFillDoorOpenFill />,
        cName: 'nav-text',
    },
]
