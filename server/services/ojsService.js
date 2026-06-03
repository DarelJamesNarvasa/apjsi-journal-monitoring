const axios = require("axios");

const OJS_BASE_URL = process.env.OJS_BASE_URL;
const OJS_API_KEY = process.env.OJS_API_KEY;

const headers = {
  Authorization: `Bearer ${OJS_API_KEY}`,
  Accept: "application/json",
};

const fetchOjsSubmissions = async () => {
  let allItems = [];
  let offset = 0;
  const count = 100;
  let total = 0;

  while (true) {
    console.log(`Fetching submissions offset: ${offset}`);

    const response = await axios.get(`${OJS_BASE_URL}/api/v1/submissions`, {
      headers,
      params: {
        count,
        offset,
      },
      timeout: 30000,
    });

    const data = response.data;
    const items = data.items || [];

    allItems = [...allItems, ...items];

    total = data.itemsMax || data.itemsTotal || allItems.length;

    if (items.length === 0 || allItems.length >= total) {
      break;
    }

    offset += count;
  }

  console.log("====================================");
  console.log("OJS FETCH COMPLETE");
  console.log("Fetched At:", new Date().toLocaleString());
  console.log("Total From OJS:", total);
  console.log("Total Fetched:", allItems.length);
  console.log("====================================");

  return {
    items: allItems,
    itemsTotal: total,
    itemsMax: total,
  };
};

module.exports = {
  fetchOjsSubmissions,
};