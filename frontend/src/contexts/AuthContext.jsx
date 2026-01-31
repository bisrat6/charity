import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
        setIsAuthenticated(true)
        // Verify token is still valid
        verifyToken()
      } catch (error) {
        console.error('Error parsing user data:', error)
        logout()
      }
    }
    setLoading(false)
  }, [])

  const verifyToken = async () => {
    try {
      const response = await authAPI.getMe()
      setUser(response.data.user)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      setIsAuthenticated(true)
    } catch (error) {
      // Token is invalid, logout
      logout()
    }
  }

  const login = (token, userData) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setIsAuthenticated(false)
  }

  const updateUser = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
    verifyToken,
  }), [user, isAuthenticated, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

