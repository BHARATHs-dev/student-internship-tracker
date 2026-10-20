
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [internships, setInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch initial data when the component loads
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users"
      
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((users) => {
        const initialData = users.map((user) => ({
          id: user.id,
          company: user.company.name,
          role: user.name,
          status: "Applied",
        }));

        setInternships(initialData);
      })
      .catch(() => {
        setError("Unable to load internship data.");
      });
  }, []);

  // Handle form inputs
  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    setError("");
    setSuccess("");
  }

  // Submit the form
  function handleSubmit(e) {
    e.preventDefault();

    if (!form.company.trim() || !form.role.trim()) {
      setError("Please fill in all required fields.");
      setSuccess("");
      return;
    }

    const newInternship = {
      id: Date.now(),
      company: form.company.trim(),
      role: form.role.trim(),
      status: form.status,
    };

    setInternships((previous) => [newInternship, ...previous]);

    console.log("Submitted Internship:", newInternship);

    setSuccess("Internship added successfully!");
    setError("");

    setForm({
      company: "",
      role: "",
      status: "Applied",
    });

    setCurrentPage(1);
  }

  // Search internships
  const filteredInternships = internships.filter((internship) =>
    `${internship.company} ${internship.role}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(
    filteredInternships.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentInternships = filteredInternships.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset page when searching
  function handleSearch(e) {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="app">
      <h1>Student Internship Tracker</h1>
      <p className="subtitle">
        Manage your internship applications in one place.
      </p>

      {/* Internship Form */}
      <form onSubmit={handleSubmit} className="internship-form">
        <h2>Add Internship</h2>

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
        />

        <input
          type="text"
          name="role"
          placeholder="Job Role"
          value={form.role}
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Applied">Applied</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button type="submit">Add Internship</button>

        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
      </form>

      {/* Search */}
      <div className="search-section">
        <h2>Internship Applications</h2>

        <input
          type="text"
          placeholder="Search company or role..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Internship List */}
      <div className="internship-list">
        {currentInternships.length > 0 ? (
          currentInternships.map((internship) => (
            <div className="internship-card" key={internship.id}>
              <h3>{internship.company}</h3>
              <p>
                <strong>Role:</strong> {internship.role}
              </p>
              <p>
                <strong>Status:</strong> {internship.status}
              </p>
            </div>
          ))
        ) : (
          <p>No internship records found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="pagination">
          <button
            onClick={() =>
              setCurrentPage((page) => Math.max(page - 1, 1))
            }
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(page + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <p className="record-count">
        Total records: {filteredInternships.length}
      </p>
    </div>
  );
}

export default App;