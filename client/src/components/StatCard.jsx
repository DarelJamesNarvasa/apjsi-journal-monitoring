function StatCard({ icon, title, value, subtitle, color }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>{icon}</div>
      <div>
        <p>{title}</p>
        <h2>{value}</h2>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}

export default StatCard;