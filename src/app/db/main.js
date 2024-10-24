const axios = require('axios');
// const api = 'http://localhost:5000';
const api = 'https://eleanor-website-back-end.vercel.app';
export const getData = () => {
    axios.get(`${api}/users`)
        .then(response => {
            // Handle the response data
            console.log(response.data[0]);
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
}
export const loginUser = async (name, pass) => {

    try {
        const response = await axios.post(`${api}/login`, { name, pass });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data.message);
        } else {
            console.log('An error occurred. Please try again.');
        }
    }
}

export const handleCreate = async (name, pas) => {
    try {
        const response = await axios.post(`${api}/CreateUser`, {
            username: name,
            password: pas,
        });
        return true;
    } catch (err) {
        if (err.response && err.response.data) {
            console.log(err.response.data.message);
        } else {
            console.log('Error registering. Please try again.');
        }
    }
};

export const getForgetPass = async (name) => {

    try {
        const response = await axios.post(`${api}/getPass`, { name });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data.message); // Error from backend
        } else {
            console.log('An error occurred. Please try again.');
        }
    }
}
