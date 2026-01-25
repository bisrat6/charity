import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { authAPI } from '../services/api'

function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
    setError('') // Clear error when user types
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError(
        'Password must be at least 8 characters and include letters and numbers',
      )
      setLoading(false)
      return
    }

    try {
      const response = await authAPI.signup({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      })
      const { token, user } = response.data

      // Store token and user data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      // Redirect to home page
      navigate('/')
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          err.response?.data?.errors?.[0]?.msg ||
          'Sign up failed. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

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
            <form onSubmit={handleSubmit}>
              {error && (
                <div
                  style={{
                    padding: '0.75rem',
                    marginBottom: '1rem',
                    backgroundColor: '#fee',
                    color: '#c33',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                  }}
                >
                  {error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <small style={{ fontSize: '0.75rem', color: '#666' }}>
                  Must be at least 8 characters with letters and numbers
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-input"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
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
