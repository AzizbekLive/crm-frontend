import React from 'react';
import { Navigate } from 'react-router-dom';

// Main
import Apartments from '../pages/Apartments';
import Leads from '../pages/Leads';
import Clients from '../pages/Clients';

// Dashboard
import Crm from '../pages/Dashboard/Crm';

// Login
import Login from '../pages/Authentication/Login';

// Others
import Settings from '../pages/Settings';
import Support from '../pages/Support';

// User Profile
import ProfileSettings from '../pages/Profile/Settings/Settings';
import UserProfile from '../pages/Authentication/user-profile';

const authProtectedRoutes = [
    // Main
    { path: '/apartments', component: <Apartments /> },
    { path: '/leads', component: <Leads /> },
    { path: '/clients', component: <Clients /> },

    // Dashboard
    { path: '/crm', component: <Crm /> },
    // Others
    { path: '/settings', component: <Settings /> },
    { path: '/support', component: <Support /> },

    // User Profile
    { path: '/profile', component: <UserProfile /> },
    { path: '/profile-settings', component: <ProfileSettings /> },

    {
        path: '/',
        exact: true,
        component: <Navigate to="/crm" />,
    },
    { path: '*', component: <Navigate to="/crm" /> },
];

const publicRoutes = [
    // Authentication Page
    { path: '/login', component: <Login /> },
];

export { authProtectedRoutes, publicRoutes };
