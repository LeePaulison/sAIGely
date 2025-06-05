# 🧠 Project-Sage

**Project-Sage** is a lightweight, full-stack AI assistant built to showcase modern front-end and back-end development patterns with real-time communication and persistent GenAI-driven conversations.

Designed as a portfolio piece, Sage demonstrates technical fluency across multiple domains — from OAuth and GraphQL to database modeling and React UI architecture — while keeping the implementation approachable and modular.

---

## ⚡ Tech Stack

### Frontend

- **Next.js** (App Router)
- **React** with **Tailwind CSS**
- **Radix UI** for accessible, headless component primitives
- **Client-side GraphQL** via Apollo Client

Fully responsive and mobile-optimized with a consistent layout system across breakpoints.

Built from the ground up to meet **WCAG 2.1 AA** and **Section 508** accessibility standards, including semantic markup, focus management, and screen reader support.

### Backend

A layered back-end system focused on modularity, testability, and maintainability.

- **GraphQL API Server** using Apollo Server
- **PostgreSQL** for structured data (users, preferences)
- **MongoDB** for unstructured conversation storage
- **WebSocket** for real-time communication with the AI
- **OpenAI API** integration for assistant responses

### 🧱 Backend Architecture Layers

- **Data Layer**
  - Handles raw interaction with PostgreSQL and MongoDB
  - Abstracted query/mutation logic for easy testing and replacement
- **Business Logic Layer**
  - Orchestrates logic across services (e.g., chat state, user roles)
  - Central place for implementing rules and side effects
- **Interface Layer**
  - GraphQL schema, resolvers, and subscription handlers
  - WebSocket connection manager
  - Validation and formatting of data for the client

---

## 🔑 Features

- GitHub OAuth login (easy to demo, avoids GCP complexity)
- Multi-turn AI chat stored per user
- Session persistence & resumption
- Preference system (e.g., model selection, verbosity, etc.)
- Server abstraction layers:
  - Data Layer → PostgreSQL/Mongo
  - Business Logic Layer → session + role management
  - AI Interface Layer → OpenAI API integration
- Responsive, accessible UI design using Radix UI + Tailwind
- MVP-ready, scalable structure for extension

---

## 🛠 Development Setup

```bash
git clone <https://github.com/yourusername/project-sage.git>
cd project-sage
npm install

```

### Set up your `.env` file:

```bash
NEXT_PUBLIC_GRAPHQL_API=http://localhost:4000/graphql
OPENAI_API_KEY=your-key
GITHUB_CLIENT_ID=your-id
GITHUB_CLIENT_SECRET=your-secret
DATABASE_URL=postgres://...
MONGO_URL=mongodb+srv://...
```

The `DATABASE_URL` variable is required by `lib/db.js` for connecting to PostgreSQL.

### Run the dev environment:

```bash
npm run dev    # Next.js client
npm run server # GraphQL backend
```

---

## 🧪 Testing

Postman collections are provided to validate:

- Auth flows
- Preference updates
- Conversation storage/retrieval

No GUI interaction is required during back-end validation.

---

## 🧱 Future Goals

- Add multi-user support with tiered roles
- Enhance AI personas with memory context
- Deploy MVP on Vercel and MongoDB Atlas with CI/CD hooks

---

## 📸 Screenshots & Demo

_(Coming soon with video walkthrough)_

---

## 🙋‍♂️ About the Author

Made by **Lee** — a front-end dev transitioning into full-stack work. This project was created as both a passion project and a demonstration of growing mastery across modern web technologies.
