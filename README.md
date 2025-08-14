LeetClone: A Modern Coding Platform
Welcome to LeetClone, a full-stack web application for practicing and managing coding problems. Built with a robust backend and a dynamic, modern frontend, this platform offers a seamless experience for both users and administrators.

Key Features
User Authentication: Secure user registration and login are handled with JWT and cookie-based sessions. The system supports both regular users and an admin role for platform management.

Interactive Code Editor: The platform features an integrated code editor powered by the Monaco Editor (the same one used in VS Code). It supports multiple languages (JavaScript, Java, C++) and provides an intuitive environment for writing solutions.

Real-Time Code Execution: Submitted code is sent to an external Judge0 API, where it is compiled and executed against test cases in a sandboxed environment. The results are returned to the user, providing crucial feedback on correctness, runtime, and memory usage.

Submission History: Users can access a detailed history of their past submissions for any problem, allowing them to track their progress and review old solutions.

Admin Panel: A dedicated section for administrators to manage the platform's content. Admins can easily create new problems, complete with descriptions, test cases, and code templates.

Responsive Design: The entire application is built with a mobile-first approach, ensuring an optimal viewing experience on desktops, tablets, and mobile devices.

High-Level Architecture
The project follows a modular, microservices-inspired architecture with a clear separation of concerns between the frontend and backend.

Frontend: A single-page application (SPA) built with React and Vite. It serves as the user interface, handling all client-side logic, routing, and state management. It communicates with the backend API via RESTful calls.

Backend API: A Node.js and Express server that acts as the central brain of the application. It manages all business logic, including user authentication, problem data, and communicating with external services.

Judge0 API: An external code execution service. The backend sends user code and test cases to Judge0 and polls for the results, offloading the computationally intensive and security-sensitive task of code execution.

MongoDB: The primary data store, managed with Mongoose, for persistent storage of users, problems, and submission data.

Redis: A high-performance in-memory data store used for session management and blacklisting JWT tokens upon user logout, improving security.

Technologies Used
Backend
Node.js & Express: Core server-side platform.

MongoDB & Mongoose: Database and object modeling.

JWT & Bcrypt: Authentication and password security.

Redis: Caching and token management.

Judge0 API: External code judge service.

Frontend
React & Vite: UI library and build tool.

Redux Toolkit: State management.

React-Router: Client-side routing.

Monaco-Editor/React: The in-browser code editor.

Zod & React-Hook-Form: Form validation.

TailwindCSS & DaisyUI: Styling and UI components.

Setup Instructions
Clone the repository:

git clone <repository-url>
cd leetclone

Backend Setup:

Navigate to the Backend directory: cd Backend

Install dependencies: npm install

Create a .env file and add your environment variables:

PORT=3000
DB_CONNECT_STRING=<your_mongodb_connection_string>
JWT_KEY=<your_jwt_secret_key>
REDIS_PASS=<your_redis_password>

Start the backend server: npm start

Frontend Setup:

Navigate to the Frontend directory: cd Frontend

Install dependencies: npm install

Create a .env file to point to the backend server:

VITE_BACKEND_URL=http://localhost:3000

Start the development server: npm run dev

The application will be accessible at http://localhost:5173 in your browser.

Project Structure
leetclone/
├── Backend/
│   ├── src/
│   │   ├── config/              # Database and Redis connection
│   │   ├── controllers/         # Business logic for routes
│   │   ├── middleware/          # Auth middleware (user, admin)
│   │   ├── models/              # Mongoose schemas (User, Problem, Submission)
│   │   ├── routes/              # Express API routes
│   │   └── utils/               # Utility functions (Judge0 API calls)
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── ...
├── Frontend/
│   ├── src/
│   │   ├── Components/          # Reusable React components
│   │   ├── pages/               # Main pages (Home, Login, Admin, etc.)
│   │   ├── assets/              # Static assets
│   │   ├── store/               # Redux store
│   │   ├── utils/               # Axios client
│   │   ├── App.jsx              # Main router component
│   │   └── main.jsx             # Entry point
│   ├── .env
│   ├── package.json
│   └── ...
└── README.md
