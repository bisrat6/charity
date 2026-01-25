import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { campaignsAPI } from '../services/api'
import { useAuth } from '../contexts/AuthContext'

function CampaignDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCampaign()
  }, [id])

  const fetchCampaign = async () => {
    try {
      setLoading(true)
      const response = await campaignsAPI.getById(id)
      setCampaign(response.data.data)
      setError('')
    } catch (err) {
      setError('Campaign not found or failed to load.')
      console.error('Error fetching campaign:', err)
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

  const handleDonate = () => {
    if (!isAuthenticated) {
      navigate('/signin')
      return
    }
    navigate(`/campaigns/${id}/donate`)
  }

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '3rem' }}></i>
          <p>Loading campaign...</p>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !campaign) {
    return (
      <>
        <Header />
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
          <div
            style={{
              padding: '2rem',
              backgroundColor: '#fee',
              color: '#c33',
              borderRadius: '0.5rem',
              textAlign: 'center',
            }}
          >
            {error || 'Campaign not found'}
            <div style={{ marginTop: '1rem' }}>
              <Link to="/campaigns" className="btn btn-primary">
                Back to Campaigns
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
        <Link
          to="/campaigns"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
            color: 'var(--accent-blue)',
            textDecoration: 'none',
          }}
        >
          <i className="fas fa-arrow-left"></i> Back to Campaigns
        </Link>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ marginBottom: '1rem' }}>{campaign.title}</h1>

          <div style={{ marginBottom: '2rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                fontSize: '1.125rem',
              }}
            >
              <span style={{ color: '#666' }}>Raised</span>
              <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                {formatCurrency(campaign.currentAmount || 0)} /{' '}
                {formatCurrency(campaign.goalAmount)}
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: '16px',
                backgroundColor: '#e0e0e0',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '0.5rem',
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
                fontSize: '0.875rem',
                color: '#666',
              }}
            >
              {calculateProgress(campaign.currentAmount || 0, campaign.goalAmount)}% of goal
              reached
            </div>
          </div>

          <div
            style={{
              padding: '1.5rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '0.5rem',
              marginBottom: '2rem',
            }}
          >
            <h3 style={{ marginBottom: '1rem' }}>About this Campaign</h3>
            <p style={{ lineHeight: '1.6', color: '#333', whiteSpace: 'pre-wrap' }}>
              {campaign.description}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '2rem',
            }}
          >
            <div
              style={{
                flex: '1',
                minWidth: '200px',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '0.5rem',
              }}
            >
              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>
                Status
              </div>
              <div
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
              >
                {campaign.status}
              </div>
            </div>
            <div
              style={{
                flex: '1',
                minWidth: '200px',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '0.5rem',
              }}
            >
              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>
                Created
              </div>
              <div style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
                {new Date(campaign.createdAt).toLocaleDateString()}
              </div>
            </div>
            {campaign.createdBy && (
              <div
                style={{
                  flex: '1',
                  minWidth: '200px',
                  padding: '1rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '0.5rem',
                }}
              >
                <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>
                  Created By
                </div>
                <div style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
                  {campaign.createdBy.fullName || 'Admin'}
                </div>
              </div>
            )}
          </div>

          {campaign.status === 'active' && (
            <button
              onClick={handleDonate}
              className="btn btn-primary"
              style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}
            >
              <i className="fas fa-heart" style={{ marginRight: '0.5rem' }}></i>
              Donate Now
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CampaignDetail

