const axios = require('axios');

export async function getAllEvents(data) {

}

export async function getDailyEvents(date) {
    console.log(date, 'get event from 1 date')
    const response = await axios.get(`/api/getEvent?Date=${date}`, {
        data: date
    })
    return response.data;
}