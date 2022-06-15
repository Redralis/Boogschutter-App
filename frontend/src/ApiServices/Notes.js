const axios = require('axios');


export async function getNote(data) {
    const {email} = data.email

    console.log(data , 'data')
    console.log(email , 'email')
    const response = await axios.get(`/notes?email=${email}`, {
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