const axios = require('axios');

export async function queryToUpdatePassword(data) {
    try{
        const response = await axios.put('https://alliance-damitie-backend.herokuapp.com/api/resetPassword',{
            data: data
        });
        return response.data;
    } catch(error) {
        return [];
    }
}

export async function sendEmailToResetPassword(email) {
    
    const response = await axios.post('https://alliance-damitie-backend.herokuapp.com/api/sendMailReset', {
        email
    })

    return response.data;
}