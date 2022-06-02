const axios = require('axios');

export async function queryToUpdatePassword(data) {

    try{
        const response = await axios.get('/api/sendMailReset',{email:data});
        console.log('response  ', response)
        return response.data;
    }catch(error) {
        return [];
    }
}

export async function sendEmailToResetPassword(data) {
    const response = await axios.get(`/api/sendMailReset`, {email: data});
    return response.data;
}