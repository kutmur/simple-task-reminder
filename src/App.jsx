import { useState, useEffect } from 'react'

function App() {
  // State management
  const [taskTitle, setTaskTitle] = useState('')
  const [minutes, setMinutes] = useState('')
  const [reminderMessage, setReminderMessage] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Timer logic
  useEffect(() => {
    let interval = null
    
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isTimerActive) {
      setIsTimerActive(false)
      playNotificationSound()
      setShowModal(true)
    }
    
    return () => clearInterval(interval)
  }, [isTimerActive, timeLeft])

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Handle start timer
  const handleStartTimer = (e) => {
    e.preventDefault()
    if (taskTitle && minutes && reminderMessage) {
      setTimeLeft(parseInt(minutes, 10) * 60)
      setIsTimerActive(true)
    }
  }

  // Handle Yes button (task completed)
  const handleYes = () => {
    setShowModal(false)
    displayToast('Congratulations! Task completed successfully! 🎉', 'success')
    // Reset form
    setTaskTitle('')
    setMinutes('')
    setReminderMessage('')
    setTimeLeft(0)
  }

  // Handle cancel timer
  const handleCancelTimer = () => {
    setIsTimerActive(false)
    setTimeLeft(0)
    displayToast('Timer cancelled successfully', 'warning')
  }

  // Handle No button (snooze for 5 minutes)
  const handleNo = () => {
    setShowModal(false)
    setTimeLeft(300) // 5 minutes
    setIsTimerActive(true)
    // Show toast notification
    displayToast('Another reminder will follow in 5 minutes ⏰', 'info')
  }

  // Modern Toast notification system - Remove old state-based approach
  // Advanced Toast System - Dynamic and Stackable
  const showToast = (message, type = 'success') => {
    const container = document.getElementById('notification-container')
    if (!container) return

    // Create toast element
    const toast = document.createElement('div')
    toast.className = `toast toast-${type}`
    
    // Create toast content
    const toastContent = document.createElement('div')
    toastContent.className = 'toast-content'
    
    // Icon based on type
    const iconMap = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    }
    
    const colorMap = {
      success: 'from-emerald-500 to-green-600',
      error: 'from-red-500 to-red-600',
      warning: 'from-amber-500 to-orange-600',
      info: 'from-blue-500 to-indigo-600'
    }
    
    toastContent.innerHTML = `
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 bg-gradient-to-br ${colorMap[type]} rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
          <span class="text-white text-sm font-semibold">${iconMap[type]}</span>
        </div>
        <div class="flex-1">
          <p class="text-slate-100 font-medium text-sm leading-relaxed">${message}</p>
        </div>
        <button class="toast-close text-slate-400 hover:text-slate-200 transition-colors text-lg leading-none" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
      </div>
    `
    
    toast.appendChild(toastContent)
    container.appendChild(toast)
    
    // Auto remove after 4.5 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.add('toast-fade-out')
        setTimeout(() => {
          if (toast.parentNode) {
            toast.remove()
          }
        }, 300) // Wait for fade-out animation
      }
    }, 4500)
  }

  const displayToast = (message, type = 'success') => {
    showToast(message, type)
  }

  // Play notification sound
  const playNotificationSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      // Create a pleasant notification sound
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1)
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2)
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    } catch {
      console.log('Audio not supported or blocked')
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4 py-8 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-blue-500/5"></div>
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative bg-[#1e293b] rounded-3xl shadow-2xl border border-slate-700/50 p-10 w-full max-w-lg backdrop-blur-sm">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-2xl">⏰</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-100 mb-3 tracking-tight">
            General Task Reminder
          </h1>
          <p className="text-slate-400 text-base font-medium">
            Stay focused and get things done
          </p>
        </div>
        
        {/* Setup Form - Hidden when timer is active */}
        {!isTimerActive && (
          <div className="form-container">
            <form onSubmit={handleStartTimer} className="centered-form">
              {/* Task Title */}
              <div className="form-group">
                <label htmlFor="task-title" className="form-label">
                  Task Title
                </label>
                <input
                  id="task-title"
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  className="input-custom w-full"
                />
              </div>
              
              {/* Minutes */}
              <div className="form-group">
                <label htmlFor="reminder-minutes" className="form-label">
                  Remind me in (Minutes)
                </label>
                <input
                  id="reminder-minutes"
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  placeholder="Enter minutes"
                  min="1"
                  className="input-custom w-full"
                />
              </div>
              
              {/* Reminder Question */}
              <div className="form-group">
                <label htmlFor="reminder-message" className="form-label">
                  Reminder Question
                </label>
                <input
                  id="reminder-message"
                  type="text"
                  value={reminderMessage}
                  onChange={(e) => setReminderMessage(e.target.value)}
                  placeholder="What should I ask you when it's time?"
                  className="input-custom w-full"
                />
              </div>
              
              {/* Start Button */}
              <button
                type="submit"
                disabled={!taskTitle || !minutes || !reminderMessage}
                className="btn-primary w-full form-submit-btn"
              >
                Start Timer
              </button>
            </form>
          </div>
        )}

        {/* Timer Active View - Shown when timer is running */}
        {isTimerActive && (
          <div className="timer-active-view">
            {/* Task Information Blocks */}
            <div className="info-block">
              <label className="info-label">
                Current Task
              </label>
              <p className="info-value">{taskTitle}</p>
            </div>
            
            <div className="info-block">
              <label className="info-label">
                Reminder Question
              </label>
              <blockquote className="reminder-quote">
                <p className="info-value italic">"{reminderMessage}"</p>
              </blockquote>
            </div>

            {/* MASSIVE Timer Display */}
            <div className="timer-section">
              <label className="info-label mb-6">
                Time Remaining
              </label>
              <div className="timer-countdown">
                <div 
                  id="timer-display" 
                  className="text-9xl font-extralight text-slate-200 font-mono tracking-wider leading-none timer-pulse"
                  style={{ fontWeight: 200 }}
                >
                  {formatTime(timeLeft)}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="progress-container">
                <div 
                  className="progress-bar"
                  style={{
                    width: `${((parseInt(minutes) * 60 - timeLeft) / (parseInt(minutes) * 60)) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            {/* Enhanced Cancel Button */}
            <div className="action-section">
              <button
                onClick={handleCancelTimer}
                className="cancel-timer-btn"
              >
                Cancel Timer
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="modal-content bg-[#1e293b] rounded-3xl shadow-2xl border border-slate-700/50 p-8 w-full max-w-md">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">⏰</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-100 mb-4 tracking-tight">
                Reminder Time!
              </h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed font-medium">
                {reminderMessage}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleYes}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex-1 shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-1 hover:scale-105"
                >
                  ✓ Yes, Done!
                </button>
                <button
                  onClick={handleNo}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex-1 shadow-lg hover:shadow-amber-500/25 transform hover:-translate-y-1 hover:scale-105"
                >
                  ⏰ Snooze 5 min
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Global Toast Notification Container */}
      <div id="notification-container"></div>
    </div>
  )
}

export default App
