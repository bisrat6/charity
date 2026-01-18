import { Link } from 'react-router-dom'
import Header from '../components/Header'

function SignIn() {
  return (
    <>
      <Header />
      {/* Split Screen Sign In */}
      <div className="signin-wrapper">
        {/* Left Side - Welcome Message & Features */}
        <div className="signin-left">
          <div className="signin-left-content">
            <h1>Welcome Back to CORNERSTONE</h1>
            <p>
              We're glad to see you again! Sign in to continue making a
              difference in the lives of those who need it most. Your impact
              matters, and together we're building foundations for brighter
              futures.
            </p>

            {/* Features List */}
            <div className="signin-features">
              <div className="signin-feature">
                <div className="signin-feature-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="signin-feature-text">
                  <h4>Track Your Impact</h4>
                  <p>See how your contributions are changing lives</p>
                </div>
              </div>

              <div className="signin-feature">
                <div className="signin-feature-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <div className="signin-feature-text">
                  <h4>Manage Donations</h4>
                  <p>Easy access to your giving history and receipts</p>
                </div>
              </div>

              <div className="signin-feature">
                <div className="signin-feature-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="signin-feature-text">
                  <h4>Join the Community</h4>
                  <p>Connect with other changemakers worldwide</p>
                </div>
              </div>
            </div>

            <p
              style={{
                marginTop: '3rem',
                fontSize: '0.9375rem',
                opacity: 0.8,
              }}
            >
              <i className="fas fa-quote-left"></i>
              "The stone that the builders rejected has become the cornerstone." -
              Psalm 118:22
            </p>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="signin-right">
          <div className="signin-container">
            {/* Header */}
            <div className="signin-header">
              <h1>Sign In</h1>
              <p>Enter your credentials to access your account</p>
            </div>

            {/* Social Sign In Buttons */}
            <div className="social-signin-buttons">
              <button className="btn-social btn-google">
                <i className="fab fa-google"></i>
                <span>Continue with Google</span>
              </button>
              <button className="btn-social btn-facebook">
                <i className="fab fa-facebook"></i>
                <span>Continue with Facebook</span>
              </button>
              <button className="btn-social btn-apple">
                <i className="fab fa-apple"></i>
                <span>Continue with Apple</span>
              </button>
            </div>

            {/* Divider */}
            <div className="signin-divider">Or continue with email</div>

            {/* Sign In Form */}
            <form>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
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
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <div className="checkbox-group" style={{ marginBottom: 0 }}>
                  <input type="checkbox" id="remember" name="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a
                  href="#"
                  style={{
                    color: 'var(--accent-blue)',
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                  }}
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginBottom: '1rem' }}
              >
                Sign In
              </button>

              <div className="signin-footer">
                Don't have an account? <Link to="/signup">Sign up for free</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
