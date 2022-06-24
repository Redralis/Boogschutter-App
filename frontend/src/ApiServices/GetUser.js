const axios = require('axios');

export async function getUser(email) {
    const response = await axios.post('https://alliance-damitie-backend.herokuapp.com/user/get/', {
        email: email
    })
    return response.data;
}

