
// import { useState, useEffect } from "react";
// import "./App.css";

// function App() {
//   const [internships, setInternships] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [form, setForm] = useState({
//     company: "",
//     role: "",
//     status: "Applied",
//   });

//   const itemsPerPage = 5;

//   // Fetch internship data
//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         return response.json();
//       })
//       .then((users) => {
//         const data = users.map((user) => ({
//           id: user.id,
//           company: user.company.name,
//           role: user.name,
//           status: "Applied",
//           image: `https://ui-avatars.com/api/?name=${encodeURIComponent(
//             user.company.name
//           )}&background=E0E7FF&color=3730A3`,
//         }));

//         setInternships(data);
//         setSuccess("Internship data loaded successfully!");
//         setError("");
//       })
//       .catch(() => {
//         setError("Unable to load internship data.");
//         setSuccess("");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   // Handle form inputs
//   function handleChange(e) {
//     const { name, value } = e.target;

//     setForm({
//       ...form,
//       [name]: value,
//     });

//     setSuccess("");
//     setError("");
//   }

//   // Submit internship form
//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!form.company.trim() || !form.role.trim()) {
//       setError("Please fill in all required fields.");
//       setSuccess("");
//       return;
//     }

//     const newInternship = {
//       id: Date.now(),
//       company: form.company.trim(),
//       role: form.role.trim(),
//       status: form.status,
//       image: `https://ui-avatars.com/api/?name=${encodeURIComponent(
//         form.company.trim()
//       )}&background=E0E7FF&color=3730A3`,
//     };

//     setInternships((previous) => [
//       newInternship,
//       ...previous,
//     ]);

//     console.log("Submitted Internship:", newInternship);

//     setSuccess("Internship added successfully!");
//     setError("");
//     setSearchTerm("");
//     setCurrentPage(1);

//     setForm({
//       company: "",
//       role: "",
//       status: "Applied",
//     });
//   }

//   // Search internships
//   const filteredInternships = internships.filter((item) =>
//     `${item.company} ${item.role}`
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   // Pagination
//   const totalPages = Math.ceil(
//     filteredInternships.length / itemsPerPage
//   );

//   const startIndex = (currentPage - 1) * itemsPerPage;

//   const currentInternships = filteredInternships.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   // Handle search
//   function handleSearch(e) {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//     setSuccess("");
//     setError("");
//   }

//   return (
//     <div className="app">
//       <header className="header">
//         <h1>Student Internship Tracker</h1>
//         <p>Track your internship applications in one place.</p>
//       </header>

//       {/* Add Internship Form */}
//       <form className="internship-form" onSubmit={handleSubmit}>
//         <h2>Add Internship</h2>

//         <input
//           type="text"
//           name="company"
//           placeholder="Company Name"
//           value={form.company}
//           onChange={handleChange}
//         />

//         <input
//           type="text"
//           name="role"
//           placeholder="Job Role"
//           value={form.role}
//           onChange={handleChange}
//         />

//         <select
//           name="status"
//           value={form.status}
//           onChange={handleChange}
//         >
//           <option value="Applied">Applied</option>
//           <option value="Selected">Selected</option>
//           <option value="Rejected">Rejected</option>
//         </select>

//         <button type="submit">Add Internship</button>

//         {success && <p className="success">{success}</p>}
//         {error && <p className="error">{error}</p>}
//       </form>

//       {/* Search */}
//       <section className="list-section">
//         <h2>Internship Applications</h2>

//         <input
//           className="search-input"
//           type="text"
//           placeholder="Search company or job role..."
//           value={searchTerm}
//           onChange={handleSearch}
//         />

//         {/* Loading */}
//         {loading && (
//           <p className="loading">Loading internships...</p>
//         )}

//         {/* API Error and Retry */}
//         {!loading && error && internships.length === 0 && (
//           <button
//             type="button"
//             onClick={() => window.location.reload()}
//           >
//             Retry Loading
//           </button>
//         )}

//         {/* Record Count */}
//         {!loading && (
//           <p className="record-count">
//             Total records: {filteredInternships.length}
//           </p>
//         )}

