import { NavLink } from 'react-router-dom'
import './App.css';
import Avatar from '@mui/material/Avatar';

export const Navbar = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'none' : 'normal',
      textDecoration: isActive ? 'bold' : 'normal',
      color: isActive ? '#ff68f0' : 'black',
    }
  }

  return (
    <nav className="primary-nav">
      <div className="nav-left">
        <Avatar
          src="/notes.png"
          sx={{ width: 75, height: 75 }}
        />
        <NavLink to="/wordcloud" style={navLinkStyles}>
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
      </div>
    </nav>
  )
}