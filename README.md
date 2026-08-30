# 🧠 The React Quiz

An interactive quiz application built with **React** that tests your knowledge of React concepts. The app fetches questions from a local JSON server, tracks your score and time, and crowns your high score.

---

## ✨ Features

- **15 React questions** spanning beginner to advanced topics
- **Timed quiz** — 30 seconds per question with a live countdown timer
- **Instant feedback** — correct/wrong answers are highlighted immediately
- **Progress bar** — tracks your current question and accumulated points
- **High score tracking** — persists across quiz restarts within the session
- **Emoji-based results** — performance-based emoji on the finish screen (🥇🎉😁🤔🤦)
- **Responsive design** — adapts to desktop, tablet, and mobile screens

---

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| [React 19](https://react.dev/) | UI library |
| [Vite 8](https://vite.dev/) | Build tool & dev server |
| [json-server](https://github.com/typicode/json-server) | Fake REST API for quiz questions |
| [ESLint](https://eslint.org/) | Code linting |
| Vanilla CSS | Styling with CSS custom properties & media queries |

---

## 📁 Project Structure

```
react-quiz/
├── public/                     # Static assets served by Vite
│   ├── assets/
│   │   ├── hero.png            # Hero image
│   │   ├── logo512.png         # React logo (displayed in header)
│   │   ├── react.svg           # React SVG icon
│   │   └── vite.svg            # Vite SVG icon
│   ├── favicon.svg             # Browser tab icon
│   └── icons.svg               # SVG icon sprite
│
├── data/
│   └── questions.json          # Quiz questions database (served by json-server)
│
├── src/
│   ├── components/
│   │   ├── DateCounter.jsx     # Date counter demo (useReducer practice, unused)
│   │   ├── Error.jsx           # Error message when data fetch fails
│   │   ├── FinishScreen.jsx    # Final score, high score, and restart button
│   │   ├── Footer.jsx          # Footer layout wrapper
│   │   ├── Header.jsx          # App header with React logo and title
│   │   ├── Loader.jsx          # Loading spinner during data fetch
│   │   ├── Main.jsx            # Main content layout wrapper
│   │   ├── NextButton.jsx      # Next / Finish button between questions
│   │   ├── Options.jsx         # Answer option buttons with correct/wrong styling
│   │   ├── ProgressBar.jsx     # Question count and points progress indicator
│   │   ├── Question.jsx        # Single question display with its options
│   │   ├── StartScreen.jsx     # Welcome screen with question count and start button
│   │   └── Timer.jsx           # Countdown timer with auto-finish
│   │
│   ├── config/
│   │   └── config.js           # App constants (SECS_PER_QUESTION)
│   │
│   ├── App.jsx                 # Root component — state management with useReducer
│   ├── index.css               # Global styles, responsive breakpoints
│   └── main.jsx                # React entry point (StrictMode + createRoot)
│
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)

### Installation

```bash
# Clone and navigate to the project
cd 10-react-quiz/starter1

# Install dependencies
npm install
```

### Running the App

You need **two terminals** — one for the fake API server and one for the Vite dev server:

**Terminal 1 — Start the JSON Server (fake API):**

```bash
npm run server
```

This starts `json-server` on **http://localhost:8000**, serving questions from `data/questions.json`.

**Terminal 2 — Start the Vite Dev Server:**

```bash
npm run dev
```

This starts the app on **http://localhost:5173** (default Vite port).

> ⚠️ The JSON server must be running first, or the app will show an error screen.

---

## 📜 Available Scripts

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `npm run dev` | Start Vite development server with HMR |
| `build` | `npm run build` | Build production bundle to `dist/` |
| `preview` | `npm run preview` | Preview the production build locally |
| `lint` | `npm run lint` | Run ESLint across the project |
| `server` | `npm run server` | Start json-server on port 8000 |

---

## 🧩 Components Overview

### Layout Components

| Component | Description |
| --- | --- |
| **Header** | Displays the React logo and "The React Quiz" title |
| **Main** | Wrapper that renders children inside `<main>` |
| **Footer** | Wrapper that renders children inside `<footer>` |

### Screen Components

| Component | Description |
| --- | --- |
| **StartScreen** | Welcome view with the question count and a "Let's Start" button |
| **FinishScreen** | Shows final score, percentage, emoji, high score, and a restart button |

### Quiz Components

| Component | Description |
| --- | --- |
| **Question** | Renders the current question text and its `Options` |
| **Options** | Renders answer buttons; highlights correct/wrong after answering |
| **NextButton** | Shows "Next" during the quiz and "Finish" on the last question |
| **ProgressBar** | Displays a `<progress>` bar, question counter, and point tracker |
| **Timer** | Countdown timer (30s per question); auto-finishes when time runs out |

### UI Components

| Component | Description |
| --- | --- |
| **Loader** | Animated loading dots shown while questions are being fetched |
| **Error** | Error message displayed when the API request fails |

### Extras

| Component | Description |
| --- | --- |
| **DateCounter** | A standalone `useReducer` practice component (not used in the app) |

---

## ⚙️ State Management

The app uses React's **`useReducer`** hook for centralized state management. All state transitions are handled by a single reducer function in `App.jsx`.

### State Shape

```js
{
  questions: [],            // Array of question objects from the API
  status: "loading",        // "loading" | "error" | "ready" | "active" | "finished"
  currentQuestionIndex: 0,  // Index of the current question
  answer: null,             // Selected answer index (null if unanswered)
  points: 0,                // Accumulated score
  highScore: 0,             // Best score across restarts
  secondRemaining: null     // Countdown timer value
}
```

### Reducer Actions

| Action | Description |
| --- | --- |
| `dataReceived` | Questions loaded from API → status becomes `"ready"` |
| `dataFailed` | API fetch error → status becomes `"error"` |
| `start` | Quiz begins → status becomes `"active"`, timer initialized |
| `newAnswer` | User selects an answer → points updated if correct |
| `nextQuestion` | Move to next question → answer reset to `null` |
| `finish` | Quiz ends → high score updated if beaten |
| `restart` | Reset to `"ready"` state, keeping questions and high score |
| `tick` | Timer decrements by 1 second; auto-finishes at 0 |

---

## 📝 License

This project is part of Jonas Schmedtmann's **Ultimate React Course**. For educational purposes only.
