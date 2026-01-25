import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { campaignsAPI, donationsAPI } from '../services/api'
import { useAuth } from '../contexts/AuthContext'

function Donate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [campaign, setCampaign] = useState(null)
  const [formData, setFormData] = useState({
    amount: '',
    donationType: 'one-time',
    tier: 'custom',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loadingCampaign, setLoadingCampaign] = useState(true)

  const presetAmounts = [100, 500, 1000, 2500, 5000]

  useEffect(() => {
    fetchCampaign()
  }, [id])

  const fetchCampaign = async () => {
    try {
      const response = await campaignsAPI.getById(id)
      setCampaign(response.data.data)
    } catch (err) {
      setError('Failed to load campaign details.')
    } finally {
      setLoadingCampaign(false)
    }
  }

  const handleAmountChange = (amount) => {
    setFormData({ ...formData, amount: amount.toString() })
    setError('')
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const amount = parseFloat(formData.amount)
    if (!amount || amount <= 0) {
      setError('Please enter a valid donation amount.')
      return
    }

    setLoading(true)

    try {
      const response = await donationsAPI.createPaymentIntent({
        amount,
        currency: 'ETB',
        campaignId: id,
        donationType: formData.donationType,
        tier: formData.tier,
      })

      if (response.data.checkout_url) {
        // Redirect to Chapa checkout
        window.location.href = response.data.checkout_url
      } else {
        setError('Failed to initialize payment. Please try again.')
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.msg ||
          'Failed to process donation. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  if (loadingCampaign) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '3rem' }}></i>
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ marginBottom: '2rem' }}>Make a Donation</h1>

          {campaign && (
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '0.5rem',
                marginBottom: '2rem',
              }}
            >
              <h3 style={{ marginBottom: '0.5rem' }}>{campaign.title}</h3>
              <p style={{ color: '#666', fontSize: '0.875rem' }}>
                Your donation will help us reach our goal of{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'ETB',
                }).format(campaign.goalAmount)}
              </p>
            </div>
          )}

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
              <label className="form-label">Select Amount (ETB)</label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                }}
              >
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountChange(amount)}
                    style={{
                      padding: '0.75rem',
                      border:
                        formData.amount === amount.toString()
                          ? '2px solid var(--accent-blue)'
                          : '1px solid #ddd',
                      borderRadius: '0.5rem',
                      backgroundColor:
                        formData.amount === amount.toString() ? '#e3f2fd' : 'white',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight:
                        formData.amount === amount.toString() ? 'bold' : 'normal',
                    }}
                  >
                    {amount.toLocaleString()}
                  </button>
                ))}
              </div>
              <input
                type="number"
                name="amount"
                className="form-input"
                placeholder="Enter custom amount"
                value={formData.amount}
                onChange={handleInputChange}
                min="1"
                step="1"
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="donationType" className="form-label">
                Donation Type
              </label>
              <select
                id="donationType"
                name="donationType"
                className="form-input"
                value={formData.donationType}
                onChange={handleInputChange}
              >
                <option value="one-time">One-time</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div
              style={{
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Donation Amount:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {formData.amount
                    ? new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'ETB',
                      }).format(parseFloat(formData.amount) || 0)
                    : 'ETB 0'}
                </span>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>
                <i className="fas fa-info-circle"></i> 100% of your donation goes directly to
                the cause
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}
              disabled={loading || !formData.amount}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin" style={{ marginRight: '0.5rem' }}></i>
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-lock" style={{ marginRight: '0.5rem' }}></i>
                  Proceed to Payment
                </>
              )}
            </button>

            <p
              style={{
                marginTop: '1rem',
                fontSize: '0.875rem',
                color: '#666',
                textAlign: 'center',
              }}
            >
              <i className="fas fa-shield-alt"></i> Secure payment powered by Chapa
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Donate

