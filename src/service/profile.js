import { APIClient } from '../helpers/api_helper';
import { USER_ENDPOINT } from '../helpers/url_helper';

const api = new APIClient();
export const fetchProfile = async () => {
    return api
        .get(USER_ENDPOINT)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};
