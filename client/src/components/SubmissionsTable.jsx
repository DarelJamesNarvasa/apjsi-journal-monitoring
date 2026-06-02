import { ExternalLink, Edit, UserRound } from "lucide-react";
import StatusBadge from "./StatusBadge";

function SubmissionsTable({ papers }) {
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
          </tr>
        </thead>

        <tbody>
          {papers.map((paper) => (
            <tr key={paper.id}>
              <td className="link-text">{paper.id}</td>
              <td>{paper.title}</td>
              <td>{paper.authors}</td>
              <td>{paper.submittedDate}</td>
              <td>
                <StatusBadge value={paper.status} />
              </td>
              <td>
                <StatusBadge value={paper.progress} />
              </td>
              <td>{paper.section}</td>
              <td>
                <div className="workflow-actions">
                  <button>
                    <UserRound size={16} />
                  </button>
                  <button>
                    <Edit size={16} />
                  </button>
                  <a
                    href={paper.workflowUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </td>
            </tr>
          ))}

          {papers.length === 0 && (
            <tr>
              <td colSpan="8" className="empty-table">
                No submissions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="table-footer">
        <span>Showing {papers.length} entries</span>
        <div className="pagination">
          <button>‹</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>›</button>
        </div>
      </div>
    </div>
  );
}

export default SubmissionsTable;