import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

/**
 * DishModal Component
 * Modal for adding or editing a dish
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Function to close the modal
 * @param {Object} dish - Dish object to edit (null for adding new)
 * @param {Function} onSuccess - Callback when operation succeeds
 */
const DishModal = ({ isOpen, onClose, dish, onSuccess }) => {
  const [formData, setFormData] = useState({
    dishId: '',
    dishName: '',
    imageUrl: '',
    isPublished: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form data when dish changes (for editing)
  useEffect(() => {
    if (dish) {
      setFormData({
        dishId: dish.dishId || '',
        dishName: dish.dishName || '',
        imageUrl: dish.imageUrl || '',
        isPublished: dish.isPublished || false,
      })
    } else {
      // Reset form for new dish
      setFormData({
        dishId: '',
        dishName: '',
        imageUrl: '',
        isPublished: false,
      })
    }
  }, [dish, isOpen])

  /**
   * Handle form input changes
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.dishId || !formData.dishName || !formData.imageUrl) {
      toast.error('Please fill in all required fields', { icon: '❌' })
      return
    }

    try {
      setIsSubmitting(true)

      if (dish) {
        // Update existing dish
        const response = await axios.put(
          `${API_URL}/dishes/${dish.dishId}`,
          {
            dishName: formData.dishName,
            imageUrl: formData.imageUrl,
            isPublished: formData.isPublished,
          }
        )

        if (response.data.success) {
          toast.success('Dish updated successfully!', { icon: '✅' })
          onSuccess && onSuccess()
          onClose()
        }
      } else {
        // Create new dish
        const response = await axios.post(`${API_URL}/dishes`, formData)

        if (response.data.success) {
          toast.success('Dish created successfully!', { icon: '✅' })
          onSuccess && onSuccess()
          onClose()
        }
      }
    } catch (error) {
      console.error('Error saving dish:', error)
      toast.error(
        error.response?.data?.message || 'Failed to save dish',
        { icon: '❌' }
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {dish ? 'Edit Dish' : 'Add New Dish'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isSubmitting}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Dish ID */}
          <div>
            <label
              htmlFor="dishId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Dish ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="dishId"
              name="dishId"
              value={formData.dishId}
              onChange={handleChange}
              disabled={!!dish} // Disable when editing (dishId cannot be changed)
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                dish ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
              placeholder="e.g., dish-009"
              required
            />
            {dish && (
              <p className="mt-1 text-xs text-gray-500">
                Dish ID cannot be changed
              </p>
            )}
          </div>

          {/* Dish Name */}
          <div>
            <label
              htmlFor="dishName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Dish Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="dishName"
              name="dishName"
              value={formData.dishName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Spaghetti Carbonara"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {/* Published Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label
              htmlFor="isPublished"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Published
            </label>
          </div>

          {/* Preview Image */}
          {formData.imageUrl && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Preview
              </label>
              <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/400x300?text=Invalid+URL'
                  }}
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
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
                  <span>Saving...</span>
                </>
              ) : (
                <span>{dish ? 'Update Dish' : 'Create Dish'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DishModal

