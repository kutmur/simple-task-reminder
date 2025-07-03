# General Task Reminder

A modern, single-page web application built with React, Vite, and Tailwind CSS that helps you set custom task reminders with a clean, responsive interface.

## 🚀 Features

- **Custom Task Reminders**: Set personalized tasks with custom reminder messages
- **Flexible Timer**: Set any duration in minutes
- **Smart Snooze**: Automatically snooze for 5 minutes when you're not ready
- **Modern UI**: Clean, dark-themed interface with smooth animations
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Keyboard Support**: Press Escape to snooze a reminder
- **Visual Feedback**: Real-time countdown timer with MM:SS format

## 🎯 How It Works

1. **Set Your Task**: Enter what you want to be reminded about
2. **Set the Timer**: Choose how many minutes from now you want to be reminded
3. **Write Your Question**: Create a custom reminder message/question
4. **Start Timer**: Click "Start Timer" and continue with your work
5. **Get Reminded**: When time's up, a modal appears with your custom message
6. **Respond**: Click "Yes" if you completed the task, or "No" to snooze for 5 minutes

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Google Fonts** - Inter & Roboto Mono fonts
- **JavaScript ES6+** - Modern JavaScript features

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd simple-task-reminder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   └── ReminderModal.jsx    # Modal component for reminders
├── App.jsx                  # Main application component
├── index.css               # Tailwind CSS imports and custom styles
└── main.jsx                # React app entry point
```

## 🎨 Design Features

- **Dark Theme**: Easy on the eyes with slate color palette
- **Smooth Animations**: Hover effects and modal transitions
- **Clean Typography**: Professional fonts from Google Fonts
- **Responsive Layout**: Adapts to different screen sizes
- **Accessible Design**: Clear contrast and keyboard navigation

## 📱 Usage Examples

Perfect for:
- Household chores (e.g., "Did you unload the dishwasher?")
- Work tasks (e.g., "Did you send that email?")
- Health reminders (e.g., "Did you take your medication?")
- Study sessions (e.g., "Ready for a break?")
- Cooking timers (e.g., "Is the food ready?")

## 🚀 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using React, Vite, and Tailwind CSS
