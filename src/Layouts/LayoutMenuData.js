import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navdata = () => {
    const history = useNavigate();
    //state data
    const [isDashboard, setIsDashboard] = useState(false);

    const [iscurrentState, setIscurrentState] = useState('Dashboard');

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

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState !== 'Dashboard') {
            setIsCatalogues(false);
        }
    }, [history, iscurrentState, isDashboard]);

    const menuItems = [
        {
            label: 'MAIN',
            isHeader: true,
        },
        {
            id: 'dashboard',
            label: 'Dashboards',
            icon: 'ri-dashboard-2-line',
            link: '/#',
            stateVariables: isDashboard,
            click: function (e) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState('Dashboard');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: 'crm',
                    label: 'CRM',
                    link: '/crm',
                    parentId: 'dashboard',
                },
            ],
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
