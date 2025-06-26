import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ logo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="logo-link">
          <img 
            src={logo} 
            alt="The House of Cake Logo" 
            className="navbar-logo" 
          />
        </NavLink>

        {/* Mobile menu button */}
        <button 
          className={`mobile-menu-button ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="menu-icon-bar"></span>
          <span className="menu-icon-bar"></span>
          <span className="menu-icon-bar"></span>
        </button>

        {/* Navigation links */}
        <ul className={`navbar-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <li>
            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/shop" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;