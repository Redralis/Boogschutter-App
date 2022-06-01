import React from 'react'
import * as BsIcons from 'react-icons/bs'

export const SidebarData = [
    {
        title: 'Chats',
        path: '/chats',
        icon: <BsIcons.BsFillChatLeftTextFill />,
        cName: 'nav-text'
    },
    {
        title: 'Test1',
        path: '/',
        icon: <BsIcons.BsAlarm />,
        cName: 'nav-text'
    },
    {
        title: 'Test2',
        path: '/',
        icon: <BsIcons.BsSnapchat />,
        cName: 'nav-text'
    }
]