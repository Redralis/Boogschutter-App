const axios = require('axios');

export async function getUser(email) {
    const response = await axios.post('https://boogschutter-api.herokuapp.com/user/get/', {
        email: email
    })
    return response.data;
}

