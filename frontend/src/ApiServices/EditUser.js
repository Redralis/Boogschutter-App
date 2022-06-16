const axios = require('axios');

export async function editUser(email, isTrainer, isAdmin, isMatchLeader) {
    const response = await axios.put('http://localhost:5000/user/edit', {
        email: email,
        isAdmin: isAdmin,
        isTrainer: isTrainer,
        isMatchLeader: isMatchLeader
    })
    return response.data;
}

