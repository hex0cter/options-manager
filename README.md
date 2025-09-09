# Participant Options Manager

A flexible React application for managing participants and their preferences across different options. Perfect for group decision-making, event planning, team coordination, and voting scenarios.

## ✨ Features

### 🎯 Core Functionality
- **Dynamic Options Management**: Add, edit, and delete options with real-time updates
- **Participant Management**: Manage participant lists with full CRUD operations
- **Interactive Voting System**: Three-state voting (Yes/No/Unknown) with intuitive toggle buttons
- **Real-time Results**: Live summary table with vote counts and sorting capabilities

### 🎨 Customization
- **Editable Titles**: Click to edit main title and subtitle
- **Custom Section Labels**: Rename "Options" and "Participants" to fit your use case
- **Persistent Settings**: All customizations saved automatically to localStorage

### 📊 Advanced Table Features
- **Smart Sorting**: Sort by option name or vote counts (Yes/No/Unknown)
- **Visual Indicators**: Color-coded voting buttons with hover effects
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Sticky Headers**: Option column stays visible when scrolling horizontally

### 💾 Data Persistence
- **Auto-save**: All data automatically saved to browser localStorage
- **Session Recovery**: Resume exactly where you left off
- **Export Ready**: Easy to extend with import/export functionality

## 🚀 Use Cases

Transform the app for different scenarios by customizing the section labels:

- **Event Planning**: "Venues" and "Attendees"
- **Team Decisions**: "Proposals" and "Team Members"
- **Food Orders**: "Menu Items" and "People"
- **Meeting Scheduling**: "Time Slots" and "Participants"
- **Feature Voting**: "Features" and "Stakeholders"
- **Restaurant Selection**: "Restaurants" and "Diners"

## 🛠️ Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:hex0cter/options-manager.git
   cd options-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📖 How to Use

### 1. Customize Your App
- **Click on the main title** to rename your app
- **Click on the subtitle** to add a description
- **Click on "Options"** to rename it (e.g., "Food Choices", "Venues")
- **Click on "Participants"** to rename it (e.g., "Team Members", "Attendees")

### 2. Add Your Data
- **Add Options**: Use the input field to add items people will vote on
- **Add Participants**: Add the people who will be voting
- **Edit/Delete**: Click the edit or delete buttons next to any item

### 3. Collect Votes
- **Click the voting buttons** in the results table to cycle through:
  - ❓ **Unknown** (gray) - No preference set
  - ✅ **Yes** (green) - Positive vote
  - ❌ **No** (red) - Negative vote

### 4. Analyze Results
- **View Summary**: See vote counts for each option
- **Sort Results**: Click column headers to sort by name or vote counts
- **Make Decisions**: Use the data to make informed group decisions

## 🏗️ Technical Details

### Built With
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling with modern features
- **LocalStorage API** - Client-side data persistence

### Project Structure
```
src/
├── components/
│   ├── OptionsManager.jsx      # Options CRUD interface
│   ├── ParticipantsManager.jsx # Participants CRUD interface
│   ├── ResultsTable.jsx        # Interactive voting table
│   ├── StatusToggle.jsx        # Voting button component
│   └── *.css                   # Component styles
├── App.jsx                     # Main application component
├── App.css                     # Global styles
└── index.css                   # Base styles
```

### Key Features Implementation
- **State Management**: React hooks for local state
- **Data Persistence**: localStorage with JSON serialization
- **Responsive Design**: CSS Grid and Flexbox
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Efficient re-renders with proper key props

## 🎨 Customization

### Styling
The app uses CSS custom properties and can be easily themed by modifying the color variables in the CSS files.

### Extending Functionality
The modular component structure makes it easy to add features like:
- Import/Export functionality
- User authentication
- Real-time collaboration
- Advanced analytics
- Custom voting scales

## 🚀 Deployment

The app is configured for easy deployment to static hosting services:

- **GitHub Pages**: Use the included workflow in `.github/workflows/deploy.yml`
- **Netlify**: Connect your repository for automatic deployments
- **Vercel**: Import project for instant deployment
- **Any Static Host**: Upload the `dist` folder contents

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with modern React patterns and best practices
- Inspired by the need for simple, effective group decision-making tools
- Designed for flexibility and ease of use across different scenarios
