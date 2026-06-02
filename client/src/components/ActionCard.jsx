import { RefreshCw, FileSpreadsheet, FileText } from "lucide-react";

function ActionCard({ onRefresh }) {
  return (
    <div className="panel-card action-card">
      <h3>Actions</h3>

      <div className="action-buttons">
        <button className="btn-primary" onClick={onRefresh}>
          <RefreshCw size={16} />
          Refresh Data
        </button>

        <button className="btn-success">
          <FileSpreadsheet size={16} />
          Export to Excel
        </button>

        <button className="btn-outline">
          <FileText size={16} />
          Export to CSV
        </button>
      </div>
    </div>
  );
}

export default ActionCard;