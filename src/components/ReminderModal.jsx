import { useEffect, useState } from 'react'

const ReminderModal = ({ isOpen, message, onConfirm, onDeny }) => {
  const [isAnimating, setIsAnimating] = useState(false)

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onDeny()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      setTimeout(() => setIsAnimating(true), 10) // Trigger animation after render
    } else {
      setIsAnimating(false)
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onDeny])

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${
      isAnimating ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className={`bg-slate-800 rounded-lg p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 ${
        isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`}>
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">⏰</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Reminder Time!
          </h2>
          <p className="text-white text-xl mb-6">
            {message}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onConfirm}
              className="bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex-1 hover:scale-105 active:scale-95"
            >
              ✓ Yes
            </button>
            <button
              onClick={onDeny}
              className="bg-red-600 hover:bg-red-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex-1 hover:scale-105 active:scale-95"
            >
              ✗ No (Snooze 5 min)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReminderModal
