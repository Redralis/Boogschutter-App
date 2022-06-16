const axios = require('axios');



export async function getNote(data) {
    // const {email} = data.email
    console.log("Started getNoteAPICAll")
    console.log(data , 'data')
    
    const response = await axios.get(`http://localhost:5000/api/getNote?email=${data}`, {
    })

    return response.data;
}

export async function saveNote(data) {
    console.log(data, "APIservices")
    const response = await axios.put('http://localhost:5000/api/saveNote', {
        data: data
    })

    return [];
}