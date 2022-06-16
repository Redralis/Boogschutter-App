const axios = require('axios');

export async function regUser(email) {
    const response = await axios.post('http://localhost:5000/register/', {
        email: email
    })
    return response.data;
}

