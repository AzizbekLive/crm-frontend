import React from 'react';
import { Navigate } from 'react-router-dom';
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Apartments = React.lazy(() => import('../pages/Apartments'));
const ApartmentDetails = React.lazy(() => import('../pages/Apartments/View'));
const Leads = React.lazy(() => import('../pages/Leads'));
const Clients = React.lazy(() => import('../pages/Clients'));
const ClientDetail = React.lazy(() => import('../pages/Clients/View'));
const Contract = React.lazy(() => import('../pages/Contract'));
const Login = React.lazy(() => import('../pages/Authentication/Login'));
const Settings = React.lazy(() => import('../pages/Settings'));
const Support = React.lazy(() => import('../pages/Support'));
const ProfileSettings = React.lazy(() => import('../pages/Profile/Settings/Settings'));
const UserProfile = React.lazy(() => import('../pages/Authentication/user-profile'));

const authProtectedRoutes = [
    { path: '/apartments', component: <Apartments /> },
    { path: '/apartments/:id', component: <ApartmentDetails /> },
    { path: '/leads', component: <Leads /> },
    { path: '/clients', component: <Clients /> },
    { path: '/clients/:id', component: <ClientDetail /> },
    { path: '/dashboard', component: <Dashboard /> },
    { path: '/settings', component: <Settings /> },
    { path: '/support', component: <Support /> },
    { path: '/profile', component: <UserProfile /> },
    { path: '/profile-settings', component: <ProfileSettings /> },
    { path: '/contract/:apartmentId', component: <Contract /> },

    {
        path: '/',
        exact: true,
        component: <Navigate to="/dashboard" />,
    },
    { path: '*', component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [{ path: '/login', component: <Login /> }];

export { authProtectedRoutes, publicRoutes };
