import { APIClient } from '../helpers/api_helper';

const api = new APIClient();

export const getService = async (url, params) => {
    return api
        .get(url, params)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};
export const postService = async (url, params) => {
    return api
        .create(url, params)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};
export const updateService = async (url, data) => {
    console.log({ url, data });

    return api
        .put(url, data)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};
export const deleteService = async (url, id) => {
    return api
        .delete(url, { id })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};
