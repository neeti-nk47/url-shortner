# URL Shortener

## Overview
The **URL Shortener** is a web application that allows users to shorten long URLs into compact, shareable links. It consists of a React-based frontend and a Node.js/Express backend, with MongoDB as the database.

---

## Features
- Shorten long URLs into short, unique links.
- Copy shortened URLs to the clipboard.
- Error handling for invalid URLs.
- Responsive and modern UI built with Tailwind CSS.
- Backend API for URL shortening and redirection.

---

## Technologies Used

### Frontend:
- **React**: For building the user interface.
- **Vite**: Development and build tool.
- **Tailwind CSS**: For styling the application.
- **Axios**: For making HTTP requests to the backend.

### Backend:
- **Node.js**: Runtime environment.
- **Express.js**: Web framework for building the API.
- **Mongoose**: For interacting with MongoDB.
- **Shortid**: For generating unique short IDs.
- **Valid-URL**: For validating URLs.
- **Dotenv**: For managing environment variables.
- **Cors**: For enabling cross-origin requests.

### Database:
- **MongoDB**: Stores long URLs and their corresponding short IDs.

---

## How It Works

### Frontend:
1. The user enters a long URL in the input field.
2. On form submission, the frontend sends a POST request to the backend API (`/shorten`) with the long URL.
3. The backend responds with the shortened URL, which is displayed to the user.
4. The user can copy the shortened URL to the clipboard.

### Backend:
1. The backend validates the URL and generates a unique short ID using `shortid`.
2. The long URL and its corresponding short ID are stored in the MongoDB database.
3. When a user accesses the short URL, the backend retrieves the original URL from the database and redirects the user.

---

## Installation

### Prerequisites:
- Node.js
- MongoDB

### Steps:
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd url-shortner
   ```
3. Install dependencies for both client and server:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the `server` directory with the following:
     ```env
     PORT=5000
     MONGO_URI=<your-mongodb-connection-string>
     ```
5. Start the development servers:
   - Frontend:
     ```bash
     cd client && npm run dev
     ```
   - Backend:
     ```bash
     cd server && npm run dev
     ```

---

## Folder Structure
```
url-shortner/
├── client/                # Frontend code
│   ├── src/               # React components and assets
│   ├── public/            # Static files
│   └── ...
├── server/                # Backend code
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   └── ...
└── README.md              # Project documentation
```

---

## License
This project is licensed under the MIT License.