const axios = require('axios');
const api = 'http://localhost:5000';
// const api = 'https://eleanor-website-back-end.vercel.app';
// const api = process.env.NEXT_PUBLIC_API_KEY; //back end api

export const getUserData = async (id) => {
    try {
      const response = await axios.get(`${api}/Getuser`, {
        params: {
            id: id,
          },
      });
      return { success: true, data: response.data };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return { success: false, message: error.response.data.message };
      } else {
        return { success: false, message: 'An error occurred. Please try again.' };
      }
    }
  };
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

// Function to get cat user
export const getCategories = async (id) => {
    try {
        const response = await axios.post(`${api}/getCat`, {
           id
          });
        if (response.data.success) {
            console.log(response);
            return { success: true, cat: response.data.cat }; // Return success with categories
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

// Function to get item by cat key
export const getItemByCat = async (id, catKey) => {
    try {
        const response = await axios.post(`${api}/getItems`, {
            id,
            catKey, // Ensure this matches the key you are sending to the backend
        });

        if (response.data.success) {
            console.log('Items fetched successfully:', response.data.items);
            return { success: true, items: response.data.items }; // Return success with items
        } else {
            console.error('Fetch failed:', response.data.message);
            return { success: false, message: response.data.message }; // Return failure with message
        }
    } catch (error) {
        if (error.response) {
            console.error('Error response from server:', error.response.data.message);
            return { success: false, message: error.response.data.message }; // Return failure with message
        } else {
            console.error('Network error:', error);
            return { success: false, message: 'An error occurred. Please try again.' }; // Return general error message
        }
    }
};
export const addCategory = async (id, catName) => {
    try {
        const response = await axios.post(`${api}/addCategory`, { id, catName });
        
        if (response.data.success) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: response.data.message || 'Failed to add category' };
        }
    } catch (error) {
        console.error("Add Category Error:", error);
        return { success: false, message: error.message || 'Internal error' };
    }
};