const axios = require('axios');



export async function getNote(data) {
    // const {email} = data.email
    const response = await axios.get(`https://boogschutter-api.herokuapp.com/api/getNote?email=${data}`, {
    })

    return response.data;
}

export async function saveNote(data) {

    const response = await axios.put('https://boogschutter-api.herokuapp.com/api/saveNote', {
        data: data
    })

    return [];
}