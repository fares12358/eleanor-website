const axios = require('axios');
const api = 'http://localhost:5000';
// const api = 'https://eleanor-website-back-end.vercel.app';
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
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response && error.response.data.message) {
            return { success: false, message: error.response.data.message }; // Return error message from server
        } else {
            return { success: false, message: 'An error occurred. Please try again.' }; // Generic error message
        }
    }
};

export const handleCreate = async (username, password, name, email) => {
    try {
        const response = await axios.post(`${api}/CreateUser`, {
            username: username,
            password: password,
            name: name,
            email: email,
        });

        // If the request is successful, return the response data
        return { success: true, data: response.data };
    } catch (err) {
        if (err.response && err.response.data) {
            // Handle server error
            return { success: false, message: err.response.data.message };
        } else {
            // Handle general error
            return { success: false, message: 'Error registering. Please try again.' };
        }
    }
};

// Function to request forgotten password
export const getForgetPass = async (name) => {
    try {
      const response = await axios.post(`${api}/getPass`, { name }); // Make a request to get the password
      if (response.data.success) {
        return { success: true, password: response.data.password }; // Return success with password
      } else {
        return { success: false, message: response.data.message }; // Return failure with message
      }
    } catch (error) {
      if (error.response) {
        return { success: false, message: error.response.data.message }; // Return failure with message
      } else {
        return { success: false, message: 'An error occurred. Please try again.' }; // Return general error message
      }
    }
  };
  
