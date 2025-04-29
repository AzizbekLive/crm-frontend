import { useEffect, useState } from 'react';
import { getLoggedinUser } from '../../helpers/api_helper';
import { getService } from '../../service';
import { USER_ENDPOINT } from '../../helpers/url_helper';

const useProfile = () => {
    const userProfileSession = getLoggedinUser();
    var token = userProfileSession && userProfileSession['token'];
    const [loading, setLoading] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        setLoading(true);
        const getProfile = async () => {
            try {
                const res = await getService(USER_ENDPOINT);
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
