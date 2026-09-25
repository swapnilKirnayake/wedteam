import { useState } from "react";
import {
  Search,
  MapPin,
  ShoppingBag,
  Menu,
  X,
  ChevronRight
} from "lucide-react";

import professionals from "./data/professionals";

const categories = [
  "All",
  "Planner",
  "Photographer",
  "Videographer",
  "Makeup Artist",
  "Decorator",
  "Caterer",
  "DJ",
  "Choreographer"
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [team, setTeam] = useState([]);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredProfessionals = professionals.filter((person) => {
    const matchesCategory =
      selectedCategory === "All" ||
      person.category.toLowerCase() === selectedCategory.toLowerCase();

    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      searchValue === "" ||
      person.name.toLowerCase().includes(searchValue) ||
      person.role.toLowerCase().includes(searchValue) ||
      person.location.toLowerCase().includes(searchValue) ||
      person.skills.some((skill) =>
        skill.toLowerCase().includes(searchValue)
      );

    return matchesCategory && matchesSearch;
  });

  const addToTeam = (person) => {
    setTeam((currentTeam) => {
      if (currentTeam.some((member) => member.id === person.id)) {
        return currentTeam;
      }

      return [...currentTeam, person];
    });
  };

  const removeFromTeam = (id) => {
    setTeam((currentTeam) =>
      currentTeam.filter((person) => person.id !== id)
    );
  };

  const total = team.reduce(
    (sum, person) => sum + person.price,
    0
  );

  return (
    <div className="app">
      {/* HEADER */}

      <header className="header">
        <div className="brand">
          <div className="brand-mark">W</div>

          <div>
            <div className="brand-name">WedTeam</div>

            <div className="brand-tagline">
              People for your perfect day
            </div>
          </div>
        </div>

        <nav className="desktop-nav">
          <a className="active" href="#professionals">
            Find Professionals
          </a>

          <a href="#how-it-works">
            How It Works
          </a>

          <a href="#real-weddings">
            Real Weddings
          </a>
        </nav>

        <div className="header-actions">
          <div className="location">
            <MapPin size={15} />
            <span>Mumbai</span>
          </div>

          <button className="account-button">
            S
          </button>

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Open menu"
          >
            {menuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}

      {menuOpen && (
        <div className="mobile-menu">
          <a href="#professionals">Find Professionals</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#real-weddings">Real Weddings</a>
        </div>
      )}

      <main>
        {/* HERO */}

        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              WEDDING PROFESSIONALS
            </span>

            <h1>
              Build your
              <br />
              wedding team.
            </h1>

            <p>
              Find talented professionals and create the
              perfect team for your wedding, one person at
              a time.
            </p>
          </div>

          <div className="search-area">
            <div className="search-box">
              <Search size={20} />

              <input
                type="text"
                placeholder="Search by name, skill, or service..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <div className="search-location">
              <MapPin size={18} />
              <span>Mumbai</span>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}

        <section
          className="content"
          id="professionals"
        >
          <div className="main-column">
            <div className="section-header">
              <div>
                <span className="eyebrow">
                  DISCOVER
                </span>

                <h2>
                  Top professionals
                </h2>
              </div>

              <div className="result-count">
                {filteredProfessionals.length}{" "}
                professionals
              </div>
            </div>

            {/* CATEGORIES */}

            <div className="category-list">
              {categories.map((category) => (
                <button
                  key={category}
                  className={
                    selectedCategory === category
                      ? "category active"
                      : "category"
                  }
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                >
                  {category}
                </button>
              ))}
            </div>

            {/* PROFESSIONAL GRID */}

            <div className="professional-grid">
              {filteredProfessionals.length === 0 ? (
                <div className="no-results">
                  <h3>
                    No professionals found
                  </h3>

                  <p>
                    Try another name, skill, or
                    category.
                  </p>
                </div>
              ) : (
                filteredProfessionals.map(
                  (person) => {
                    const alreadyAdded =
                      team.some(
                        (member) =>
                          member.id === person.id
                      );

                    return (
                      <article
                        className="professional-card"
                        key={person.id}
                      >
                        {/* IMAGE */}

                        <div className="card-image-wrapper">
                          <img
                            src={person.image}
                            alt={person.name}
                            className="card-image"
                          />

                          <div className="rating">
                            ★ {person.rating}
                          </div>
                        </div>

                        {/* CARD CONTENT */}

                        <div className="card-content">
                          <div className="card-role">
                            {person.role}
                          </div>

                          <h3>
                            {person.name}
                          </h3>

                          <div className="card-meta">
                            <span>
                              {person.location}
                            </span>

                            <span>·</span>

                            <span>
                              {person.reviews} reviews
                            </span>
                          </div>

                          <div className="card-skills">
                            {person.skills
                              .slice(0, 2)
                              .map((skill) => (
                                <span
                                  key={skill}
                                >
                                  {skill}
                                </span>
                              ))}
                          </div>

                          <div className="card-footer">
                            <div>
                              <strong>
                                ₹
                                {person.price.toLocaleString()}
                              </strong>

                              <span>
                                / hour
                              </span>
                            </div>

                            <button
                              className={
                                alreadyAdded
                                  ? "add-button added"
                                  : "add-button"
                              }
                              onClick={() =>
                                alreadyAdded
                                  ? removeFromTeam(
                                      person.id
                                    )
                                  : addToTeam(person)
                              }
                            >
                              {alreadyAdded
                                ? "Added ✓"
                                : "+ Add"}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  }
                )
              )}
            </div>
          </div>

          {/* TEAM SIDEBAR */}

          <aside className="team-sidebar">
            <div className="team-header">
              <div>
                <span className="eyebrow">
                  YOUR SELECTION
                </span>

                <h2>
                  My Wedding Team
                </h2>
              </div>

              <div className="team-count">
                <ShoppingBag size={16} />
                {team.length}
              </div>
            </div>

            {team.length === 0 ? (
              <div className="empty-team">
                <div className="empty-icon">
                  <ShoppingBag size={24} />
                </div>

                <h3>
                  Your team is empty
                </h3>

                <p>
                  Add professionals to start
                  building your wedding team.
                </p>
              </div>
            ) : (
              <>
                <div className="team-list">
                  {team.map((person) => (
                    <div
                      className="team-member"
                      key={person.id}
                    >
                      <img
                        src={person.image}
                        alt={person.name}
                      />

                      <div className="member-info">
                        <strong>
                          {person.name}
                        </strong>

                        <span>
                          {person.role}
                        </span>

                        <small>
                          ₹
                          {person.price.toLocaleString()}
                          /hr
                        </small>
                      </div>

                      <button
                        className="remove-button"
                        onClick={() =>
                          removeFromTeam(
                            person.id
                          )
                        }
                        aria-label={`Remove ${person.name}`}
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="team-total">
                  <span>
                    Estimated hourly total
                  </span>

                  <strong>
                    ₹{total.toLocaleString()}
                  </strong>
                </div>

                <button className="contact-button">
                  Get Contact Details
                  <ChevronRight size={18} />
                </button>

                <p className="contact-note">
                  Contact details will be shown
                  after confirmation.
                </p>
              </>
            )}

            {/* TRUST */}

            <div className="trust-card">
              <span className="eyebrow">
                WHY WEDTEAM
              </span>

              <h3>
                Build the team you actually
                want.
              </h3>

              <ul>
                <li>
                  Verified professionals
                </li>

                <li>
                  Choose people individually
                </li>

                <li>
                  Direct contact after
                  confirmation
                </li>

                <li>
                  Flexible and transparent
                  pricing
                </li>
              </ul>
            </div>
          </aside>
        </section>

        {/* SIMPLE FOOTER */}

        <footer className="footer">
          <div>
            <strong>WedTeam</strong>
            <span>
              Build your perfect wedding team.
            </span>
          </div>

          <span>
            © 2026 WedTeam
          </span>
        </footer>
      </main>
    </div>
  );
}

export default App;
