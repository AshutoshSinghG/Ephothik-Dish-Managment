import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

/**
 * Custom hook to fetch dishes from the API
 * Handles loading, error states, and data fetching
 * @returns {Object} { dishes, loading, error, refetch }
 */
export const useFetchDishes = () => {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /**
   * Fetch dishes from the API
   */
  const fetchDishes = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await axios.get(`${API_URL}/dishes`)
      
      if (response.data.success) {
        setDishes(response.data.data)
      } else {
        throw new Error('Failed to fetch dishes')
      }
    } catch (err) {
      console.error('Error fetching dishes:', err)
      setError(err.message || 'Failed to fetch dishes')
    } finally {
      setLoading(false)
    }
  }

  // Fetch dishes on mount
  useEffect(() => {
    fetchDishes()
  }, [])

  return {
    dishes,
    loading,
    error,
    refetch: fetchDishes, // Allow manual refetch
  }
}

