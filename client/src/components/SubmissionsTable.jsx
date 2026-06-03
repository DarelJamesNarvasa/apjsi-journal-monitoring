import { useMemo, useState } from "react";
import { ExternalLink, Edit, UserRound } from "lucide-react";
import StatusBadge from "./StatusBadge";

function SubmissionsTable({ papers = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(papers.length / itemsPerPage);

  const paginatedPapers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return papers.slice(start, end);
  }, [papers, currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const openLink = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Authors</th>
            <th>Submitted Date</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Section</th>
            <th>Workflow Links</th>
            <th>Publication</th>
          </tr>
        </thead>

        <tbody>
          {paginatedPapers.map((paper) => (
            <tr key={paper.id}>
              <td className="link-text">{paper.id}</td>

              <td>{paper.title || "Untitled Paper"}</td>

              <td>{paper.authors || "No authors"}</td>

              <td>{paper.submittedDate || "N/A"}</td>

              <td>
                <StatusBadge value={paper.status || "Queued"} />
              </td>

              <td>
                <StatusBadge value={paper.progress || "Review"} />
              </td>

              <td>{paper.section || "Research Articles"}</td>

              <td>
                <div className="workflow-actions">
                  <button
                    type="button"
                    title="Submission"
                    onClick={() =>
                      openLink(
                        paper.workflowLinks?.submission || paper.workflowUrl
                      )
                    }
                  >
                    <UserRound size={16} />
                  </button>

                  <button
                    type="button"
                    title="Review / Edit"
                    onClick={() =>
                      openLink(paper.workflowLinks?.review || paper.workflowUrl)
                    }
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    type="button"
                    title="Copyediting"
                    onClick={() =>
                      openLink(
                        paper.workflowLinks?.copyediting || paper.workflowUrl
                      )
                    }
                  >
                    <ExternalLink size={16} />
                  </button>

                  <button
                    type="button"
                    title="Production"
                    onClick={() =>
                      openLink(
                        paper.workflowLinks?.production || paper.workflowUrl
                      )
                    }
                  >
                    <ExternalLink size={16} />
                  </button>
                </div>
              </td>

              <td>
                {paper.publicationUrl ? (
                  <a
                    href={paper.publicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link-text"
                  >
                    View
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
          ))}

          {papers.length === 0 && (
            <tr>
              <td colSpan="9" className="empty-table">
                No submissions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="table-footer">
        <span>
          Showing {paginatedPapers.length} of {papers.length} entries
        </span>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              ‹
            </button>

            {pageNumbers.map((page) => (
              <button
                type="button"
                key={page}
                className={currentPage === page ? "active" : ""}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubmissionsTable;