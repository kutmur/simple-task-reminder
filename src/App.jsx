import { useState, useEffect } from 'react'
import ReminderModal from './components/ReminderModal'

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
      setTimeLeft(parseInt(minutes) * 60)
      setIsTimerActive(true)
    }
  }

  // Handle Yes button (task completed)
  const handleYes = () => {
    setShowModal(false)
    alert('Great job! Task completed.')
    // Reset form
    setTaskTitle('')
    setMinutes('')
    setReminderMessage('')
    setTimeLeft(0)
  }

  // Handle No button (snooze for 5 minutes)
  const handleNo = () => {
    setShowModal(false)
    setTimeLeft(300) // 5 minutes
    setIsTimerActive(true)
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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-lg p-8 w-full max-w-md shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          General Task Reminder
        </h1>
        
        <form onSubmit={handleStartTimer} className="flex flex-col gap-4">
          <div>
            <label className="text-slate-400 block mb-2">Task Title</label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g., Unload the dishwasher"
              className="w-full bg-slate-700 text-white p-3 rounded-lg border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              disabled={isTimerActive}
            />
          </div>
          
          <div>
            <label className="text-slate-400 block mb-2">Remind me in (minutes)</label>
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder="e.g., 15"
              min="1"
              className="w-full bg-slate-700 text-white p-3 rounded-lg border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              disabled={isTimerActive}
            />
          </div>
          
          <div>
            <label className="text-slate-400 block mb-2">Reminder Question</label>
            <input
              type="text"
              value={reminderMessage}
              onChange={(e) => setReminderMessage(e.target.value)}
              placeholder="e.g., Did you unload it?"
              className="w-full bg-slate-700 text-white p-3 rounded-lg border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              disabled={isTimerActive}
            />
          </div>
          
          <button
            type="submit"
            disabled={isTimerActive || !taskTitle || !minutes || !reminderMessage}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 mt-4"
          >
            {isTimerActive ? 'Timer Running...' : 'Start Timer'}
          </button>
        </form>
        
        {isTimerActive && (
          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm mb-2">Time remaining:</p>
            <p className="text-2xl text-green-400 font-mono font-bold">
              {formatTime(timeLeft)}
            </p>
          </div>
        )}
      </div>
      
      {showModal && (
        <ReminderModal
          isOpen={showModal}
          message={reminderMessage}
          onConfirm={handleYes}
          onDeny={handleNo}
        />
      )}
    </div>
  )
}

export default App
