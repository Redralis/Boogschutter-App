const axios = require('axios');



export async function getNote(data) {
    // const {email} = data.email
    console.log("Started getNoteAPICAll")
    console.log(data , 'data')
    
    const response = await axios.get(`/api/getNote?email=${data}`, {
    })

    return response.data;
}

export async function saveNote(data) {
    console.log(data, "APIservices")
    const response = await axios.put('/api/saveNote', {
        data: data
    })

    return response.data;
}