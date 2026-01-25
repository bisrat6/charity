import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { donationsAPI } from '../services/api'
import { useAuth } from '../contexts/AuthContext'

function MyDonations() {
  const { user } = useAuth()
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user?.id) {
      fetchDonations()
    }
  }, [user])

  const fetchDonations = async () => {
    try {
      setLoading(true)
      const response = await donationsAPI.getUserDonations(user.id)
      setDonations(response.data.donations || [])
      setError('')
    } catch (err) {
      setError('Failed to load donations. Please try again later.')
      console.error('Error fetching donations:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount, currency = 'ETB') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <>
      <Header />
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1>My Donations</h1>
          <p style={{ color: '#666' }}>View your donation history and impact</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '3rem' }}></i>
            <p>Loading your donations...</p>
          </div>
        ) : error ? (
          <div
            style={{
              padding: '2rem',
              backgroundColor: '#fee',
              color: '#c33',
              borderRadius: '0.5rem',
              textAlign: 'center',
            }}
          >
            {error}
            <button
              onClick={fetchDonations}
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
            >
              Try Again
            </button>
          </div>
        ) : donations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <i className="fas fa-inbox" style={{ fontSize: '3rem', color: '#ccc' }}></i>
            <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>No donations yet</h3>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Start making a difference by donating to a campaign
            </p>
            <Link to="/campaigns" className="btn btn-primary">
              Browse Campaigns
            </Link>
          </div>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              {donations.map((donation) => (
                <div
                  key={donation._id}
                  style={{
                    border: '1px solid #e0e0e0',
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  <div style={{ flex: '1', minWidth: '200px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <div
                        style={{
                          width: '50px',
                          height: '50px',
                          backgroundColor: '#e3f2fd',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <i className="fas fa-heart" style={{ color: 'var(--accent-blue)' }}></i>
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.125rem' }}>
                          {formatCurrency(donation.amount, donation.currency || 'ETB')}
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
                          {donation.donationType || 'one-time'} donation
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor:
                          donation.status === 'completed'
                            ? '#d4edda'
                            : donation.status === 'pending'
                              ? '#fff3cd'
                              : '#f8d7da',
                        color:
                          donation.status === 'completed'
                            ? '#155724'
                            : donation.status === 'pending'
                              ? '#856404'
                              : '#721c24',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {donation.status}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#666' }}>
                      {formatDate(donation.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: '1.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '0.5rem',
                textAlign: 'center',
              }}
            >
              <h3 style={{ marginBottom: '0.5rem' }}>Total Donated</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>
                {formatCurrency(
                  donations.reduce((sum, d) => sum + (d.amount || 0), 0),
                  donations[0]?.currency || 'ETB',
                )}
              </p>
              <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
                Thank you for your generosity!
              </p>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  )
}

export default MyDonations

