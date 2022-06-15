const axios = require("axios");

export function getAllEvents() {
  
}

export async function getDailyEvents(date) {
  console.log(date, "get event from 1 date");
  const response = await axios.get(`/event/`, {
    data: date,
  });
  return response.data;
}