//         {/* Internship Cards */}
//         {!loading && (
//           <div className="internship-list">
//             {currentInternships.map((item) => (
//               <div className="internship-card" key={item.id}>
//                 <img
//                   src={item.image}
//                   alt={`${item.company} logo`}
//                   className="company-image"
//                   onError={(e) => {
//                     e.currentTarget.src =
//                       "https://placehold.co/65x65?text=Company";
//                   }}
//                 />

//                 <div className="card-content">
//                   <h3>{item.company}</h3>

//                   <p>
//                     <strong>Role:</strong> {item.role}
//                   </p>

//                   <p>
//                     <strong>Status:</strong> {item.status}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Empty Search Result */}
//         {!loading &&
//           !error &&
//           filteredInternships.length === 0 && (
//             <p className="empty">
//               No internship records found.
//             </p>
//           )}

//         {/* Pagination */}
//         {!loading && totalPages > 1 && (
//           <div className="pagination">
//             <button
//               type="button"
//               disabled={currentPage === 1}
//               onClick={() =>
//                 setCurrentPage((page) => page - 1)
//               }
//             >
//               Previous
//             </button>

//             <span>
//               Page {currentPage} of {totalPages}
//             </span>

//             <button
//               type="button"
//               disabled={currentPage === totalPages}
//               onClick={() =>
//                 setCurrentPage((page) => page + 1)
//               }
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// export default App;



// // import { useState, useEffect } from "react";
// // import "./App.css";

// // function App() {
// //   const [destinations, setDestinations] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const [success, setSuccess] = useState("");
// //   const [error, setError] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);

// //   const [form, setForm] = useState({
// //     name: "",
// //     capital: "",
// //     description: "",
// //     image: "",
// //   });

// //   const itemsPerPage = 6;

// //   // Fetch destination data
// //   useEffect(() => {
// //     fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags,region")
// //       .then((response) => {
// //         if (!response.ok) {
// //           throw new Error("Failed to fetch destinations");
// //         }
// //         return response.json();
// //       })
// //       .then((data) => {
// //         const countries = data
// //           .map((country, index) => ({
// //             id: `${country.name.common}-${index}`,
// //             name: country.name.common,
// //             capital: country.capital?.[0] || "N/A",
// //             region: country.region || "Unknown",
// //             image: country.flags?.png || "",
// //             description: "",
// //           }))
// //           .sort((a, b) => a.name.localeCompare(b.name));

// //         setDestinations(countries);
// //         setSuccess("Destinations loaded successfully!");
// //         setError("");
// //       })
// //       .catch(() => {
// //         setError("Unable to load destinations. Please try again.");
// //         setSuccess("");
// //       })
// //       .finally(() => {
// //         setLoading(false);
// //       });
// //   }, []);

// //   // Handle form input
// //   function handleChange(e) {
// //     setForm({
// //       ...form,
// //       [e.target.name]: e.target.value,
// //     });

// //     setError("");
// //     setSuccess("");
// //   }

// //   // Submit destination
// //   function handleSubmit(e) {
// //     e.preventDefault();

// //     if (
// //       !form.name.trim() ||
// //       !form.capital.trim() ||
// //       !form.description.trim()
// //     ) {
// //       setError("Please fill in all required fields.");
// //       setSuccess("");
// //       return;
// //     }

// //     const newDestination = {
// //       id: Date.now(),
// //       name: form.name.trim(),
// //       capital: form.capital.trim(),
// //       description: form.description.trim(),
// //       region: "Suggested",
// //       image: form.image.trim(),
// //     };

// //     setDestinations((previous) => [
// //       newDestination,
// //       ...previous,
// //     ]);

// //     console.log("Submitted Destination:", newDestination);

// //     setSuccess("Destination added successfully!");
// //     setError("");
// //     setSearch("");
// //     setCurrentPage(1);

// //     setForm({
// //       name: "",
// //       capital: "",
// //       description: "",
// //       image: "",
// //     });
// //   }

