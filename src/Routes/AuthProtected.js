import React, { useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { setAuthorization } from '../helpers/api_helper';
import { useProfile } from '../Components/Hooks/UserHooks';
import { useProfileStore } from '../stores/profile';

const AuthProtected = (props) => {
    const { logOutProfile, setProfile } = useProfileStore();

    const { userProfile, loading, token } = useProfile();
    useEffect(() => {
        if (userProfile && !loading && token) {
            setAuthorization(token);
            setProfile(userProfile);
        } else if (!userProfile && loading && !token) {
            logOutProfile();
            // return <Navigate to={{ pathname: '/login', state: { from: props.location } }} />;
        }
    }, [token, userProfile]);

    /*
    Navigate is un-auth access protected routes via url
    */

    // if (!userProfile && loading && !token) {
    //     return <Navigate to={{ pathname: '/login', state: { from: props.location } }} />;
    // }

    return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                return (
                    <>
                        {' '}
                        <Component {...props} />{' '}
                    </>
                );
            }}
        />
    );
};

export { AuthProtected, AccessRoute };
