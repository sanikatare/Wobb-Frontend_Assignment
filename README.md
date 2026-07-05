# Wobb Assignment

A modern React application built with Vite and TypeScript that enables users to discover creator profiles across multiple social media platforms. The application provides a clean interface for searching creators, viewing detailed profiles, and managing selected creators.

## Features

- Search creators across multiple platforms
- Platform-based filtering
- Responsive and modern UI
- Creator profile details
- Selected creators management
- Fast navigation using React Router
- State management with Zustand
- Built with React 19 and Vite

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Zustand
- Lucide React

## Project Structure

```
src/
│
├── components/        # Reusable UI components
├── pages/             # Application pages
├── store/             # Zustand state management
├── utils/             # Helper functions
├── types/             # TypeScript types
├── assets/            # Static assets
└── App.tsx            # Main application routes
```

## Pages

### Landing Page

- Creator discovery homepage
- Search functionality
- Platform selection
- Brand showcase

### Search Page

- Search results
- Platform filtering
- Creator listing
- Selected creators panel

### Profile Detail Page

- Detailed creator information
- Social statistics
- External profile links
- Verification status

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/your-repository.git
```

Navigate to the project directory:

```bash
cd your-repository
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Available Scripts

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

## Routing

| Route | Description |
|--------|-------------|
| `/` | Landing page |
| `/discover` | Creator search page |
| `/profile/:username` | Creator profile details |

## State Management

The application uses Zustand for global state management, including:

- Search state
- Platform filters
- Selected creators

## Development

### Prerequisites

- Node.js (v18 or later)
- npm

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

## Build

Create a production build:

```bash
npm run build
```

The production files will be generated inside the `dist` folder.

## License

This project is developed as part of the Wobb Frontend Assignment.
