import { useEffect, useState } from 'react';
import { getLoggedinUser } from '../../helpers/api_helper';
import { fetchProfile } from '../../service/profile';

const useProfile = () => {
    const userProfileSession = getLoggedinUser();
    var token = userProfileSession && userProfileSession['token'];
    const [loading, setLoading] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        setLoading(true);
        const getProfile = async () => {
            try {
                const res = await fetchProfile();
                setUserProfile(res);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };
        getProfile();
    }, []);

    return { token, loading, userProfile };
};

export { useProfile };
