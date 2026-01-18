import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Header />
      {/* Hero Section */}
      <div className="hero-wrapper">
        <section className="hero">
          <div className="hero-content">
            <p className="hero-subtitle">Make your Impact</p>
            <h1>Help fund it here.</h1>
            <Link to="/involved" className="btn btn-white">
              Start fundraising
            </Link>
          </div>
        </section>
      </div>

      {/* Featured Topics Section */}
      <section className="container">
        <div className="section-header">
          <p className="section-label">Featured topics</p>
          <h2 className="section-title">Make a difference today</h2>
        </div>

        <div className="feature-grid">
          {/* Feature Card 1 */}
          <div className="feature-card">
            <div className="card-header">
              <p className="card-label">Start fundraising</p>
              <div className="card-icon">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
            <h3>Raise money for charity</h3>
            <p>
              Choose from over 20,000 charities, and find the ones directly in
              Mum.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="feature-card">
            <div className="card-header">
              <p className="card-label">Browse charities</p>
              <div className="card-icon">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
            <h3>Donate to charity</h3>
            <p>Support a charity with 0 cost of a monthly donation.</p>
          </div>

          {/* Feature Card 3 */}
          <div className="feature-card">
            <div className="card-header">
              <p className="card-label">Start crowdfunding</p>
              <div className="card-icon">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
            <h3>Raise money for your own cause</h3>
            <p>We help when you launch your own campaign funding account.</p>
          </div>
        </div>
      </section>

      {/* Sidebar-style Sections */}
      <section className="container">
        <div className="feature-grid">
          {/* Make a difference today section */}
          <div className="sidebar-section" style={{ gridColumn: 'span 2' }}>
            <h2>Make a difference today</h2>
            <div className="mini-cards">
              <div className="mini-card">
                <div className="mini-card-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <h4>Raise money for charity</h4>
                <p>Support from over 20,000 charities and individuals</p>
              </div>
              <div className="mini-card">
                <div className="mini-card-icon">
                  <i className="fas fa-user"></i>
                </div>
                <h4>Donate to charity</h4>
                <p>Support a charity with cost of a monthly donation</p>
              </div>
              <div className="mini-card">
                <div className="mini-card-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h4>Raise money for your own cause</h4>
                <p>We help when you launch your campaign funding</p>
              </div>
            </div>
          </div>

          {/* What to expect section */}
          <div className="sidebar-section">
            <h2>What to expect</h2>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-icon">
                  <i className="fas fa-pencil-alt"></i>
                </div>
                <div className="step-content">
                  <h4>Start with the basics</h4>
                  <p>Share why you are raising money</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-icon">
                  <i className="fas fa-wrench"></i>
                </div>
                <div className="step-content">
                  <h4>Craft your story</h4>
                  <p>Create the page in minutes</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="step-content">
                  <h4>Share with friends and family</h4>
                  <p>Encourage people to donate and share</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Play Your Part Section */}
      <section className="container">
        <div className="sidebar-section">
          <h2>Play Your Part</h2>
          <p>
            Support by donations and more, but people who are looking for their
            dream future. Everyone deserves to achieve their ideas without being
            held back by lack of funds.
          </p>
          <button className="btn btn-primary mt-2">Explore now</button>
          <div className="image-grid">
            <div
              className="image-grid-item"
              role="img"
              aria-label="Volunteers building together"
              style={{
                background:
                  "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center/cover",
                backgroundSize: 'cover',
              }}
            ></div>
            <div
              className="image-grid-item"
              role="img"
              aria-label="Community planting and care"
              style={{
                background:
                  "url('https://i.pinimg.com/736x/6b/16/cf/6b16cf9c076b98d1df1c9d333dcbca5d.jpg') center/cover",
                backgroundSize: 'cover',
              }}
            ></div>
            <div
              className="image-grid-item"
              role="img"
              aria-label="Volunteer group smiling"
              style={{
                background:
                  "url('https://i.pinimg.com/736x/96/59/b6/9659b6909a3416d27c50c875e00a403a.jpg') center/cover",
                backgroundSize: 'cover',
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* Your Story Starts Here */}
      <section className="container">
        <div
          className="banner-section"
          style={{
            background:
              "linear-gradient(135deg, rgba(91, 141, 238, 0.15), rgba(74, 144, 226, 0.25)), url('https://i.pinimg.com/1200x/9a/f1/bc/9af1bcd0ea6ca61e47ec3add2709bcdf.jpg') center/cover",
          }}
        >
          <div className="banner-content">
            <h2 style={{ color: 'white' }}>Your story starts here</h2>
            <button className="btn btn-white">Start fundraising</button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home
