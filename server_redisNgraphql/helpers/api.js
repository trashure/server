const axios = require('axios'),
    baseURL = 'http://localhost:3000/user';

const register = () => axios.get(baseURL + '/register');
const login = () => axios.get(baseURL + '/login');
const getTrash = () => axios.get(baseURL + '/');
const postTrash = () => axios.get(baseURL + '/');
const deleteTrash = (id) => axios.get(baseURL + '/' + id);

module.exports = {
    register, login,
    getTrash, postTrash, deleteTrash
}