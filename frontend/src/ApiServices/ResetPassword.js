const axios = require("axios");

export async function queryToUpdatePassword(data) {
  try {
    const response = await axios.put("/api/resetPassword", {
      data: data,
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function sendEmailToResetPassword(data) {
  console.log(data, "aofdsnjfsdafds");
  const response = await axios.post("/api/sendMailReset", {
    data: data,
  });

  return response.data;
}
