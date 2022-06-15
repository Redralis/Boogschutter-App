const axios = require('axios');


export async function getNote(data) {
    // const {email} = data.email
    console.log("Started getNoteAPICAll")
    console.log(data , 'data')
    
    const response = await axios.get(`/api/notes?email=${data}`, {
    })

    return response.data;
}

// export async function saveNote(data) {
//     console.log(data , 'aofdsnjfsdafds')
//     const response = await axios.post('/api/sendMailReset', {
//         data: data
//     })
//
//     return response.data;
// }