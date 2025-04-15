import React from 'react';
import { Navigate } from 'react-router-dom';
import Apartments from '../pages/Apartments';
import Leads from '../pages/Leads';
import Clients from '../pages/Clients';
import ClientDetail from '../pages/ClientDetail';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Authentication/Login';
import Settings from '../pages/Settings';
import Support from '../pages/Support';
import ProfileSettings from '../pages/Profile/Settings/Settings';
import UserProfile from '../pages/Authentication/user-profile';

const authProtectedRoutes = [
    { path: '/apartments', component: <Apartments /> },
    { path: '/leads', component: <Leads /> },
    { path: '/clients', component: <Clients /> },
    { path: '/clients/:id', component: <ClientDetail /> },
    { path: '/dashboard', component: <Dashboard /> },
    { path: '/settings', component: <Settings /> },
    { path: '/support', component: <Support /> },
    { path: '/profile', component: <UserProfile /> },
    { path: '/profile-settings', component: <ProfileSettings /> },

    {
        path: '/',
        exact: true,
        component: <Navigate to="/dashboard" />,
    },
    { path: '*', component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [{ path: '/login', component: <Login /> }];

export { authProtectedRoutes, publicRoutes };