// //   // Search destinations
// //   const filteredDestinations = destinations.filter((destination) =>
// //     `${destination.name} ${destination.capital} ${destination.region}`
// //       .toLowerCase()
// //       .includes(search.toLowerCase())
// //   );

// //   // Pagination
// //   const totalPages = Math.ceil(
// //     filteredDestinations.length / itemsPerPage
// //   );

// //   const startIndex = (currentPage - 1) * itemsPerPage;

// //   const currentDestinations = filteredDestinations.slice(
// //     startIndex,
// //     startIndex + itemsPerPage
// //   );

// //   function handleSearch(e) {
// //     setSearch(e.target.value);
// //     setCurrentPage(1);
// //     setSuccess("");
// //     setError("");
// //   }

// //   return (
// //     <div className="app">
// //       <header className="header">
// //         <p className="tagline">EXPLORE THE WORLD</p>
// //         <h1>Travel Destination Explorer</h1>
// //         <p className="subtitle">
// //           Discover beautiful countries and find your next destination.
// //         </p>
// //       </header>

// //       {/* Add Destination Form */}
// //       <form className="destination-form" onSubmit={handleSubmit}>
// //         <h2>Suggest a Destination</h2>

// //         <input
// //           type="text"
// //           name="name"
// //           placeholder="Country or destination name"
// //           value={form.name}
// //           onChange={handleChange}
// //         />

// //         <input
// //           type="text"
// //           name="capital"
// //           placeholder="Capital or main city"
// //           value={form.capital}
// //           onChange={handleChange}
// //         />

// //         <textarea
// //           name="description"
// //           placeholder="Why should people visit?"
// //           value={form.description}
// //           onChange={handleChange}
// //           rows="3"
// //         />

// //         <input
// //           type="url"
// //           name="image"
// //           placeholder="Image URL (optional)"
// //           value={form.image}
// //           onChange={handleChange}
// //         />

// //         <button type="submit">Add Destination</button>

// //         {success && <p className="success">{success}</p>}
// //         {error && <p className="error">{error}</p>}
// //       </form>

// //       {/* Search */}
// //       <section className="explore-section">
// //         <h2>Explore Destinations</h2>

// //         <input
// //           className="search-input"
// //           type="text"
// //           placeholder="Search country, capital or region..."
// //           value={search}
// //           onChange={handleSearch}
// //         />

// //         {loading && (
// //           <p className="loading">Loading destinations...</p>
// //         )}

// //         {!loading && error && destinations.length === 0 && (
// //           <button
// //             onClick={() => window.location.reload()}
// //             type="button"
// //           >
// //             Retry Loading
// //           </button>
// //         )}

// //         {!loading && !error && (
// //           <p className="record-count">
// //             {filteredDestinations.length} destinations found
// //           </p>
// //         )}

// //         {/* Destination Cards */}
// //         {!loading && (
// //           <div className="destination-grid">
// //             {currentDestinations.map((destination) => (
// //               <article
// //                 className="destination-card"
// //                 key={destination.id}
// //               >
// //                 {destination.image ? (
// //                   <img
// //                     src={destination.image}
// //                     alt={`${destination.name} flag`}
// //                     className="destination-image"
// //                     onError={(e) => {
// //                       e.currentTarget.style.display = "none";
// //                     }}
// //                   />
// //                 ) : (
// //                   <div className="image-placeholder">
// //                     No image available
// //                   </div>
// //                 )}

// //                 <div className="card-content">
// //                   <h3>{destination.name}</h3>
// //                   <p>
// //                     <strong>Capital:</strong> {destination.capital}
// //                   </p>
// //                   <p>
// //                     <strong>Region:</strong> {destination.region}
// //                   </p>

// //                   {destination.description && (
// //                     <p>{destination.description}</p>
// //                   )}
// //                 </div>
// //               </article>
// //             ))}
// //           </div>
// //         )}

// //         {!loading &&
// //           filteredDestinations.length === 0 &&
// //           !error && (
// //             <p className="empty">
// //               No destinations found. Try another search.
// //             </p>
// //           )}

