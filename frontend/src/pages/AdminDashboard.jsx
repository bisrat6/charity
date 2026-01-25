import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  campaignsAPI,
  volunteersAPI,
  donationsAPI,
  statsAPI,
} from '../services/api'

function AdminDashboard() {
  const [campaigns, setCampaigns] = useState([])
  const [volunteers, setVolunteers] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [statsRes, campaignsRes, volunteersRes] = await Promise.allSettled([
        statsAPI.getStats(),
        campaignsAPI.getAll(),
        volunteersAPI.getAllApplications(),
      ])

      if (statsRes.status === 'fulfilled') {
        setStats(statsRes.value.data.data)
      }

      if (campaignsRes.status === 'fulfilled') {
        setCampaigns(campaignsRes.value.data.data || [])
      }

      if (volunteersRes.status === 'fulfilled') {
        setVolunteers(volunteersRes.value.data.data || [])
      }

      setError('')
    } catch (err) {
      setError('Failed to load admin data.')
      console.error('Error fetching admin data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleVolunteerStatusUpdate = async (volunteerId, newStatus) => {
    try {
      await volunteersAPI.updateStatus(volunteerId, newStatus)
      fetchData() // Refresh data
    } catch (err) {
      alert('Failed to update volunteer status')
      console.error('Error updating volunteer status:', err)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '3rem' }}></i>
          <p>Loading admin dashboard...</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1>Admin Dashboard</h1>
          <p style={{ color: '#666' }}>Manage campaigns, volunteers, and view statistics</p>
        </div>

        {error && (
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#fee',
              color: '#c33',
              borderRadius: '0.5rem',
              marginBottom: '2rem',
            }}
          >
            {error}
          </div>
        )}

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            borderBottom: '2px solid #e0e0e0',
          }}
        >
          {['overview', 'campaigns', 'volunteers'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                background: 'none',
                borderBottom:
                  activeTab === tab ? '2px solid var(--accent-blue)' : '2px solid transparent',
                color: activeTab === tab ? 'var(--accent-blue)' : '#666',
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#e3f2fd',
                  borderRadius: '0.5rem',
                }}
              >
                <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                  Total Raised
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {formatCurrency(stats.totalRaised || 0)}
                </div>
              </div>
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#d4edda',
                  borderRadius: '0.5rem',
                }}
              >
                <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                  Lives Impacted
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {stats.livesImpacted || 0}
                </div>
              </div>
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#fff3cd',
                  borderRadius: '0.5rem',
                }}
              >
                <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                  Active Campaigns
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {stats.activeCampaigns || 0}
                </div>
              </div>
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#f8d7da',
                  borderRadius: '0.5rem',
                }}
              >
                <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                  Volunteers
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {stats.totalVolunteers || 0}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <Link to="/campaigns" className="btn btn-primary">
                View All Campaigns
              </Link>
            </div>
            {campaigns.length === 0 ? (
              <p style={{ color: '#666' }}>No campaigns found</p>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {campaigns.slice(0, 10).map((campaign) => (
                  <div
                    key={campaign._id}
                    style={{
                      border: '1px solid #e0e0e0',
                      borderRadius: '0.5rem',
                      padding: '1.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>{campaign.title}</h3>
                        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                          {formatCurrency(campaign.currentAmount || 0)} /{' '}
                          {formatCurrency(campaign.goalAmount)}
                        </p>
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
                      </div>
                      <Link
                        to={`/campaigns/${campaign._id}`}
                        className="btn"
                        style={{ backgroundColor: '#f8f9fa' }}
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Volunteers Tab */}
        {activeTab === 'volunteers' && (
          <div>
            {volunteers.length === 0 ? (
              <p style={{ color: '#666' }}>No volunteer applications</p>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {volunteers.map((volunteer) => (
                  <div
                    key={volunteer._id}
                    style={{
                      border: '1px solid #e0e0e0',
                      borderRadius: '0.5rem',
                      padding: '1.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>
                          {volunteer.userId?.fullName || 'Unknown User'}
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                          {volunteer.userId?.email || ''}
                        </p>
                        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                          Phone: {volunteer.phone}
                        </p>
                        {volunteer.skillset && volunteer.skillset.length > 0 && (
                          <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Skills:</strong>{' '}
                            {volunteer.skillset.join(', ')}
                          </div>
                        )}
                        <div style={{ marginBottom: '0.5rem' }}>
                          <strong>Availability:</strong> {volunteer.availability}
                        </div>
                        <span
                          style={{
                            padding: '0.25rem 0.75rem',
                            backgroundColor:
                              volunteer.status === 'approved' || volunteer.status === 'active'
                                ? '#d4edda'
                                : volunteer.status === 'pending'
                                  ? '#fff3cd'
                                  : '#f8d7da',
                            color:
                              volunteer.status === 'approved' || volunteer.status === 'active'
                                ? '#155724'
                                : volunteer.status === 'pending'
                                  ? '#856404'
                                  : '#721c24',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem',
                            textTransform: 'capitalize',
                          }}
                        >
                          {volunteer.status}
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {volunteer.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleVolunteerStatusUpdate(volunteer._id, 'approved')}
                              className="btn"
                              style={{ backgroundColor: '#d4edda', color: '#155724' }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleVolunteerStatusUpdate(volunteer._id, 'rejected')}
                              className="btn"
                              style={{ backgroundColor: '#f8d7da', color: '#721c24' }}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {volunteer.status === 'approved' && (
                          <button
                            onClick={() => handleVolunteerStatusUpdate(volunteer._id, 'active')}
                            className="btn"
                            style={{ backgroundColor: '#d4edda', color: '#155724' }}
                          >
                            Activate
                          </button>
                        )}
                      </div>
                    </div>
                    {volunteer.message && (
                      <div
                        style={{
                          marginTop: '1rem',
                          padding: '1rem',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                        }}
                      >
                        <strong>Message:</strong> {volunteer.message}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default AdminDashboard

