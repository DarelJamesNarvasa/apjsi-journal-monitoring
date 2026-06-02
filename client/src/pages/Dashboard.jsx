import { useEffect, useMemo, useState } from "react";
import { FileText, CalendarDays, Clock, CheckCircle } from "lucide-react";

import api from "../services/api";
import StatCard from "../components/StatCard";
import ConnectionCard from "../components/ConnectionCard";
import ActionCard from "../components/ActionCard";
import FilterBar from "../components/FilterBar";
import SubmissionsTable from "../components/SubmissionsTable";
import mockData from "../utils/mockData";

function Dashboard() {
  const [papers, setPapers] = useState(mockData);
  const [connected, setConnected] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [loading, setLoading] = useState(false);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/submissions");

      if (res.data.success) {
        setPapers(res.data.papers);
        setConnected(true);
      }
    } catch (error) {
      console.error(error);
      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    try {
      await api.get("/test-ojs");
      setConnected(true);
      alert("OJS API connected successfully");
    } catch (error) {
      setConnected(false);
      alert("OJS API connection failed");
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        String(paper.id).toLowerCase().includes(keyword) ||
        paper.title.toLowerCase().includes(keyword) ||
        paper.authors.toLowerCase().includes(keyword);

      const matchesStatus =
        status === "All Status" || String(paper.status).includes(status);

      return matchesSearch && matchesStatus;
    });
  }, [papers, search, status]);

  const published = papers.filter((p) =>
    String(p.status).toLowerCase().includes("publish")
  ).length;

  const review = papers.filter((p) =>
    String(p.status).toLowerCase().includes("review")
  ).length;

  return (
    <div className="dashboard-page">
      <div className="stats-grid">
        <StatCard
          icon={<FileText size={30} />}
          title="Total Submissions"
          value={papers.length}
          subtitle="All time"
          color="blue"
        />

        <StatCard
          icon={<CalendarDays size={30} />}
          title="Submitted Today"
          value="0"
          subtitle="Today"
          color="green"
        />

        <StatCard
          icon={<Clock size={30} />}
          title="In Review"
          value={review}
          subtitle="Under review"
          color="orange"
        />

        <StatCard
          icon={<CheckCircle size={30} />}
          title="Published"
          value={published}
          subtitle="Published papers"
          color="purple"
        />
      </div>

      <div className="dashboard-row">
        <ConnectionCard connected={connected} onTest={testConnection} />
        <ActionCard onRefresh={fetchSubmissions} />
      </div>

      <FilterBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {loading ? (
        <div className="loading-box">Loading submissions...</div>
      ) : (
        <SubmissionsTable papers={filteredPapers} />
      )}
    </div>
  );
}

export default Dashboard;