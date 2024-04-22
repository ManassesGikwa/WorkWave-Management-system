// FeaturesSection.js
import './Features.css';

const FeaturesSection = () => {
  return (
    <div className="features-section">
      <h2 className="section-title">Key Features</h2>
      <div className="feature">
        <div className="feature-card">
          <h3>View Employees</h3>
          <p>Access detailed information about all employees.</p>
        </div>
      </div>
      <div className="feature">
        <div className="feature-card">
          <h3>View Projects</h3>
          <p>Explore project details and progress.</p>
        </div>
      </div>
      <div className="feature">
        <div className="feature-card">
          <h3>View Departments</h3>
          <p>Manage departments and their associated data.</p>
        </div>
      </div>
      <div className="feature">
        <div className="feature-card">
          <h3>View Managers</h3>
          <p>Track managerial roles and responsibilities.</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
