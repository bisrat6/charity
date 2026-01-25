import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthContext'

function DonationSuccess() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [txRef] = useState(searchParams.get('tx_ref') || '')

  useEffect(() => {
    // Redirect to home if not authenticated
    if (!user) {
      navigate('/signin')
    }
  }, [user, navigate])

  return (
    <>
      <Header />
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '100px',
              height: '100px',
              margin: '0 auto 2rem',
              backgroundColor: '#d4edda',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <i className="fas fa-check" style={{ fontSize: '3rem', color: '#28a745' }}></i>
          </div>

          <h1 style={{ marginBottom: '1rem', color: '#28a745' }}>Thank You!</h1>
          <p style={{ fontSize: '1.125rem', color: '#666', marginBottom: '2rem' }}>
            Your donation has been successfully processed. Your generosity is making a real
            difference in people's lives.
          </p>

          {txRef && (
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '0.5rem',
                marginBottom: '2rem',
                fontSize: '0.875rem',
              }}
            >
              <strong>Transaction Reference:</strong> {txRef}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link to="/my-donations" className="btn btn-primary">
              View My Donations
            </Link>
            <Link to="/campaigns" className="btn" style={{ backgroundColor: '#f8f9fa' }}>
              Browse More Campaigns
            </Link>
            <Link to="/dashboard" className="btn" style={{ backgroundColor: '#f8f9fa' }}>
              Go to Dashboard
            </Link>
          </div>

          <div
            style={{
              marginTop: '3rem',
              padding: '1.5rem',
              backgroundColor: '#e3f2fd',
              borderRadius: '0.5rem',
            }}
          >
            <h3 style={{ marginBottom: '1rem' }}>What Happens Next?</h3>
            <ul
              style={{
                textAlign: 'left',
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li style={{ marginBottom: '0.75rem' }}>
                <i className="fas fa-check-circle" style={{ color: '#28a745', marginRight: '0.5rem' }}></i>
                You'll receive a receipt via email
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <i className="fas fa-check-circle" style={{ color: '#28a745', marginRight: '0.5rem' }}></i>
                Your donation will be reflected in the campaign progress
              </li>
              <li>
                <i className="fas fa-check-circle" style={{ color: '#28a745', marginRight: '0.5rem' }}></i>
                You can track your impact in your dashboard
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DonationSuccess

