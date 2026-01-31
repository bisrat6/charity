import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  campaignsAPI,
  volunteersAPI,
  donationsAPI,
  statsAPI,
  usersAPI,
} from '../services/api'

function AdminDashboard() {
  const [campaigns, setCampaigns] = useState([])
  const [volunteers, setVolunteers] = useState([])
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [creating, setCreating] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goalAmount: '',
    status: 'active',
  })
  const [formError, setFormError] = useState('')

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [statsRes, campaignsRes, volunteersRes, usersRes] = await Promise.allSettled([
        statsAPI.getStats(),
        campaignsAPI.getAll(),
        volunteersAPI.getAllApplications(),
        usersAPI.getAll(),
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

      if (usersRes.status === 'fulfilled') {
        setUsers(usersRes.value.data.data || [])
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

  const handleCreateCampaign = async (e) => {
    e.preventDefault()
    setFormError('')
    setCreating(true)

    try {
      const campaignData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        goalAmount: parseFloat(formData.goalAmount),
        status: formData.status,
      }

      // Validation
      if (!campaignData.title || !campaignData.description || !campaignData.goalAmount) {
        setFormError('Please fill in all required fields')
        setCreating(false)
        return
      }

      if (campaignData.goalAmount <= 0) {
        setFormError('Goal amount must be greater than 0')
        setCreating(false)
        return
      }

      await campaignsAPI.create(campaignData)

      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        goalAmount: '',
        status: 'active',
      })
      setShowCreateModal(false)
      fetchData() // Refresh campaigns list
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to create campaign'
      setFormError(errorMessage)
      console.error('Error creating campaign:', err)
    } finally {
      setCreating(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setFormError('')
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
          {['overview', 'campaigns', 'volunteers', 'users'].map((tab) => (
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
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn btn-primary"
                style={{ backgroundColor: 'var(--accent-blue)' }}
              >
                <i className="fas fa-plus" style={{ marginRight: '0.5rem' }}></i>
                Create Campaign
              </button>
              <Link to="/campaigns" className="btn" style={{ backgroundColor: '#f8f9fa' }}>
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


        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            {users.length === 0 ? (
              <p style={{ color: '#666' }}>No users found</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>User</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Role</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Joined Date</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: 'bold' }}>{user.fullName}</div>
                          <div style={{ fontSize: '0.875rem', color: '#666' }}>{user.email}</div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span
                            style={{
                              padding: '0.25rem 0.75rem',
                              backgroundColor: user.role === 'admin' ? '#e3f2fd' : '#f8f9fa',
                              color: user.role === 'admin' ? '#0c5460' : '#333',
                              borderRadius: '0.25rem',
                              fontSize: '0.75rem',
                              textTransform: 'capitalize',
                              fontWeight: 'bold',
                            }}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '1rem', color: '#999', fontSize: '0.875rem' }}>
                          {user._id}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div >

      {/* Create Campaign Modal */}
      {
        showCreateModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
            onClick={() => !creating && setShowCreateModal(false)}
          >
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                padding: '2rem',
                maxWidth: '600px',
                width: '90%',
                maxHeight: '90vh',
                overflow: 'auto',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2>Create New Campaign</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  style={{
                    border: 'none',
                    background: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: '#666',
                  }}
                  disabled={creating}
                >
                  ×
                </button>
              </div>

              {formError && (
                <div
                  style={{
                    padding: '1rem',
                    backgroundColor: '#fee',
                    color: '#c33',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  {formError}
                </div>
              )}

              <form onSubmit={handleCreateCampaign}>
                <div style={{ marginBottom: '1rem' }}>
                  <label
                    htmlFor="title"
                    style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}
                  >
                    Campaign Title <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    disabled={creating}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e0e0e0',
                      borderRadius: '0.25rem',
                      fontSize: '1rem',
                    }}
                    placeholder="Enter campaign title"
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label
                    htmlFor="description"
                    style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}
                  >
                    Description <span style={{ color: 'red' }}>*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    disabled={creating}
                    rows="5"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e0e0e0',
                      borderRadius: '0.25rem',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                    placeholder="Enter campaign description"
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label
                    htmlFor="goalAmount"
                    style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}
                  >
                    Goal Amount (ETB) <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="number"
                    id="goalAmount"
                    name="goalAmount"
                    value={formData.goalAmount}
                    onChange={handleInputChange}
                    required
                    disabled={creating}
                    min="1"
                    step="0.01"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e0e0e0',
                      borderRadius: '0.25rem',
                      fontSize: '1rem',
                    }}
                    placeholder="Enter goal amount"
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    htmlFor="status"
                    style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}
                  >
                    Status <span style={{ color: 'red' }}>*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    disabled={creating}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e0e0e0',
                      borderRadius: '0.25rem',
                      fontSize: '1rem',
                    }}
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="btn"
                    style={{ backgroundColor: '#f8f9fa' }}
                    disabled={creating}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: 'var(--accent-blue)' }}
                    disabled={creating}
                  >
                    {creating ? (
                      <>
                        <i className="fas fa-spinner fa-spin" style={{ marginRight: '0.5rem' }}></i>
                        Creating...
                      </>
                    ) : (
                      'Create Campaign'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }

      <Footer />
    </>
  )
}

export default AdminDashboard

