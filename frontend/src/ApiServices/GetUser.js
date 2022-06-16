const axios = require('axios');

export async function getUser(email) {
    const response = await axios.post('http://localhost:5000/user/get/', {
        email: email
    })
    return response.data;
}

