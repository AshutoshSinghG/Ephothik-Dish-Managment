import { useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import { useSocket } from './hooks/useSocket'

/**
 * Main App Component
 * Sets up Socket.IO connection and renders the Dashboard
 */
function App() {
  const { socket, isConnected } = useSocket()

  useEffect(() => {
    // Log connection status
    if (isConnected) {
      console.log('✅ Socket.IO connected')
    } else {
      console.log('⏳ Connecting to Socket.IO...')
    }
  }, [isConnected])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Dashboard socket={socket} />
    </div>
  )
}

export default App

