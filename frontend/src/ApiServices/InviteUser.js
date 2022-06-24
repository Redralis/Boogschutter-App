const axios = require('axios');

export async function inviteUser(email) {
    const response = await axios.put('https://boogschutter-api.herokuapp.com/user/edit', {
        email: email,
        isAdmin: isAdmin,
        isTrainer: isTrainer,
        isMatchLeader: isMatchLeader
    })
    return response.data;
}

