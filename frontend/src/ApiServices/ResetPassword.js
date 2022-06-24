const axios = require('axios');

export async function queryToUpdatePassword(data) {
    try{
        const response = await axios.put('https://boogschutter-api.herokuapp.com/api/resetPassword',{
            data: data
        });
        return response.data;
    } catch(error) {
        return [];
    }
}

export async function sendEmailToResetPassword(email) {
    
    const response = await axios.post('https://boogschutter-api.herokuapp.com/api/sendMailReset', {
        email
    })

    return response.data;
}