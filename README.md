# Personal Kanban Board

A modern, responsive Kanban board application built with React and Node.js/Express. Organize your tasks efficiently with drag-and-drop functionality, custom columns, and advanced filtering options.

## Screenshot

https://ibb.co/wNpbLJ2D

### Core Functionality

- **Interactive Kanban Board** with three default columns: "To Do", "In Progress", "Done"
- **Drag-and-Drop** task management between columns
- **Task Management** - Add, edit, delete, and move tasks seamlessly
- **Local Storage** persistence - your data is saved locally and persists after refreshing
- **Responsive Design** - works perfectly on desktop, tablet, and mobile devices

### Advanced Features

- **Custom Columns** - Create and manage your own custom columns
- **Task Search & Filter** - Find tasks quickly with real-time search and tag filtering
- **Tags & Labels** - Organize tasks with custom tags for better categorization
- **Due Dates** - Set due dates with visual highlighting for overdue and due-today tasks
- **Dark/Light Mode** - Toggle between themes for comfortable viewing
- **Data Export** - Export your entire board data to JSON format
- **Real-time Updates** - All changes are instantly reflected across the interface

### User Experience

- **Intuitive Interface** - Clean, modern design with smooth animations
- **Keyboard Shortcuts** - Efficient task management with keyboard support
- **Visual Indicators** - Color-coded tasks for due dates and priorities
- **Accessibility** - Built with accessibility best practices in mind

## Tech Stack

### Frontend

- **React 18** - Modern React with hooks and context API
- **TailwindCSS** - Utility-first CSS framework for rapid UI development
- **React Beautiful DnD** - Smooth drag-and-drop functionality
- **Context API** - State management without external dependencies

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Minimal web framework
- **CORS** - Cross-origin resource sharing

### Development Tools

- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting
- **Create React App** - Zero-configuration React setup

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd personal-kanban-board
   ```

2. **Install client dependencies**

   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd ../server
   npm install
   ```

### Running the Application

#### Development Mode

1. **Start the React development server**

   ```bash
   cd client
   npm start
   ```

   The application will open at `http://localhost:3000`

2. **Start the Express server** (in a new terminal)
   ```bash
   cd server
   npm start
   ```
   The API will be available at `http://localhost:5000`

#### Production Mode

1. **Build the React application**

   ```bash
   cd client
   npm run build
   ```

2. **Start the production server**
   ```bash
   cd server
   npm start
   ```
   The application will be served at `http://localhost:5000`

### Quick Start (Recommended)

For the easiest setup, run both client and server in development mode:

```bash
# Terminal 1 - Client
cd client && npm install && npm start

# Terminal 2 - Server
cd server && npm install && npm start
```

## Usage

### Getting Started

1. Open the application in your browser
2. Start by adding tasks to the "To Do" column
3. Drag tasks between columns as you work on them
4. Use the search bar to find specific tasks
5. Add tags to categorize your tasks
6. Set due dates to track deadlines

### Managing Tasks

- **Add Task**: Click the "+" button in any column header
- **Edit Task**: Click the edit icon on any task
- **Delete Task**: Click the delete icon on any task
- **Move Task**: Drag and drop tasks between columns

### Custom Columns

- Click "Add Column" in the header to create custom columns
- Custom columns can be deleted (default columns cannot)
- Tasks in deleted columns are permanently removed

### Search and Filter

- Use the search bar to find tasks by title or description
- Use the tag filter dropdown to show only tasks with specific tags
- Clear filters to show all tasks

### Data Management

- All data is automatically saved to localStorage
- Use the "Export" button to download your board data as JSON
- Data persists between browser sessions

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /*` - Serves the React application

## Project Structure

```
personal-kanban-board/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React context for state management
│   │   └── index.js       # Entry point
│   ├── package.json
│   └── tailwind.config.js
├── server/                # Express backend
│   ├── server.js          # Main server file
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

