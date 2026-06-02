const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

function getLocalized(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.en_US || value.en || value["en-US"] || Object.values(value)[0] || "";
}

app.get("/api/test-ojs", async (req, res) => {
  try {
    const response = await axios.get(`${process.env.OJS_BASE_URL}/api/v1/submissions`, {
      headers: {
        Authorization: `Bearer ${process.env.OJS_API_KEY}`,
      },
    });

    res.json({
      success: true,
      message: "OJS API connected successfully",
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "OJS connection failed",
      error: error.response?.data || error.message,
    });
  }
});

app.get("/api/submissions", async (req, res) => {
  try {
    const response = await axios.get(`${process.env.OJS_BASE_URL}/api/v1/submissions`, {
      headers: {
        Authorization: `Bearer ${process.env.OJS_API_KEY}`,
      },
    });

    const items = response.data.items || response.data || [];

    const papers = items.map((item) => ({
      id: item.id || "N/A",
      title: getLocalized(item.fullTitle) || getLocalized(item.title) || "Untitled Paper",
      authors:
        item.authorsString ||
        item.authorsStringShort ||
        item.authors?.map((a) => a.fullName || a.name).join(", ") ||
        "No authors",
      submittedDate: item.dateSubmitted || item.dateCreated || "N/A",
      status: item.statusLabel || item.status || "Queued",
      progress: item.stageLabel || item.submissionProgress || "Review",
      section: getLocalized(item.section?.title) || item.sectionTitle || "Research Articles",
      workflowUrl: item.urlWorkflow || item.url || null,
    }));

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
});

module.exports = app;