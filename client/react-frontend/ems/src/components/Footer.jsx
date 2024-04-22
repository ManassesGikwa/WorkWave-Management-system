import './Footer.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/about" activeClassName="active">
          About
        </NavLink>
        <NavLink to="/contact" activeClassName="active">
          Contact
        </NavLink>
      </div>
      <div className="footer-content">
        <p>
          Made with <span role="img" aria-label="heart">❤️</span> by Group 6
        </p>
        <p>
          &copy; {new Date().getFullYear()} Workwave. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
