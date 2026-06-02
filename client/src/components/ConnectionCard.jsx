import { EyeOff, RefreshCw } from "lucide-react";

function ConnectionCard({ connected, onTest }) {
  return (
    <div className="panel-card connection-card">
      <div className="panel-title">
        <h3>Connection to OJS</h3>
        <span className={connected ? "badge-success" : "badge-danger"}>
          {connected ? "Connected" : "Disconnected"}
        </span>
      </div>

      <div className="connection-info">
        <div>
          <p>Journal URL</p>
          <a href="https://journals.msuiit.edu.ph/apjsi" target="_blank">
            https://journals.msuiit.edu.ph/apjsi
          </a>
        </div>

        <div>
          <p>API Key</p>
          <div className="api-key">
            •••••••••••••••••••••••••
            <EyeOff size={16} />
          </div>
        </div>
      </div>

      <div className="connection-footer">
        <span>Last checked: Today</span>
        <button onClick={onTest}>
          <RefreshCw size={16} />
          Test Connection
        </button>
      </div>
    </div>
  );
}

export default ConnectionCard;