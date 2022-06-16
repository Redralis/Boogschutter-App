const axios = require('axios');



export async function getNote(data) {
    // const {email} = data.email
    const response = await axios.get(`http://localhost:5000/api/getNote?email=${data}`, {
    })

    return response.data;
}

export async function saveNote(data) {

    const response = await axios.put('http://localhost:5000/api/saveNote', {
        data: data
    })

    return [];
}