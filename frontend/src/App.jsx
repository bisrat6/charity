import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Involved from './pages/Involved'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Campaigns from './pages/Campaigns'
import CampaignDetail from './pages/CampaignDetail'
import Donate from './pages/Donate'
import DonationSuccess from './pages/DonationSuccess'
import MyDonations from './pages/MyDonations'
import VolunteerApply from './pages/VolunteerApply'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/involved" element={<Involved />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:id" element={<CampaignDetail />} />
          <Route
            path="/campaigns/:id/donate"
            element={
              <ProtectedRoute>
                <Donate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donation-success"
            element={
              <ProtectedRoute>
                <DonationSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-donations"
            element={
              <ProtectedRoute>
                <MyDonations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/volunteer/apply"
            element={
              <ProtectedRoute>
                <VolunteerApply />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
