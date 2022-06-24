const axios = require('axios');

export async function regUser(email) {
    const response = await axios.post('https://alliance-damitie-backend.herokuapp.com//register/', {
        email: email
    })
    return response.data;
}

