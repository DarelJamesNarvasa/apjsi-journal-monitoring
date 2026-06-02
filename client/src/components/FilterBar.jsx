import { Search, Calendar } from "lucide-react";

function FilterBar({ search, setSearch, status, setStatus }) {
  return (
    <div className="filter-bar">
      <div className="filter-group search-box">
        <label>Search</label>
        <div>
          <input
            type="text"
            placeholder="Search ID, title, or authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search size={18} />
        </div>
      </div>

      <div className="filter-group">
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All Status</option>
          <option>Queued</option>
          <option>Under Review</option>
          <option>Published</option>
          <option>Accepted</option>
          <option>Declined</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Progress</label>
        <select>
          <option>All Progress</option>
          <option>Submission</option>
          <option>Review</option>
          <option>Copyediting</option>
          <option>Production</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Section</label>
        <select>
          <option>All Sections</option>
          <option>Research Articles</option>
          <option>Technology</option>
          <option>Education</option>
        </select>
      </div>

      <div className="filter-group date-range">
        <label>Submitted Date Range</label>
        <div>
          <Calendar size={16} />
          <input type="text" placeholder="Start date" />
          <span>to</span>
          <input type="text" placeholder="End date" />
        </div>
      </div>
    </div>
  );
}

export default FilterBar;