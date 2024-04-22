import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <h1>WorkWave</h1>
      <ul>
        <li>
          <NavLink exact to="/" aria-label="Home page" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" aria-label="About us page" activeClassName="active">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" aria-label="Contact us page" activeClassName="active">
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
