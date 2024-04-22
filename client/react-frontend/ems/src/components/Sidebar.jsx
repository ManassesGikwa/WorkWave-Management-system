import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close the sidebar when a link is clicked
  };

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
      <div className="menu-btn" onClick={toggleSidebar}>
        <div className={isOpen ? 'close-icon' : 'menu-icon'}>
          {isOpen ? (
            <>
              <div className="close-line" />
              <div className="close-line" />
            </>
          ) : (
            <>
              <div className="menu-line" />
              <div className="menu-line" />
              <div className="menu-line" />
            </>
          )}
        </div>
      </div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul className="menu-items">
          <li>
            <Link to="#" onClick={handleLinkClick}>
              Employees
              <ul className={`submenu ${isOpen ? 'open' : ''}`}>
                <li><Link to="/employees">Employee List</Link></li>
                <li><Link to="/employees/add">Add Employee</Link></li>
                <li><Link to="/employees/:id">View Employee Details</Link></li>
                <li><Link to="/employees/:id/edit">Edit Employee</Link></li>
                <li><Link to="/employees/:id/delete">Delete Employee</Link></li>
              </ul>
            </Link>
          </li>
          <li>
            <Link to="#" onClick={handleLinkClick}>
              Departments
              <ul className={`submenu ${isOpen ? 'open' : ''}`}>
                <li><Link to="/departments">Department List</Link></li>
                <li><Link to="/departments/add">Add Department</Link></li>
                <li><Link to="/departments/:id">View Department Details</Link></li>
                <li><Link to="/departments/:id/edit">Edit Department</Link></li>
                <li><Link to="/departments/:id/delete">Delete Department</Link></li>
              </ul>
            </Link>
          </li>
          <li>
            <Link to="#" onClick={handleLinkClick}>
              Managers
              <ul className={`submenu ${isOpen ? 'open' : ''}`}>
                <li><Link to="/managers">Manager List</Link></li>
                <li><Link to="/managers/add">Add Manager</Link></li>
                <li><Link to="/managers/:id">View Manager Details</Link></li>
                <li><Link to="/managers/:id/edit">Edit Manager</Link></li>
                <li><Link to="/managers/:id/delete">Delete Manager</Link></li>
              </ul>
            </Link>
          </li>
          <li>
            <Link to="#" onClick={handleLinkClick}>
              Projects
              <ul className={`submenu ${isOpen ? 'open' : ''}`}>
                <li><Link to="/projects">Project List</Link></li>
                <li><Link to="/projects/add">Add Project</Link></li>
                <li><Link to="/projects/:id">View Project Details</Link></li>
                <li><Link to="/projects/:id/edit">Edit Project</Link></li>
                <li><Link to="/projects/:id/delete">Delete Project</Link></li>
              </ul>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
