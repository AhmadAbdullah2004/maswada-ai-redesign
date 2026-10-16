# Maswada AI 📝

**An AI-powered note-taking app built with React and TypeScript.**

Maswada AI helps users create, organize, and edit notes with AI-powered tools and Arabic/English language support.

## Features

- 🔐 **Authentication** — Secure sign-in and sign-up with Clerk.
- 📝 **Notes Management** — Create, view, edit, and delete notes.
- 💾 **Auto-save** — Automatically save changes while editing notes.
- 🤖 **AI Tools** — Summarize, rewrite, and translate note content.
- 🌐 **Bilingual UI** — English and Arabic support.
- 📱 **Responsive Design** — A modern interface built with Tailwind CSS.

## Tech Stack

**Frontend**
- React 19, TypeScript, Vite
- Tailwind CSS
- React Router
- Clerk
- Context API for language management

**Backend**
- Node.js, Express.js, TypeScript
- SQLite and Sequelize
- Clerk authentication
- OpenAI API
- Zod validation

## Project Structure

```text
maswada-ai/
├── frontend/       # React application
├── backend/        # Express API
└── Documentation/  # Project documentation
```

## Getting Started

1. Clone the repository.
2. Install dependencies in both `frontend` and `backend`.
3. Configure the required environment variables using the provided `.env.example` files.
4. Initialize the database.
5. Start the backend and frontend development servers.

See the project documentation for setup details.

## What I Worked On

- Connecting the React frontend to the Express backend.
- Implementing authenticated API requests using Clerk tokens.
- Working with CRUD operations and REST APIs.
- Building reusable custom hooks for API communication.
- Implementing note auto-save and AI-powered features.
- Managing application language and Arabic/English translations.
- Documenting the frontend architecture.

## Project Status

This project is under development. Some features may require valid Clerk and OpenAI API credentials.

---

**Built as a full-stack learning project to practice React, TypeScript, backend integration, authentication, and AI-powered features.**

## Live Demo

Try Maswada AI here:

[Open Maswada AI](https://maswada-ai-redesign.vercel.app)
