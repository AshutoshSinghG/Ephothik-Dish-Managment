import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

/**
 * DishCard Component
 * Displays a single dish with image, name, publish status, and action buttons
 * @param {Object} dish - The dish object
 * @param {Function} onToggle - Callback function when toggle is successful
 * @param {Function} onEdit - Callback function to edit the dish
 * @param {Function} onDelete - Callback function to delete the dish
 */
const DishCard = ({ dish, onToggle, onEdit, onDelete }) => {
  const [isToggling, setIsToggling] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [localPublished, setLocalPublished] = useState(dish.isPublished)

  // Sync local state with prop changes (from Socket.IO updates)
  useEffect(() => {
    setLocalPublished(dish.isPublished)
  }, [dish.isPublished])

  /**
   * Handle toggle publish status
   * Sends PUT request to backend and updates local state
   */
  const handleToggle = async () => {
    try {
      setIsToggling(true)
      
      const response = await axios.put(`${API_URL}/dishes/${dish.dishId}/toggle`)
      
      if (response.data.success) {
        const newStatus = response.data.data.isPublished
        setLocalPublished(newStatus)
        
        // Call parent callback if provided
        if (onToggle) {
          onToggle(dish.dishId, newStatus)
        }
        
        toast.success(
          `Dish ${newStatus ? 'published' : 'unpublished'} successfully!`,
          {
            icon: newStatus ? '✅' : '🔒',
          }
        )
      }
    } catch (error) {
      console.error('Error toggling publish status:', error)
      toast.error(
        error.response?.data?.message || 'Failed to toggle publish status',
        {
          icon: '❌',
        }
      )
    } finally {
      setIsToggling(false)
    }
  }

  /**
   * Handle delete dish
   * Sends DELETE request to backend
   */
  const handleDelete = async () => {
    // Confirm deletion
    if (!window.confirm(`Are you sure you want to delete "${dish.dishName}"?`)) {
      return
    }

    try {
      setIsDeleting(true)
      
      const response = await axios.delete(`${API_URL}/dishes/${dish.dishId}`)
      
      if (response.data.success) {
        toast.success('Dish deleted successfully!', { icon: '✅' })
        
        // Call parent callback if provided
        if (onDelete) {
          onDelete(dish.dishId)
        }
      }
    } catch (error) {
      console.error('Error deleting dish:', error)
      toast.error(
        error.response?.data?.message || 'Failed to delete dish',
        {
          icon: '❌',
        }
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Dish Image */}
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
        <img
          src={dish.imageUrl}
          alt={dish.dishName}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback image if URL fails
            e.target.src = 'https://via.placeholder.com/400x300?text=Dish+Image'
          }}
        />
        {/* Published Badge Overlay */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              localPublished
                ? 'bg-green-500 text-white'
                : 'bg-gray-400 text-white'
            }`}
          >
            {localPublished ? 'Published' : 'Unpublished'}
          </span>
        </div>
      </div>

      {/* Dish Info */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-2">
          {dish.dishName}
        </h3>

        {/* Action Buttons */}
        <div className="space-y-2">
          {/* Toggle Publish Button */}
          <button
            onClick={handleToggle}
            disabled={isToggling || isDeleting}
            className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
              localPublished
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
          >
            {isToggling ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : localPublished ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
                <span>Unpublish</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Publish</span>
              </>
            )}
          </button>

          {/* Edit and Delete Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onEdit && onEdit(dish)}
              disabled={isToggling || isDeleting}
              className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span>Edit</span>
            </button>
            <button
              onClick={handleDelete}
              disabled={isToggling || isDeleting}
              className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span>Delete</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dish ID (for debugging) */}
        <p className="text-xs text-gray-400 mt-3 text-center">
          ID: {dish.dishId}
        </p>
      </div>
    </div>
  )
}

export default DishCard

