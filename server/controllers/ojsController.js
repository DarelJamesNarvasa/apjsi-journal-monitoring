const { fetchOjsSubmissions } = require("../services/ojsService");
const normalizeSubmission = require("../utils/normalizeSubmission");

const testOjsConnection = async (req, res) => {
  try {
    const data = await fetchOjsSubmissions();

    res.json({
      success: true,
      message: "OJS API connected successfully",
      raw: data,
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
    const items = data.items || data || [];
    const papers = items.map(normalizeSubmission);

    res.json({
      success: true,
      count: papers.length,
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