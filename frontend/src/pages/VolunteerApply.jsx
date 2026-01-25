import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { volunteersAPI } from '../services/api'
import { useAuth } from '../contexts/AuthContext'

function VolunteerApply() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    phone: '',
    skillset: [],
    availability: 'flexible',
    interests: [],
    message: '',
  })
  const [currentSkill, setCurrentSkill] = useState('')
  const [currentInterest, setCurrentInterest] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [existingApplication, setExistingApplication] = useState(null)

  useEffect(() => {
    checkExistingApplication()
  }, [user])

  const checkExistingApplication = async () => {
    if (!user?.id) return

    try {
      const response = await volunteersAPI.getByUser(user.id)
      setExistingApplication(response.data.data)
    } catch (err) {
      // No existing application, that's fine
      if (err.response?.status !== 404) {
        console.error('Error checking application:', err)
      }
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skillset.includes(currentSkill.trim())) {
      setFormData({
        ...formData,
        skillset: [...formData.skillset, currentSkill.trim()],
      })
      setCurrentSkill('')
    }
  }

  const removeSkill = (skill) => {
    setFormData({
      ...formData,
      skillset: formData.skillset.filter((s) => s !== skill),
    })
  }

  const addInterest = () => {
    if (currentInterest.trim() && !formData.interests.includes(currentInterest.trim())) {
      setFormData({
        ...formData,
        interests: [...formData.interests, currentInterest.trim()],
      })
      setCurrentInterest('')
    }
  }

  const removeInterest = (interest) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((i) => i !== interest),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!formData.phone.trim()) {
      setError('Phone number is required')
      return
    }

    setLoading(true)

    try {
      await volunteersAPI.apply(formData)
      setSuccess(true)
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.msg ||
          'Failed to submit application. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  if (existingApplication) {
    return (
      <>
        <Header />
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <div
              style={{
                padding: '2rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '0.5rem',
              }}
            >
              <i className="fas fa-check-circle" style={{ fontSize: '3rem', color: '#28a745' }}></i>
              <h2 style={{ marginTop: '1rem' }}>Application Submitted</h2>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                You already have a volunteer application.
              </p>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  marginTop: '1rem',
                  textAlign: 'left',
                }}
              >
                <p>
                  <strong>Status:</strong>{' '}
                  <span style={{ textTransform: 'capitalize' }}>
                    {existingApplication.status}
                  </span>
                </p>
                <p>
                  <strong>Submitted:</strong>{' '}
                  {new Date(existingApplication.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ marginBottom: '0.5rem' }}>Volunteer Application</h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Join our team of volunteers and make a difference in your community
          </p>

          {success ? (
            <div
              style={{
                padding: '2rem',
                backgroundColor: '#d4edda',
                color: '#155724',
                borderRadius: '0.5rem',
                textAlign: 'center',
              }}
            >
              <i className="fas fa-check-circle" style={{ fontSize: '3rem' }}></i>
              <h2 style={{ marginTop: '1rem' }}>Application Submitted!</h2>
              <p>Thank you for your interest. We'll review your application and get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div
                  style={{
                    padding: '1rem',
                    backgroundColor: '#fee',
                    color: '#c33',
                    borderRadius: '0.5rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  {error}
                </div>
              )}

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="phone" className="form-label">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  placeholder="0912345678"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Skills</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Add a skill (e.g., Teaching, Medical, IT)"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addSkill()
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="btn"
                    style={{ backgroundColor: '#f8f9fa' }}
                  >
                    Add
                  </button>
                </div>
                {formData.skillset.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {formData.skillset.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: '#e3f2fd',
                          borderRadius: '0.25rem',
                          fontSize: '0.875rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          style={{
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            color: '#666',
                          }}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="availability" className="form-label">
                  Availability *
                </label>
                <select
                  id="availability"
                  name="availability"
                  className="form-input"
                  value={formData.availability}
                  onChange={handleInputChange}
                  required
                >
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="both">Both</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Interests</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Add an interest (e.g., Education, Healthcare, Environment)"
                    value={currentInterest}
                    onChange={(e) => setCurrentInterest(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addInterest()
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addInterest}
                    className="btn"
                    style={{ backgroundColor: '#f8f9fa' }}
                  >
                    Add
                  </button>
                </div>
                {formData.interests.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {formData.interests.map((interest) => (
                      <span
                        key={interest}
                        style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: '#e3f2fd',
                          borderRadius: '0.25rem',
                          fontSize: '0.875rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        {interest}
                        <button
                          type="button"
                          onClick={() => removeInterest(interest)}
                          style={{
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            color: '#666',
                          }}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="message" className="form-label">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-input"
                  rows="5"
                  placeholder="Tell us why you want to volunteer and what you hope to contribute..."
                  value={formData.message}
                  onChange={handleInputChange}
                  maxLength="1000"
                />
                <small style={{ fontSize: '0.75rem', color: '#666' }}>
                  {formData.message.length}/1000 characters
                </small>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin" style={{ marginRight: '0.5rem' }}></i>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane" style={{ marginRight: '0.5rem' }}></i>
                    Submit Application
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default VolunteerApply

