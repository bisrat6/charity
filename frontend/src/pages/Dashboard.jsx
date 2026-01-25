import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { authAPI, donationsAPI, volunteersAPI, statsAPI } from '../services/api'
import { useAuth } from '../contexts/AuthContext'

function Dashboard() {
  const { user, updateUser } = useAuth()
  const [stats, setStats] = useState(null)
  const [donations, setDonations] = useState([])
  const [volunteerApp, setVolunteerApp] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDashboardData()
  }, [user])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [statsRes, donationsRes, volunteerRes] = await Promise.allSettled([
        statsAPI.getStats(),
        user?.id ? donationsAPI.getUserDonations(user.id) : Promise.resolve(null),
        user?.id ? volunteersAPI.getByUser(user.id) : Promise.resolve(null),
      ])

      if (statsRes.status === 'fulfilled') {
        setStats(statsRes.value.data.data)
      }

      if (donationsRes.status === 'fulfilled' && donationsRes.value) {
        setDonations(donationsRes.value.data.donations || [])
      }

      if (volunteerRes.status === 'fulfilled' && volunteerRes.value) {
        setVolunteerApp(volunteerRes.value.data.data)
      } else if (volunteerRes.status === 'rejected' && volunteerRes.reason.response?.status === 404) {
        // No application found, that's fine
        setVolunteerApp(null)
      }

      setError('')
    } catch (err) {
      setError('Failed to load dashboard data.')
      console.error('Error fetching dashboard data:', err)
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

  const totalDonated = donations.reduce((sum, d) => sum + (d.amount || 0), 0)

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '3rem' }}></i>
          <p>Loading dashboard...</p>
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
          <h1>Welcome back, {user?.fullName}!</h1>
          <p style={{ color: '#666' }}>Here's your impact overview</p>
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

        {/* Stats Cards */}
        {stats && (
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
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem',
          }}
        >
          {/* My Donations */}
          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '0.5rem',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>My Donations</h3>
              <Link to="/my-donations" style={{ fontSize: '0.875rem', color: 'var(--accent-blue)' }}>
                View All
              </Link>
            </div>
            {donations.length === 0 ? (
              <p style={{ color: '#666', marginBottom: '1rem' }}>No donations yet</p>
            ) : (
              <>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {formatCurrency(totalDonated)}
                </div>
                <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
                  {donations.length} donation{donations.length !== 1 ? 's' : ''} made
                </p>
                <Link to="/campaigns" className="btn btn-primary" style={{ width: '100%' }}>
                  Donate Now
                </Link>
              </>
            )}
          </div>

          {/* Volunteer Status */}
          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '0.5rem',
              padding: '1.5rem',
            }}
          >
            <h3 style={{ marginBottom: '1rem' }}>Volunteer Status</h3>
            {volunteerApp ? (
              <div>
                <div
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor:
                      volunteerApp.status === 'approved' || volunteerApp.status === 'active'
                        ? '#d4edda'
                        : volunteerApp.status === 'pending'
                          ? '#fff3cd'
                          : '#f8d7da',
                    color:
                      volunteerApp.status === 'approved' || volunteerApp.status === 'active'
                        ? '#155724'
                        : volunteerApp.status === 'pending'
                          ? '#856404'
                          : '#721c24',
                    borderRadius: '0.25rem',
                    display: 'inline-block',
                    marginBottom: '1rem',
                    textTransform: 'capitalize',
                  }}
                >
                  {volunteerApp.status}
                </div>
                <p style={{ fontSize: '0.875rem', color: '#666' }}>
                  Application submitted on{' '}
                  {new Date(volunteerApp.createdAt).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <div>
                <p style={{ color: '#666', marginBottom: '1rem' }}>
                  You haven't applied to volunteer yet
                </p>
                <Link to="/volunteer/apply" className="btn btn-primary" style={{ width: '100%' }}>
                  Apply to Volunteer
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '0.5rem',
            padding: '1.5rem',
          }}
        >
          <h3 style={{ marginBottom: '1rem' }}>Quick Actions</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            <Link to="/campaigns" className="btn" style={{ backgroundColor: '#f8f9fa' }}>
              <i className="fas fa-list" style={{ marginRight: '0.5rem' }}></i>
              Browse Campaigns
            </Link>
            <Link to="/campaigns" className="btn" style={{ backgroundColor: '#f8f9fa' }}>
              <i className="fas fa-heart" style={{ marginRight: '0.5rem' }}></i>
              Make a Donation
            </Link>
            {!volunteerApp && (
              <Link to="/volunteer/apply" className="btn" style={{ backgroundColor: '#f8f9fa' }}>
                <i className="fas fa-hand-holding-heart" style={{ marginRight: '0.5rem' }}></i>
                Volunteer
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link
                to="/admin/dashboard"
                className="btn"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <i className="fas fa-cog" style={{ marginRight: '0.5rem' }}></i>
                Admin Panel
              </Link>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard

