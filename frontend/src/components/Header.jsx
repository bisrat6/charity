import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname === path
  }

  const handleLogout = () => {
    logout()
    navigate('/')
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
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                >
                  Dashboard
                </Link>
              </li>
              {user?.role === 'admin' && (
                <li>
                  <Link
                    to="/admin/dashboard"
                    className={`nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
                  >
                    Admin
                  </Link>
                </li>
              )}
              <li>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <span style={{ fontSize: '0.875rem', color: '#666' }}>
                    {user?.fullName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="btn btn-primary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                  >
                    Logout
                  </button>
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/signin"
                  className={`nav-link ${isActive('/signin') ? 'active' : ''}`}
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link to="/signup" className="btn btn-primary">
                  Get Started
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
