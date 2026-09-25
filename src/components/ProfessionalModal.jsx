import {
  X,
  MapPin,
  Star,
  Briefcase,
  Clock,
  Plus,
  Check
} from "lucide-react";

function ProfessionalModal({
  professional,
  isAdded,
  onClose,
  onAdd,
  onRemove
}) {
  if (!professional) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="professional-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close profile"
        >
          <X size={18} />
        </button>

        <div className="modal-image">
          <img
            src={professional.image}
            alt={professional.name}
          />

          <div className="modal-rating">
            <Star size={13} fill="currentColor" />
            {professional.rating}
          </div>
        </div>

        <div className="modal-content">
          <span className="modal-role">
            {professional.role}
          </span>

          <h2>{professional.name}</h2>

          <div className="modal-location">
            <MapPin size={14} />
            {professional.location}
          </div>

          <p className="modal-description">
            {professional.name} is a verified wedding
            professional specializing in{" "}
            {professional.skills.join(", ").toLowerCase()}.
            They have worked across weddings and events in
            Mumbai and surrounding areas.
          </p>

          <div className="modal-stats">
            <div>
              <Briefcase size={16} />

              <strong>
                {professional.events}+
              </strong>

              <span>Events</span>
            </div>

            <div>
              <Clock size={16} />

              <strong>
                {professional.experience}
              </strong>

              <span>Experience</span>
            </div>

            <div>
              <Star size={16} />

              <strong>
                {professional.rating}
              </strong>

              <span>
                {professional.reviews} reviews
              </span>
            </div>
          </div>

          <div className="modal-section">
            <span className="modal-section-title">
              Skills
            </span>

            <div className="modal-skills">
              {professional.skills.map((skill) => (
                <span key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-bottom">
            <div className="modal-price">
              <strong>
                ₹{professional.price.toLocaleString()}
              </strong>

              <span>/ hour</span>
            </div>

            <button
              className={
                isAdded
                  ? "modal-add-button added"
                  : "modal-add-button"
              }
              onClick={() =>
                isAdded
                  ? onRemove(professional.id)
                  : onAdd(professional)
              }
            >
              {isAdded ? (
                <>
                  <Check size={16} />
                  Added to Team
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Add to Team
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalModal;
