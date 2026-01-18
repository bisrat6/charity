import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function About() {
  return (
    <>
      <Header />
      {/* Hero Section */}
      <div className="hero-wrapper">
        <section className="hero">
          <div className="hero-content">
            <p className="hero-subtitle">Our Story</p>
            <h1>The Foundation of Hope</h1>
            <p>
              Built on the principle that every contribution can transform
              lives.
            </p>
          </div>
        </section>
      </div>

      {/* About Content */}
      <section className="content-section">
        <div className="content-wrapper">
          <div className="section-header">
            <p className="section-label">Our Philosophy</p>
            <h2 className="section-title">From Small Acts to Big Impact</h2>
          </div>

          <div className="quote-block">
            "The stone that the builders rejected has become the cornerstone."
            <div className="quote-reference">— Psalm 118:22</div>
          </div>

          <p>
            This ancient wisdom forms the bedrock of our mission. Just as a
            cornerstone is the first stone set in the construction of a
            foundation, we believe that every act of kindness, every donation,
            every moment of compassion becomes the foundation upon which lives
            are rebuilt.
          </p>

          <p>
            Founded in 2020, CORNERSTONE emerged from a simple truth:
            transformation doesn't require grand gestures. It requires
            consistent, compassionate action. Small contributions create mighty
            structures when combined with purpose and dedication.
          </p>

          <h3 className="mt-3">What We Build</h3>

          <p>
            <strong>Foundations of Education:</strong> We provide school
            supplies, scholarships, and learning resources to children in
            underserved communities, building the foundation for future success.
          </p>

          <p>
            <strong>Structures of Stability:</strong> Through emergency shelter
            programs and transitional housing, we create safe havens for
            families rebuilding their lives.
          </p>

          <p>
            <strong>Wells of Wellness:</strong> Clean water, healthcare access,
            and nutrition programs form the foundation of healthy communities.
          </p>

          <p>
            <strong>Pillars of Empowerment:</strong> Job training, microfinance
            initiatives, and entrepreneurship programs give people the tools to
            build their own futures.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="container">
        <div className="section-header">
          <p className="section-label">Meet Our Team</p>
          <h2 className="section-title">The People Behind CORNERSTONE</h2>
          <p className="section-description">
            Dedicated individuals working together to build a better world, one
            contribution at a time.
          </p>
        </div>

        <div className="team-grid">
          <div className="team-member">
            <div className="team-photo">
              <i className="fas fa-user" aria-hidden="true"></i>
            </div>
            <h3 className="team-name">Bisrat Beriso</h3>
            <p className="team-role">Founder & CEO</p>
            <p className="team-bio">
              With 20 years in community development, Bisrat founded CORNERSTONE
              driven by a vision of transformational giving.
            </p>
          </div>

          <div className="team-member">
            <div className="team-photo">
              <i className="fas fa-user" aria-hidden="true"></i>
            </div>
            <h3 className="team-name">Bethe Bayou</h3>
            <p className="team-role">Director of Programs</p>
            <p className="team-bio">
              Bethe oversees all charitable programs, ensuring every dollar
              builds lasting impact.
            </p>
          </div>

          <div className="team-member">
            <div className="team-photo">
              <i className="fas fa-user" aria-hidden="true"></i>
            </div>
            <h3 className="team-name">Abreham Nigus</h3>
            <p className="team-role">Chief Financial Officer</p>
            <p className="team-bio">
              Abreham ensures financial integrity and transparency in all our
              operations.
            </p>
          </div>

          <div className="team-member">
            <div className="team-photo">
              <i className="fas fa-user" aria-hidden="true"></i>
            </div>
            <h3 className="team-name">Rachel Pillar</h3>
            <p className="team-role">Outreach Director</p>
            <p className="team-bio">
              Rachel connects donors with causes, building bridges between
              compassion and action.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container">
        <div className="section-header">
          <p className="section-label">Our Values</p>
          <h2 className="section-title">The Principles We Build Upon</h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="card-header">
              <p className="card-label">Transparency</p>
              <div className="card-icon">
                <i className="fas fa-eye"></i>
              </div>
            </div>
            <h3>Full Visibility</h3>
            <p>
              We maintain complete transparency in how donations are used and the
              impact they create.
            </p>
          </div>

          <div className="feature-card">
            <div className="card-header">
              <p className="card-label">Integrity</p>
              <div className="card-icon">
                <i className="fas fa-check-circle"></i>
              </div>
            </div>
            <h3>Honest Work</h3>
            <p>We operate with unwavering ethical standards in all we do.</p>
          </div>

          <div className="feature-card">
            <div className="card-header">
              <p className="card-label">Sustainability</p>
              <div className="card-icon">
                <i className="fas fa-globe"></i>
              </div>
            </div>
            <h3>Built to Last</h3>
            <p>
              Our programs create long-term, sustainable change rather than
              temporary fixes.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container">
        <div className="banner-section">
          <div className="banner-content">
            <h2>Join Our Foundation</h2>
            <p>
              Your contribution, your time, your voice—each becomes part of the
              foundation we're building together.
            </p>
            <Link to="/involved" className="btn btn-primary">
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default About
