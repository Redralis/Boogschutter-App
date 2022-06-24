const axios = require('axios');

export async function queryToUpdatePassword(data) {
    try{
        const response = await axios.put('http://localhost:5000/api/resetPassword',{
            data: data
        });
        return response.data;
    } catch(error) {
        return [];
    }
}

export async function sendEmailToResetPassword(data) {
    
    const response = await axios.post('http://localhost:5000/api/sendMailReset', {
        data: data
    })

    return response.data;
}