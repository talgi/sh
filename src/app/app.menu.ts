import { MenuItem } from '../fw/services/menu.service';

export let initialMenuItems: Array<MenuItem> = [
    {
        text: 'HOME',
        icon: 'glyphicon-dashboard',
        route: '/welcome',
        submenu: null
    },
        {
        text: 'ABOUT',
        icon: 'glyphicon-dashboard',
        route: '/about',
        submenu: null
    },
        {
        text: 'CONTACT US',
        icon: 'glyphicon-dashboard',
        href: 'mailto:alonig@gmail.com',
        submenu: null
    }
];