// //         {/* Pagination */}
// //         {!loading && totalPages > 1 && (
// //           <div className="pagination">
// //             <button
// //               type="button"
// //               disabled={currentPage === 1}
// //               onClick={() =>
// //                 setCurrentPage((page) => page - 1)
// //               }
// //             >
// //               Previous
// //             </button>

// //             <span>
// //               Page {currentPage} of {totalPages}
// //             </span>

// //             <button
// //               type="button"
// //               disabled={currentPage === totalPages}
// //               onClick={() =>
// //                 setCurrentPage((page) => page + 1)
// //               }
// //             >
// //               Next
// //             </button>
// //           </div>
// //         )}
// //       </section>
// //     </div>
// //   );
// // }

// // export default App;



import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://www.impactmojo.in/api/v1/courses";

const courseImages = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
  "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600",
];

const sampleCourses = [
  { title: "React JS for Beginners", category: "Web Development", level: "Beginner", description: "Learn React components, props, state, and hooks." },
  { title: "JavaScript Fundamentals", category: "Programming", level: "Beginner", description: "Understand variables, functions, arrays, and objects." },
  { title: "Python Programming", category: "Programming", level: "Beginner", description: "Start programming with Python and practical examples." },
  { title: "Full Stack Web Development", category: "Web Development", level: "Intermediate", description: "Learn frontend and backend development concepts." },
  { title: "HTML and CSS Essentials", category: "Web Development", level: "Beginner", description: "Build and style responsive web pages." },
  { title: "Node.js and Express", category: "Backend Development", level: "Intermediate", description: "Create backend servers and REST APIs." },
  { title: "MongoDB Database Basics", category: "Database", level: "Beginner", description: "Learn document databases and CRUD operations." },
  { title: "Data Structures and Algorithms", category: "Computer Science", level: "Intermediate", description: "Practice essential data structures and algorithms." },
  { title: "Introduction to Artificial Intelligence", category: "Artificial Intelligence", level: "Beginner", description: "Explore AI concepts and real-world applications." },
  { title: "Machine Learning Basics", category: "Data Science", level: "Intermediate", description: "Understand model training and machine learning workflows." },
  { title: "Data Analytics with Python", category: "Data Science", level: "Intermediate", description: "Analyze data using Python and visualization tools." },
  { title: "SQL for Beginners", category: "Database", level: "Beginner", description: "Learn queries, filtering, joins, and aggregations." },
  { title: "UI and UX Design", category: "Design", level: "Beginner", description: "Learn interface design and user experience principles." },
  { title: "Cloud Computing Fundamentals", category: "Cloud Computing", level: "Beginner", description: "Discover cloud services and deployment concepts." },
  { title: "Cybersecurity Essentials", category: "Cybersecurity", level: "Beginner", description: "Learn security fundamentals and online safety." },
  { title: "Git and GitHub", category: "Developer Tools", level: "Beginner", description: "Manage source code with Git and GitHub." },
  { title: "TypeScript Essentials", category: "Programming", level: "Intermediate", description: "Write structured JavaScript using TypeScript." },
  { title: "REST API Development", category: "Backend Development", level: "Intermediate", description: "Design and build RESTful web services." },
  { title: "Responsive Web Design", category: "Web Development", level: "Beginner", description: "Create websites that work across screen sizes." },
  { title: "Introduction to Data Science", category: "Data Science", level: "Beginner", description: "Explore data analysis, visualization, and basic statistics." },
];

