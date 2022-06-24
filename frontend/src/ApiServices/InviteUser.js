const axios = require('axios');

export async function inviteUser(email) {
    const response = await axios.put('https://alliance-damitie-backend.herokuapp.com//user/edit', {
        email: email,
        isAdmin: isAdmin,
        isTrainer: isTrainer,
        isMatchLeader: isMatchLeader
    })
    return response.data;
}

