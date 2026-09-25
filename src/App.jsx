import { useState } from "react";
import {
  Search,
  MapPin,
  ShoppingBag,
  Menu,
  X,
  ChevronRight
} from "lucide-react";

const professionals = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Wedding Planner",
    location: "Mumbai",
    rating: 4.9,
    reviews: 120,
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Priya Mehta",
    role: "Photographer",
    location: "Mumbai",
    rating: 4.8,
    reviews: 95,
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Arjun Verma",
    role: "Videographer",
    location: "Mumbai",
    rating: 4.7,
    reviews: 68,
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Anjali Kapoor",
    role: "Makeup Artist",
    location: "Mumbai",
    rating: 4.8,
    reviews: 92,
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Karan Decorators",
    role: "Wedding Decorator",
    location: "Mumbai",
    rating: 4.8,
    reviews: 74,
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Spice Events",
    role: "Wedding Caterer",
    location: "Mumbai",
    rating: 4.7,
    reviews: 61,
    price: 1600,
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "DJ Nikhil",
    role: "DJ & Music",
    location: "Mumbai",
    rating: 4.9,
    reviews: 87,
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1571266028243-d220c9c3b1e4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "Riya Dance Studio",
    role: "Choreographer",
    location: "Mumbai",
    rating: 4.8,
    reviews: 53,
    price: 1300,
    image:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=800&q=80"
  }
];

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
      person.role.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      person.name.toLowerCase().includes(search.toLowerCase()) ||
      person.role.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const addToTeam = (person) => {
    setTeam((current) => {
      if (current.some((member) => member.id === person.id)) {
        return current;
      }

      return [...current, person];
    });
  };

  const removeFromTeam = (id) => {
    setTeam((current) => current.filter((person) => person.id !== id));
  };

  const total = team.reduce((sum, person) => sum + person.price, 0);

  return (
    <div className="app">
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
          <a href="#how-it-works">How It Works</a>
          <a href="#real-weddings">Real Weddings</a>
        </nav>

        <div className="header-actions">
          <div className="location">
            <MapPin size={15} />
            <span>Mumbai</span>
          </div>

          <button className="account-button">S</button>

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <a href="#professionals">Find Professionals</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#real-weddings">Real Weddings</a>
        </div>
      )}

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">WEDDING PROFESSIONALS</span>

            <h1>
              Build your
              <br />
              wedding team.
            </h1>

            <p>
              Find talented professionals and create the perfect team
              for your wedding, one person at a time.
            </p>
          </div>

          <div className="search-area">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search by name, skill, or service..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="search-location">
              <MapPin size={18} />
              <span>Mumbai</span>
            </div>
          </div>
        </section>

        <section className="content" id="professionals">
          <div className="main-column">
            <div className="section-header">
              <div>
                <span className="eyebrow">DISCOVER</span>
                <h2>Top professionals</h2>
              </div>

              <div className="result-count">
                {filteredProfessionals.length} professionals
              </div>
            </div>

            <div className="category-list">
              {categories.map((category) => (
                <button
                  key={category}
                  className={
                    selectedCategory === category
                      ? "category active"
                      : "category"
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="professional-grid">
              {filteredProfessionals.map((person) => {
                const alreadyAdded = team.some(
                  (member) => member.id === person.id
                );

                return (
                  <article className="professional-card" key={person.id}>
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

                    <div className="card-content">
                      <div className="card-role">{person.role}</div>

                      <h3>{person.name}</h3>

                      <div className="card-meta">
                        <span>{person.location}</span>
                        <span>·</span>
                        <span>{person.reviews} reviews</span>
                      </div>

                      <div className="card-footer">
                        <div>
                          <strong>₹{person.price.toLocaleString()}</strong>
                          <span>/ hour</span>
                        </div>

                        <button
                          className={
                            alreadyAdded
                              ? "add-button added"
                              : "add-button"
                          }
                          onClick={() =>
                            alreadyAdded
                              ? removeFromTeam(person.id)
                              : addToTeam(person)
                          }
                        >
                          {alreadyAdded ? "Added ✓" : "+ Add"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="team-sidebar">
            <div className="team-header">
              <div>
                <span className="eyebrow">YOUR SELECTION</span>
                <h2>My Wedding Team</h2>
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

                <h3>Your team is empty</h3>

                <p>
                  Add professionals to start building your wedding
                  team.
                </p>
              </div>
            ) : (
              <>
                <div className="team-list">
                  {team.map((person) => (
                    <div className="team-member" key={person.id}>
                      <img src={person.image} alt={person.name} />

                      <div className="member-info">
                        <strong>{person.name}</strong>
                        <span>{person.role}</span>
                        <small>
                          ₹{person.price.toLocaleString()}/hr
                        </small>
                      </div>

                      <button
                        className="remove-button"
                        onClick={() => removeFromTeam(person.id)}
                        aria-label={`Remove ${person.name}`}
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="team-total">
                  <span>Estimated hourly total</span>
                  <strong>₹{total.toLocaleString()}</strong>
                </div>

                <button className="contact-button">
                  Get Contact Details
                  <ChevronRight size={18} />
                </button>

                <p className="contact-note">
                  Contact details will be shown after confirmation.
                </p>
              </>
            )}

            <div className="trust-card">
              <span className="eyebrow">WHY WEDTEAM</span>

              <h3>Build the team you actually want.</h3>

              <ul>
                <li>Verified professionals</li>
                <li>Choose people individually</li>
                <li>Direct contact after confirmation</li>
                <li>Flexible and transparent pricing</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default App;
