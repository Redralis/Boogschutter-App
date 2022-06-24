const axios = require('axios');



export async function getNote(data) {
    // const {email} = data.email
    const response = await axios.get(`https://alliance-damitie-backend.herokuapp.com/api/getNote?email=${data}`, {
    })

    return response.data;
}

export async function saveNote(data) {

    const response = await axios.put('https://alliance-damitie-backend.herokuapp.com/api/saveNote', {
        data: data
    })

    return [];
}