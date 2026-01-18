import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>CORNERSTONE</h3>
          <p>
            Building foundations for brighter futures. Every contribution
            matters, every life is valuable.
          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/involved">Get Involved</Link>
          <a href="/#features">Featured Campaigns</a>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@cornerstone.org</p>
          <p>Phone: (555) 123-4567</p>
          <p>Address: 123 Foundation Street</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <a href="#">
            <i className="fab fa-facebook"></i> Facebook
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i> Instagram
          </a>
          <a href="#">
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 CORNERSTONE Foundation. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
