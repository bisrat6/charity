import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Involved() {
  const handleCardClick = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Header />
      {/* Hero Section */}
      <div className="hero-wrapper">
        <section className="hero">
          <div className="hero-content">
            <p className="hero-subtitle">Get Involved</p>
            <h1>Build the Future Together</h1>
            <p>
              Your contribution becomes the cornerstone of transformation. Every
              gift matters, every action counts.
            </p>
          </div>
        </section>
      </div>

      {/* Main Options Section */}
      <section className="container">
        <div className="section-header text-center">
          <p className="section-label">Choose How to Help</p>
          <h2 className="section-title">Ways to Get Involved</h2>
          <p className="section-description">
            Whether through financial support or volunteering your time, there
            are many ways to make a difference.
          </p>
        </div>

        <div className="feature-grid">
          <div
            className="feature-card"
            style={{ cursor: 'pointer' }}
            onClick={() => handleCardClick('donate')}
          >
            <div className="card-header">
              <p className="card-label">Financial Support</p>
              <div className="card-icon">
                <i className="fas fa-hand-holding-usd"></i>
              </div>
            </div>
            <h3>Make a Donation</h3>
            <p>
              Support our programs with a one-time or monthly donation. Every
              contribution helps build stronger communities.
            </p>
          </div>

          <div
            className="feature-card"
            style={{ cursor: 'pointer' }}
            onClick={() => handleCardClick('volunteer')}
          >
            <div className="card-header">
              <p className="card-label">Give Your Time</p>
              <div className="card-icon">
                <i className="fas fa-hands-helping"></i>
              </div>
            </div>
            <h3>Become a Volunteer</h3>
            <p>
              Join our team and contribute your skills and time to make a direct
              impact in people's lives.
            </p>
          </div>

          <div
            className="feature-card"
            style={{ cursor: 'pointer' }}
            onClick={() => handleCardClick('other')}
          >
            <div className="card-header">
              <p className="card-label">More Options</p>
              <div className="card-icon">
                <i className="fas fa-heart"></i>
              </div>
            </div>
            <h3>Other Ways to Help</h3>
            <p>
              Spread the word, partner with us, or create a lasting legacy
              through planned giving.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="container" id="donate">
        <div className="section-header text-center">
          <p className="section-label">Make a Donation</p>
          <h2 className="section-title">Choose Your Contribution Level</h2>
          <p className="section-description">
            Every donation, regardless of size, makes a real difference in the
            lives of those we serve.
          </p>
        </div>

        <div className="donation-grid">
          {/* Donation Tier 1 */}
          <div className="donation-card">
            <div className="card-icon" style={{ marginBottom: '1rem' }}>
              <i className="fas fa-seedling"></i>
            </div>
            <p className="card-label">Foundation Level</p>
            <div className="donation-amount">$10</div>
            <h3 className="donation-title">The Pebble</h3>
            <p className="donation-description">
              Small but significant. Provides school supplies for one child, a
              week of meals for a family, or clean water for a day.
            </p>
            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Donate $10
            </button>
          </div>

          {/* Donation Tier 2 */}
          <div className="donation-card">
            <div className="card-icon" style={{ marginBottom: '1rem' }}>
              <i className="fas fa-tree"></i>
            </div>
            <p className="card-label">Building Level</p>
            <div className="donation-amount">$50</div>
            <h3 className="donation-title">The Brick</h3>
            <p className="donation-description">
              Building momentum. Funds medical care, emergency shelter for a
              week, or job training materials for someone rebuilding their life.
            </p>
            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Donate $50
            </button>
          </div>

          {/* Donation Tier 3 */}
          <div className="donation-card">
            <div className="card-icon" style={{ marginBottom: '1rem' }}>
              <i className="fas fa-monument"></i>
            </div>
            <p className="card-label">Support Level</p>
            <div className="donation-amount">$100</div>
            <h3 className="donation-title">The Pillar</h3>
            <p className="donation-description">
              Foundational support. Provides a month of housing assistance,
              comprehensive education materials, or startup funds for a
              micro-enterprise.
            </p>
            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Donate $100
            </button>
          </div>

          {/* Donation Tier 4 */}
          <div className="donation-card">
            <div className="card-icon" style={{ marginBottom: '1rem' }}>
              <i className="fas fa-crown"></i>
            </div>
            <p className="card-label">Transformational Level</p>
            <div className="donation-amount">$500+</div>
            <h3 className="donation-title">The Cornerstone</h3>
            <p className="donation-description">
              Maximum impact. Funds entire projects including building wells,
              establishing community centers, or creating sustainable income
              programs.
            </p>
            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Donate $500+
            </button>
          </div>
        </div>

        {/* Custom Amount */}
        <div className="text-center mt-3">
          <p style={{ color: 'var(--text-gray)', marginBottom: '1rem' }}>
            Or enter a custom amount:
          </p>
          <div
            style={{
              maxWidth: '400px',
              margin: '0 auto',
              display: 'flex',
              gap: '0.75rem',
            }}
          >
            <input
              type="number"
              className="form-input"
              placeholder="Enter amount"
              min="1"
              style={{ flex: 1 }}
            />
            <Link to="/campaigns" className="btn btn-primary">Donate</Link>
          </div>
          <p
            style={{
              color: 'var(--text-gray)',
              fontSize: '0.875rem',
              marginTop: '1rem',
            }}
          >
            <i className="fas fa-lock"></i> Secure payment | 100% goes to
            programs
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="content-section">
        <div className="container">
          <div className="section-header text-center">
            <p className="section-label">Our Impact</p>
            <h2 className="section-title">What Your Donations Have Achieved</h2>
            <p className="section-description">
              Every contribution from our donors has created real, measurable
              change in communities worldwide.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card text-center">
              <div className="card-icon" style={{ margin: '0 auto 1rem' }}>
                <i className="fas fa-users"></i>
              </div>
              <div
                className="donation-amount"
                style={{
                  color: 'var(--accent-blue)',
                  marginBottom: '0.5rem',
                }}
              >
                15,240
              </div>
              <h3>Lives Impacted</h3>
              <p>
                Individuals and families who have received direct support through
                our programs in 2024.
              </p>
            </div>

            <div className="feature-card text-center">
              <div className="card-icon" style={{ margin: '0 auto 1rem' }}>
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div
                className="donation-amount"
                style={{
                  color: 'var(--accent-blue)',
                  marginBottom: '0.5rem',
                }}
              >
                $2.3M
              </div>
              <h3>Funds Raised</h3>
              <p>
                Total contributions from donors like you, building foundations of
                hope and opportunity.
              </p>
            </div>

            <div className="feature-card text-center">
              <div className="card-icon" style={{ margin: '0 auto 1rem' }}>
                <i className="fas fa-project-diagram"></i>
              </div>
              <div
                className="donation-amount"
                style={{
                  color: 'var(--accent-blue)',
                  marginBottom: '0.5rem',
                }}
              >
                47
              </div>
              <h3>Active Projects</h3>
              <p>
                Ongoing initiatives creating sustainable change across multiple
                communities worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section className="container" id="volunteer">
        <div className="section-header text-center">
          <p className="section-label">Join Our Team</p>
          <h2 className="section-title">Become a Volunteer</h2>
          <p className="section-description">
            Your time and skills are just as valuable as financial
            contributions. Join our team making a direct difference in people's
            lives.
          </p>
        </div>

        <div className="form-container">
          <form>
            {/* Personal Information */}
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
              Personal Information
            </h3>

            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                className="form-input"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                className="form-input"
                placeholder="(555) 123-4567"
                required
              />
            </div>

            {/* Skills & Availability */}
            <h3
              style={{
                margin: '2rem 0 1.5rem',
                color: 'var(--text-dark)',
              }}
            >
              Skills & Availability
            </h3>

            <div className="form-group">
              <label htmlFor="skillset" className="form-label">
                Your Primary Skills *
              </label>
              <select id="skillset" className="form-select" required>
                <option value="">Select your primary skillset</option>
                <option value="construction">Construction & Building</option>
                <option value="teaching">Education & Teaching</option>
                <option value="healthcare">Healthcare & Medicine</option>
                <option value="technology">Technology & IT</option>
                <option value="finance">Finance & Accounting</option>
                <option value="marketing">Marketing & Communications</option>
                <option value="admin">Administration & Organization</option>
                <option value="fundraising">Fundraising & Development</option>
                <option value="legal">Legal Services</option>
                <option value="other">Other (please specify in message)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="availability" className="form-label">
                How Often Can You Volunteer? *
              </label>
              <select id="availability" className="form-select" required>
                <option value="">Select your availability</option>
                <option value="weekly">Once a Week</option>
                <option value="biweekly">Twice a Month</option>
                <option value="monthly">Once a Month</option>
                <option value="occasional">Occasional / Special Events</option>
                <option value="remote">Remote Only (Work from Home)</option>
                <option value="flexible">Flexible Schedule</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="interests" className="form-label">
                Areas of Interest
              </label>
              <textarea
                id="interests"
                className="form-textarea"
                placeholder="Tell us which programs or initiatives you're most interested in supporting (e.g., education, healthcare, community building)..."
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Additional Information
              </label>
              <textarea
                id="message"
                className="form-textarea"
                placeholder="Share anything else you'd like us to know about your background, experience, or why you want to volunteer with CORNERSTONE..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Submit Volunteer Application
            </button>

            <p
              style={{
                textAlign: 'center',
                color: 'var(--text-gray)',
                fontSize: '0.875rem',
                marginTop: '1rem',
              }}
            >
              * Required fields | We'll contact you within 48 hours to discuss
              volunteer opportunities
            </p>
          </form>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="container" id="other">
        <div className="section-header text-center">
          <p className="section-label">More Ways to Build</p>
          <h2 className="section-title">
            Beyond Donations & Volunteering
          </h2>
          <p className="section-description">
            There are many other ways you can support our mission and help us
            reach more people in need.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="card-header">
              <p className="card-label">Spread Awareness</p>
              <div className="card-icon">
                <i className="fas fa-share-alt"></i>
              </div>
            </div>
            <h3>Share Our Mission</h3>
            <p>
              Help us reach more people who want to make a difference. Share our
              campaigns on social media and tell your friends about CORNERSTONE.
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary" style={{ flex: 1 }}>
                <i className="fab fa-facebook"></i> Share
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }}>
                <i className="fab fa-twitter"></i> Tweet
              </button>
            </div>
          </div>

          <div className="feature-card">
            <div className="card-header">
              <p className="card-label">Business Partnership</p>
              <div className="card-icon">
                <i className="fas fa-briefcase"></i>
              </div>
            </div>
            <h3>Corporate Sponsorship</h3>
            <p>
              Does your company want to make an impact? We offer corporate
              sponsorship packages, employee engagement programs, and matching
              gift opportunities.
            </p>
            <button
              className="btn btn-secondary"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Learn More
            </button>
          </div>

          <div className="feature-card">
            <div className="card-header">
              <p className="card-label">Create a Legacy</p>
              <div className="card-icon">
                <i className="fas fa-gift"></i>
              </div>
            </div>
            <h3>Planned Giving</h3>
            <p>
              Build a foundation that lasts beyond your lifetime. Learn about
              planned giving, memorial funds, and creating a lasting legacy of
              hope.
            </p>
            <button
              className="btn btn-secondary"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Explore Options
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container">
        <div className="banner-section">
          <div className="banner-content">
            <h2>Ready to Make an Impact?</h2>
            <p>
              Every great foundation starts with a single contribution. Your
              support could change someone's life today.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: '1.5rem',
              }}
            >
              <Link to="/campaigns" className="btn btn-primary">
                Make a Donation
              </Link>
              <Link to="/volunteer/apply" className="btn btn-secondary">
                Become a Volunteer
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Involved
