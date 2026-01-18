import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname === path
  }

  return (
    <header className="header">
      <nav className="nav-container">
        <Link to="/" className="logo">
          CORNERSTONE
        </Link>
        <button
          className="nav-toggle"
          aria-label="Open menu"
          aria-expanded="false"
        >
          <span className="hamburger" aria-hidden="true"></span>
        </button>
        <ul className="nav-menu">
          <li>
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              How it works
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              For charities
            </Link>
          </li>
          <li>
            <Link
              to="/involved"
              className={`nav-link ${isActive('/involved') ? 'active' : ''}`}
            >
              For individuals
            </Link>
          </li>
          <li>
            <Link
              to="/signin"
              className={`nav-link ${isActive('/signin') ? 'active' : ''}`}
            >
              Sign in
            </Link>
          </li>
          <li>
            <Link to="/involved" className="btn btn-primary">
              Get Start
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
