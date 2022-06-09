const axios = require('axios');

export async function getAllEvents() {
    console.log('get all events')
    const response = await axios.get(`/event/d`, {
        data: data
    })
    return response.data;
}

export async function getDailyEvents(date) {
    console.log(date, 'get event from 1 date')
    const response = await axios.get(`/event/`, {
        data: date
    })
    return response.data;
}