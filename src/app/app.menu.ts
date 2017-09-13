import { MenuItem } from '../fw/services/menu.service';

export let initialMenuItems: Array<MenuItem> = [
    {
        text: 'HOW IT WORKS',
        icon: 'glyphicon-dashboard',
        route: '/authenticated/welcome',
        submenu: null
    },
        {
        text: 'ABOUT',
        icon: 'glyphicon-dashboard',
        route: '/authenticated/about',
        submenu: null
    },
        {
        text: 'CONTACT US',
        icon: 'glyphicon-dashboard',
        route: '/authenticated/contactinfo',
        submenu: null
    },

    /* 
     {
         text: 'Countries',
         icon: 'glyphicon-flag',
         route: null,
         submenu: [
             {
                 text: 'Top 3',
                 icon: 'glyphicon-flag',
                 route: 'authenticated/country-list/3',
                 submenu: null
             },
             {
                 text: 'Top 5',
                 icon: 'glyphicon-flag',
                 route: 'authenticated/country-list/5',
                 submenu: null
             },
             {
                 text: 'All',
                 icon: 'glyphicon-flag',
                 route: 'authenticated/country-list/0',
                 submenu: null
             }
         ],
     },
     {
         text: 'Maintenance',
         icon: 'glyphicon-wrench',
         route: null,
         submenu: [
             {
                 text: 'Country Maint',
                 icon: 'glyphicon-th-list',
                 route: 'authenticated/country-maint',
                 submenu: null
             },
             {
                 text: 'Settings',
                 icon: 'glyphicon-cog',
                 route: 'authenticated/settings',
                 submenu: null
             }
         ]
     }*/
];