import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { campaignsAPI } from '../services/api'

function Campaigns() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      const response = await campaignsAPI.getAll()
      setCampaigns(response.data.data || [])
      setError('')
    } catch (err) {
      setError('Failed to load campaigns. Please try again later.')
      console.error('Error fetching campaigns:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const calculateProgress = (current, goal) => {
    return goal > 0 ? Math.round((current / goal) * 100) : 0
  }

  return (
    <>
      <Header />
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="section-header">
          <h1 className="section-title">Active Campaigns</h1>
          <p className="section-label">Support causes that matter to you</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '3rem' }}></i>
            <p>Loading campaigns...</p>
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
              onClick={fetchCampaigns}
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
            >
              Try Again
            </button>
          </div>
        ) : campaigns.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <i className="fas fa-inbox" style={{ fontSize: '3rem', color: '#ccc' }}></i>
            <p style={{ marginTop: '1rem', color: '#666' }}>No campaigns found</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2rem',
              marginTop: '2rem',
            }}
          >
            {campaigns.map((campaign) => (
              <div
                key={campaign._id}
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Link
                  to={`/campaigns/${campaign._id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>
                      {campaign.title}
                    </h3>
                    <p
                      style={{
                        color: '#666',
                        fontSize: '0.875rem',
                        marginBottom: '1rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {campaign.description}
                    </p>

                    <div style={{ marginBottom: '1rem' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem',
                        }}
                      >
                        <span style={{ color: '#666' }}>Raised</span>
                        <span style={{ fontWeight: 'bold' }}>
                          {formatCurrency(campaign.currentAmount || 0)} /{' '}
                          {formatCurrency(campaign.goalAmount)}
                        </span>
                      </div>
                      <div
                        style={{
                          width: '100%',
                          height: '8px',
                          backgroundColor: '#e0e0e0',
                          borderRadius: '4px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${calculateProgress(
                              campaign.currentAmount || 0,
                              campaign.goalAmount,
                            )}%`,
                            height: '100%',
                            backgroundColor: 'var(--accent-blue)',
                            transition: 'width 0.3s',
                          }}
                        />
                      </div>
                      <div
                        style={{
                          textAlign: 'right',
                          fontSize: '0.75rem',
                          color: '#666',
                          marginTop: '0.25rem',
                        }}
                      >
                        {calculateProgress(campaign.currentAmount || 0, campaign.goalAmount)}%
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '1rem',
                      }}
                    >
                      <span
                        style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor:
                            campaign.status === 'active'
                              ? '#d4edda'
                              : campaign.status === 'completed'
                                ? '#d1ecf1'
                                : '#f8d7da',
                          color:
                            campaign.status === 'active'
                              ? '#155724'
                              : campaign.status === 'completed'
                                ? '#0c5460'
                                : '#721c24',
                          borderRadius: '0.25rem',
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                        }}
                      >
                        {campaign.status}
                      </span>
                      <span style={{ fontSize: '0.875rem', color: '#666' }}>
                        <i className="fas fa-calendar"></i>{' '}
                        {new Date(campaign.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Campaigns

