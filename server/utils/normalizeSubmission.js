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

function getAuthorName(author) {
  return (
    author.fullName ||
    author.name ||
    `${getLocalized(author.givenName)} ${getLocalized(author.familyName)}`.trim()
  );
}

function normalizeSubmission(item) {
  const publication = item.publications?.[0] || {};
  const id = item.id || "N/A";

  return {
    id,

    title:
      getLocalized(item.fullTitle) ||
      getLocalized(item.title) ||
      getLocalized(publication.fullTitle) ||
      getLocalized(publication.title) ||
      "Untitled Paper",

    authors:
      item.authorsString ||
      item.authorsStringShort ||
      publication.authorsString ||
      publication.authorsStringShort ||
      item.authors?.map(getAuthorName).filter(Boolean).join(", ") ||
      publication.authors?.map(getAuthorName).filter(Boolean).join(", ") ||
      "No authors",

    submittedDate: item.dateSubmitted || item.dateCreated || "N/A",

    status: item.statusLabel || item.status || "Queued",

    progress:
      item.stageLabel ||
      item.submissionProgress ||
      item.stageId ||
      "Review",

    section:
      getLocalized(item.section?.title) ||
      item.sectionTitle ||
      getLocalized(publication.section?.title) ||
      publication.sectionTitle ||
      "Research Articles",

    workflowUrl: item.urlWorkflow || item.url || null,

    workflowLinks: {
      submission: `/workflow/index/${id}/1`,
      review: `/workflow/index/${id}/3`,
      copyediting: `/workflow/index/${id}/4`,
      production: `/workflow/index/${id}/5`,
    },

    publicationUrl: item.urlPublished || publication.urlPublished || null,
  };
}

module.exports = normalizeSubmission;