function App() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "",
    level: "Beginner",
    description: "",
  });

  const coursesPerPage = 6;

  useEffect(() => {
    async function loadCourses() {
      setLoading(true);
      setError("");

      const fallbackCourses = sampleCourses.map((course, index) => ({
        ...course,
        id: `sample-${index + 1}`,
        image: courseImages[index % courseImages.length],
      }));

      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();
        const apiCourses = Array.isArray(data.courses)
          ? data.courses
          : [];

        const normalizedCourses = apiCourses
          .filter((course) => course.title)
          .slice(0, 20)
          .map((course, index) => ({
            id: course.id || course.slug || `api-${index + 1}`,
            title: course.title,
            description:
              course.description ||
              "Explore this course and learn new skills.",
            category:
              course.track ||
              course.category ||
              course.category_name ||
              "General",
            level: course.level || "Beginner",
            image: courseImages[index % courseImages.length],
          }));

        const combinedCourses = [...normalizedCourses];

        fallbackCourses.forEach((course) => {
          if (combinedCourses.length >= 20) return;

          const exists = combinedCourses.some(
            (item) =>
              item.title.toLowerCase() === course.title.toLowerCase()
          );

          if (!exists) {
            combinedCourses.push(course);
          }
        });

        setCourses(combinedCourses.slice(0, 20));
      } catch (err) {
        setCourses(fallbackCourses);
        setError(
          "API courses could not be loaded. Showing 20 sample courses."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const search = searchTerm.toLowerCase();

    return (
      course.title.toLowerCase().includes(search) ||
      course.category.toLowerCase().includes(search) ||
      course.description.toLowerCase().includes(search) ||
      course.level.toLowerCase().includes(search)
    );
  });

  const totalPages = Math.ceil(
    filteredCourses.length / coursesPerPage
  );

  const startIndex = (currentPage - 1) * coursesPerPage;

  const currentCourses = filteredCourses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.title.trim() ||
      !form.category.trim() ||
      !form.description.trim()
    ) {
      setError("Please fill in all course fields.");
      setSuccess("");
      return;
    }

    const newCourse = {
      id: `custom-${Date.now()}`,
      title: form.title.trim(),
      category: form.category.trim(),
      level: form.level,
      description: form.description.trim(),
      image: courseImages[courses.length % courseImages.length],
    };

    setCourses((previousCourses) =>
      [newCourse, ...previousCourses].slice(0, 20)
    );

    setForm({
      title: "",
      category: "",
      level: "Beginner",
      description: "",
    });

    setSearchTerm("");
    setCurrentPage(1);
    setError("");
    setSuccess("Course added successfully!");
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    setSuccess("");
  }

  function changePage(page) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Course Finder</h1>
        <p>Discover courses and develop your skills.</p>
      </header>

      <main className="container">
        {/* 1. Add a New Course */}
        <section className="form-section">
          <h2>Add a New Course</h2>

          <form onSubmit={handleSubmit} className="course-form">
            <input
              type="text"
              name="title"
              placeholder="Course title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Course category"
              value={form.category}
              onChange={handleChange}
              required
            />

            <select
              name="level"
              value={form.level}
              onChange={handleChange}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <textarea
              name="description"
              placeholder="Course description"
              value={form.description}
              onChange={handleChange}
              required
            />

            <button type="submit" className="add-button">
              Add Course
            </button>
          </form>

          {success && (
            <p className="success-message">{success}</p>
          )}

          {error && (
            <p className="error-message">{error}</p>
          )}
        </section>

        {/* 2. Find Your Course */}
        <section className="search-section">
          <h2>Find Your Course</h2>

          <input
            type="text"
            placeholder="Search by title, category, or level..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />

          <p className="course-count">
            Showing {filteredCourses.length} matching course(s)
          </p>
        </section>

        {/* 3. Available Courses */}
        <section className="courses-section">
          <h2>Available Courses</h2>

          {loading && <p>Loading courses...</p>}

          {!loading && currentCourses.length === 0 && (
            <p>No courses found. Try another search.</p>
          )}

          {!loading && (
            <div className="course-grid">
              {currentCourses.map((course) => (
                <article className="course-card" key={course.id}>
                  <img
                    src={course.image}
                    alt={course.title}
                    className="course-image"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="course-content">
                    <span className="category">
                      {course.category}
                    </span>

                    <h3>{course.title}</h3>

                    <p className="description">
                      {course.description}
                    </p>

                    <p>
                      <strong>Level:</strong> {course.level}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => changePage(page)}
                  className={
                    currentPage === page ? "active-page" : ""
                  }
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Course Finder | Learn something new every day.</p>
      </footer>
    </div>
  );
}

export default App;