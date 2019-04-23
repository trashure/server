const axios = require('axios'),
    baseURL = 'http://35.237.249.100';
    // baseURL = 'http://localhost:3000';

const register = (body) => axios.post(baseURL + '/user/register', body);
const login = (body) => axios.post(baseURL + '/user/login', body);
const getTrash = (token) => axios.get(baseURL + '/', { headers: { Token: token } });
const getCollection = (token) => axios.get(baseURL + '/collection', { headers: { Token: token } });
const postTrash = (token, body) => axios.post(baseURL + '/', body, { headers: { Token: token } });
const deleteTrash = (id, token) => axios.delete(baseURL + '/' + id, { headers: { Token: token } });

const iot = (path) => axios.post(baseURL + '/iot', { path });

module.exports = {
    register, login,
    getTrash, postTrash, deleteTrash, getCollection,
    iot
}