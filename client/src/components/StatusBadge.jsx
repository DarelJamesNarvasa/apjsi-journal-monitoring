function StatusBadge({ value }) {
  const text = String(value || "Queued");

  const className =
    text.toLowerCase().includes("publish")
      ? "badge published"
      : text.toLowerCase().includes("review")
      ? "badge review"
      : text.toLowerCase().includes("accept")
      ? "badge accepted"
      : text.toLowerCase().includes("revision")
      ? "badge revision"
      : "badge queued";

  return <span className={className}>{text}</span>;
}

export default StatusBadge;