function getLocalized(value) {
  if (!value) return "";
  if (typeof value === "string") return value;

  return (
    value.en_US ||
    value.en ||
    value["en-US"] ||
    Object.values(value)[0] ||
    ""
  );
}

function normalizeSubmission(item) {
  return {
    id: item.id || "N/A",
    title:
      getLocalized(item.fullTitle) ||
      getLocalized(item.title) ||
      "Untitled Paper",
    authors:
      item.authorsString ||
      item.authorsStringShort ||
      item.authors?.map((a) => a.fullName || a.name).join(", ") ||
      "No authors",
    submittedDate: item.dateSubmitted || item.dateCreated || "N/A",
    status: item.statusLabel || item.status || "Queued",
    progress: item.stageLabel || item.submissionProgress || "Review",
    section:
      getLocalized(item.section?.title) ||
      item.sectionTitle ||
      "Research Articles",
    workflowUrl: item.urlWorkflow || item.url || null,
    publicationUrl: item.urlPublished || null,
  };
}

module.exports = normalizeSubmission;