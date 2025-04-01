import { useEffect, useState } from 'react';
import { getLoggedinUser } from '../../helpers/api_helper';
import { useProfileStore } from '../../stores/profile';

const useProfile = () => {
    const { setToken, setProfile } = useProfileStore();

    const userProfileSession = getLoggedinUser();
    var token = userProfileSession && userProfileSession['token'];
    const [loading, setLoading] = useState(userProfileSession ? false : true);
    const [userProfile, setUserProfile] = useState(userProfileSession ? userProfileSession : null);

    useEffect(() => {
        const userProfileSession = getLoggedinUser();
        var token = userProfileSession && userProfileSession['token'];
        setUserProfile(userProfileSession ? userProfileSession : null);
        setLoading(token ? false : true);

        setToken(token);
        setProfile(userProfileSession);
    }, []);

    return { userProfile, loading, token };
};

export { useProfile };
