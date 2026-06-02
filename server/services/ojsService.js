const axios = require("axios");

const fetchOjsSubmissions = async () => {
  const response = await axios.get(
    `${process.env.OJS_BASE_URL}/api/v1/submissions`,
    {
      headers: {
        Authorization: `Bearer ${process.env.OJS_API_KEY}`,
      },
    }
  );

  return response.data;
};

module.exports = {
  fetchOjsSubmissions,
};