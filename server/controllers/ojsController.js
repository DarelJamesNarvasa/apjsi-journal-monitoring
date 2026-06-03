const { fetchOjsSubmissions } = require("../services/ojsService");
const normalizeSubmission = require("../utils/normalizeSubmission");

const testOjsConnection = async (req, res) => {
  try {
    const data = await fetchOjsSubmissions();

    res.json({
      success: true,
      total: data.itemsTotal,
      returned: data.items?.length || 0,
      fetchedAt: new Date().toISOString(),
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "OJS connection failed",
      error: error.response?.data || error.message,
    });
  }
};

const getSubmissions = async (req, res) => {
  try {
    const data = await fetchOjsSubmissions();
    const items = data.items || [];

    const papers = items.map(normalizeSubmission);

    res.json({
      success: true,
      total: data.itemsTotal,
      count: papers.length,
      fetchedAt: new Date().toISOString(),
      papers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch submissions",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = {
  testOjsConnection,
  getSubmissions,
};