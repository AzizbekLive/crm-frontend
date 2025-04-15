import React from 'react';

const Navdata = () => {
    //state data

    function updateIconSidebar(e) {
        if (e && e.target && e.target.getAttribute('subitems')) {
            const ul = document.getElementById('two-column-menu');
            const iconItems = ul.querySelectorAll('.nav-icon.active');
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove('active');
                var id = item.getAttribute('subitems');
                if (document.getElementById(id)) document.getElementById(id).classList.remove('show');
            });
        }
    }

    const menuItems = [
        {
            label: 'MAIN',
            isHeader: true,
        },
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: 'ri-dashboard-2-line',
            link: '/dashboard',
            click: function (e) {
                e.preventDefault();
                updateIconSidebar(e);
            },
        },
        {
            id: 'leads',
            label: 'Leads',
            icon: 'ri-group-line',
            link: '/leads',
            click: function (e) {
                e.preventDefault();
                updateIconSidebar(e);
            },
        },
        {
            id: 'apartments',
            label: 'Apartments',
            icon: 'ri-building-2-line',
            link: '/apartments',
            click: function (e) {
                e.preventDefault();
                updateIconSidebar(e);
            },
        },
        {
            id: 'clients',
            label: 'Clients',
            icon: 'ri-user-follow-line',
            link: '/clients',
            click: function (e) {
                e.preventDefault();
                updateIconSidebar(e);
            },
        },
        {
            label: 'OTHERS',
            isHeader: true,
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: 'ri-settings-3-line',
            link: '/settings',
            click: function (e) {
                e.preventDefault();
                updateIconSidebar(e);
            },
        },
        {
            id: 'support',
            label: 'Support',
            icon: 'ri-headphone-line',
            link: '/support',
            click: function (e) {
                e.preventDefault();
                updateIconSidebar(e);
            },
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
