import React from 'react'
import * as BsIcons from 'react-icons/bs'

export const SidebarData = [
    {
        title: 'Contacten',
        path: '/contacts',
        icon: <BsIcons.BsFillChatLeftTextFill />,
        cName: 'nav-text'
    },
    {
        title: 'Agenda',
        path: '/agenda',
        icon: <BsIcons.BsFillCalendarDateFill />,
        cName: 'nav-text'
    },
    {
        title: 'Documenten en Links',
        path: '/documents',
        icon: <BsIcons.BsFillBookFill />,
        cName: 'nav-text'
    }
]