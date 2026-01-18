import { Link } from 'react-router-dom'
import Header from '../components/Header'

function SignUp() {
  return (
    <>
      <Header />
      {/* Split Screen Sign Up */}
      <div className="signin-wrapper">
        {/* Left Side - Welcome Message & Benefits */}
        <div className="signin-left">
          <div className="signin-left-content">
            <h1>Join CORNERSTONE Today</h1>
            <p>
              Thank you for choosing to make a difference! By creating an
              account, you're taking the first step toward building foundations
              for brighter futures. Together, we can transform lives and
              strengthen communities.
            </p>

            {/* Benefits List */}
            <div className="signin-features">
              <div className="signin-feature">
                <div className="signin-feature-icon">
                  <i className="fas fa-hand-holding-heart"></i>
                </div>
                <div className="signin-feature-text">
                  <h4>Make an Impact</h4>
                  <p>Support causes that matter to you</p>
                </div>
              </div>

              <div className="signin-feature">
                <div className="signin-feature-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="signin-feature-text">
                  <h4>Secure & Transparent</h4>
                  <p>100% of your donations go directly to programs</p>
                </div>
              </div>

              <div className="signin-feature">
                <div className="signin-feature-icon">
                  <i className="fas fa-bell"></i>
                </div>
                <div className="signin-feature-text">
                  <h4>Stay Updated</h4>
                  <p>Receive updates on the impact you're making</p>
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
              Join over <strong>15,000+</strong> people already making a
              difference through CORNERSTONE
            </p>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="signin-right">
          <div className="signin-container">
            {/* Header */}
            <div className="signin-header">
              <h1>Create Account</h1>
              <p>Start your journey of making an impact</p>
            </div>

            {/* Social Sign Up Buttons */}
            <div className="social-signin-buttons">
              <button className="btn-social btn-google">
                <i className="fab fa-google"></i>
                <span>Sign up with Google</span>
              </button>
              <button className="btn-social btn-facebook">
                <i className="fab fa-facebook"></i>
                <span>Sign up with Facebook</span>
              </button>
              <button className="btn-social btn-apple">
                <i className="fab fa-apple"></i>
                <span>Sign up with Apple</span>
              </button>
            </div>

            {/* Divider */}
            <div className="signin-divider">Or sign up with email</div>

            {/* Sign Up Form */}
            <form>
              <div className="form-group">
                <label htmlFor="fullname" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>

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
                  placeholder="Create a strong password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="form-input"
                  placeholder="Re-enter your password"
                  required
                />
              </div>

              <div className="checkbox-group">
                <input type="checkbox" id="terms" name="terms" required />
                <label htmlFor="terms">
                  I agree to the
                  <a href="#" style={{ color: 'var(--accent-blue)' }}>
                    {' '}
                    Terms & Conditions
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginBottom: '1rem' }}
              >
                Create Account
              </button>

              <div className="signin-footer">
                Already have an account? <Link to="/signin">Sign in</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
