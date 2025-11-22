import { useState, useEffect } from 'react'
import { useFetchDishes } from '../hooks/useFetchDishes'
import DishCard from '../components/DishCard'
import DishModal from '../components/DishModal'
import toast from 'react-hot-toast'

/**
 * Dashboard Component
 * Main page displaying all dishes in a grid layout
 * Handles real-time updates via Socket.IO
 * @param {Object} socket - Socket.IO client instance
 */
const Dashboard = ({ socket }) => {
  const { dishes, loading, error, refetch } = useFetchDishes()
  const [localDishes, setLocalDishes] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDish, setEditingDish] = useState(null)

  // Update local dishes when fetched dishes change
  useEffect(() => {
    setLocalDishes(dishes)
  }, [dishes])

  // Listen for real-time updates from Socket.IO
  useEffect(() => {
    if (!socket) return

    // Listen for publish status updates
    const handlePublishStatusUpdate = (data) => {
      console.log('📡 Real-time update received (publish):', data)
      
      // Update the specific dish in local state
      setLocalDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.dishId === data.dishId
            ? { ...dish, isPublished: data.isPublished }
            : dish
        )
      )

      // Show toast notification
      toast.success(
        `Dish "${data.dish.dishName}" ${data.isPublished ? 'published' : 'unpublished'}`,
        {
          icon: '🔄',
          duration: 2000,
        }
      )
    }

    // Listen for dish created
    const handleDishCreated = (data) => {
      console.log('📡 Real-time update received (created):', data)
      
      // Add new dish to local state
      setLocalDishes((prevDishes) => {
        // Check if dish already exists (avoid duplicates)
        const exists = prevDishes.some((d) => d.dishId === data.dish.dishId)
        if (exists) return prevDishes
        return [...prevDishes, data.dish].sort((a, b) =>
          a.dishName.localeCompare(b.dishName)
        )
      })

      toast.success(`Dish "${data.dish.dishName}" created!`, {
        icon: '✅',
        duration: 2000,
      })
    }

    // Listen for dish updated
    const handleDishUpdated = (data) => {
      console.log('📡 Real-time update received (updated):', data)
      
      // Update the specific dish in local state
      setLocalDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.dishId === data.dishId ? data.dish : dish
        )
      )

      toast.success(`Dish "${data.dish.dishName}" updated!`, {
        icon: '✏️',
        duration: 2000,
      })
    }

    // Listen for dish deleted
    const handleDishDeleted = (data) => {
      console.log('📡 Real-time update received (deleted):', data)
      
      // Remove dish from local state
      setLocalDishes((prevDishes) =>
        prevDishes.filter((dish) => dish.dishId !== data.dishId)
      )

      toast.success('Dish deleted!', {
        icon: '🗑️',
        duration: 2000,
      })
    }

    // Register event listeners
    socket.on('publish-status-updated', handlePublishStatusUpdate)
    socket.on('dish-created', handleDishCreated)
    socket.on('dish-updated', handleDishUpdated)
    socket.on('dish-deleted', handleDishDeleted)

    // Cleanup on unmount
    return () => {
      socket.off('publish-status-updated', handlePublishStatusUpdate)
      socket.off('dish-created', handleDishCreated)
      socket.off('dish-updated', handleDishUpdated)
      socket.off('dish-deleted', handleDishDeleted)
    }
  }, [socket])

  /**
   * Handle toggle from DishCard
   * Updates local state immediately for better UX
   */
  const handleToggle = (dishId, newStatus) => {
    setLocalDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish.dishId === dishId ? { ...dish, isPublished: newStatus } : dish
      )
    )
  }

  /**
   * Handle edit dish
   * Opens modal with dish data for editing
   */
  const handleEdit = (dish) => {
    setEditingDish(dish)
    setIsModalOpen(true)
  }

  /**
   * Handle delete dish
   * Removes dish from local state (Socket.IO will also update)
   */
  const handleDelete = (dishId) => {
    setLocalDishes((prevDishes) =>
      prevDishes.filter((dish) => dish.dishId !== dishId)
    )
  }

  /**
   * Handle add new dish
   * Opens modal for creating a new dish
   */
  const handleAddDish = () => {
    setEditingDish(null)
    setIsModalOpen(true)
  }

  /**
   * Handle modal close
   */
  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingDish(null)
  }

  /**
   * Handle modal success (after create/update)
   * Refetch dishes to ensure consistency
   */
  const handleModalSuccess = () => {
    refetch()
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dishes...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Dishes</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={refetch}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Empty state
  if (localDishes.length === 0 && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-gray-400 text-5xl mb-4">🍽️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Dishes Found</h2>
          <p className="text-gray-600 mb-6">
            Get started by adding your first dish!
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleAddDish}
              className="btn-primary"
            >
              Add Your First Dish
            </button>
            <button
              onClick={refetch}
              className="btn-secondary"
            >
              Refresh
            </button>
          </div>
          {/* Add/Edit Dish Modal */}
          <DishModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            dish={editingDish}
            onSuccess={handleModalSuccess}
          />
        </div>
      </div>
    )
  }

  // Main dashboard view
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🍽️ DishManager
            </h1>
            <p className="text-gray-600">
              Manage your dishes and their publish status
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-4">
            {/* Add Dish Button */}
            <button
              onClick={handleAddDish}
              className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add Dish</span>
            </button>
            {/* Real-time Status */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div
                className={`w-3 h-3 rounded-full ${
                  socket?.connected ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></div>
              <span>
                {socket?.connected ? 'Real-time Active' : 'Connecting...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Total Dishes</p>
            <p className="text-2xl font-bold text-gray-900">{localDishes.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Published</p>
            <p className="text-2xl font-bold text-green-600">
              {localDishes.filter((d) => d.isPublished).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Unpublished</p>
            <p className="text-2xl font-bold text-gray-600">
              {localDishes.filter((d) => !d.isPublished).length}
            </p>
          </div>
        </div>
      </div>

      {/* Dishes Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {localDishes.map((dish) => (
            <DishCard
              key={dish._id || dish.dishId}
              dish={dish}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {/* Add/Edit Dish Modal */}
      <DishModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        dish={editingDish}
        onSuccess={handleModalSuccess}
      />
    </div>
  )
}

export default Dashboard

