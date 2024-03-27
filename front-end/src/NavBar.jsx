import { NavLink } from 'react-router-dom'
import './App.css';

export const Navbar = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'none' : 'normal',
      textDecoration: isActive ? 'bold' : 'normal',
      color: isActive ? '#1DB954' : 'white',
    }
  }

  return (
    <nav className="primary-nav">
      <div className="nav-left">
        <NavLink to="/" style={navLinkStyles}>
          WordCloud
        </NavLink>
        <NavLink to="/songgeneration" style={navLinkStyles}>
          Recommendation
        </NavLink>
      </div>
      <div className="nav-right">
        <NavLink to="/songsearch" style={navLinkStyles}>
          Search
        </NavLink>
        <NavLink to="/myprofile" style={navLinkStyles}>
          Profile
        </NavLink>
        <NavLink to="/signin" style={navLinkStyles}>
          Sign-In
        </NavLink>
      </div>
    </nav>
  )
}