import axios from 'axios';

// default
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// content type
axios.defaults.headers.post['Content-Type'] = 'application/json';

// content type
const token = sessionStorage.getItem('authUser') ?? null;
if (token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
// intercepting to capture errors
axios.interceptors.response.use(
    function (response) {
        return response.data ? response.data : response;
    },
    function (error) {
        if (error) {
            console.log({ status: error.response?.status });

            if (error.response?.status === 401) {
                sessionStorage.clear();
                window.location.href = '/login';
            }
            throw error.response.data;
        }
    }
);

const setAuthorization = (token) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

class APIClient {
    get = (url, params) => {
        let response;

        let paramKeys = [];

        if (params) {
            Object.keys(params).map((key) => {
                paramKeys.push(key + '=' + params[key]);
                return paramKeys;
            });

            const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : '';
            response = axios.get(`${url}?${queryString}`, params);
        } else {
            response = axios.get(`${url}`, params);
        }

        return response;
    };
    /**
     * post given data to url
     */
    create = (url, data) => {
        return axios.post(url, data);
    };
    /**
     * Updates data
     */
    update = (url, data) => {
        return axios.patch(url, data);
    };

    put = (url, data) => {
        console.log({ url, dataApi: data });

        return axios.put(url, data);
    };
    /**
     * Delete
     */
    delete = (url, config) => {
        return axios.delete(url, { ...config });
    };
}
const getLoggedinUser = () => {
    const token = sessionStorage.getItem('authUser');
    if (!token) {
        return null;
    } else {
        return { token };
    }
};

export { APIClient, setAuthorization, getLoggedinUser };
