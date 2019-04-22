const axios = require('axios'),
    baseURL = 'http://35.237.249.100';

const register = (body) => axios.post(baseURL + '/user/register', body);
const login = (body) => axios.post(baseURL + '/user/login', body);
const getTrash = (token) => axios.get(baseURL + '/', {headers : {Token : token }});
const postTrash = (token, body) => axios.post(baseURL + '/', body, {headers : {Token : token }});
const deleteTrash = (id, token) => axios.delete(baseURL + '/' + id, {headers : {Token : token }});

module.exports = {
    register, login,
    getTrash, postTrash, deleteTrash
}