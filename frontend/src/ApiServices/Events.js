const axios = require("axios");

export function getAllEvents() {
  
}

export async function getDailyEvents(date) {
  
  const response = await axios.get(`/event/`, {
    data: date,
  });
  return response.data;
}
