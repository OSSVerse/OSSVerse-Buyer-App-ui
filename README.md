# OSS Verse

For OSS Verse, we are seeking your contributions and support. This README provides an overview of the project to help new developers get started quickly and understand the project's structure and conventions.

## Table of Contents

- [Frontend](#frontend)
 - [Tech Stack](#tech-stack)
 - [Conventions](#conventions)
 - [Folder Structure](#folder-structure)
- [Running the Project](#running-the-project)
 - [Installation](#installation)
 - [Development](#development)
 - [Building for Production](#building-for-production)
- [Buyer App](#buyer-app)
 - [Prerequisites](#prerequisites)
 - [Running Locally](#running-locally)
 - [Setup with Docker](#setup-with-docker)
 - [Utilities](#utilities)
 - [Running Unit Tests](#running-unit-tests)
- [Additional Information](#additional-information)

## Frontend

### Tech Stack

- **React**: JavaScript library for building user interfaces
- **Vite**: Fast and lean frontend build tool
- **Shadcn/UI**: Accessible and customizable UI components
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Zustand**: State management
- **Axios**: API management
- **TypeScript**: Static typing for JavaScript

### Conventions

- **Absolute Imports**: Absolute imports are used throughout the project. Instead of using relative paths like `../../../components/Button`, use absolute paths like `@/components/Button`.
  
- **Template Components**: A `TemplateComponent` is available in `src/components/TemplateComponent` to serve as a template for creating new components, ensuring consistency across the codebase.
  
- **TypeScript Usage**: All components and services are written in TypeScript to ensure type safety and better developer experience.

### Folder Structure

```plaintext
src/
├── assets/          # Static assets like images and fonts
├── components/      # Common/atomic components
│   ├── ui/          # Shadcn/UI components
│   └── input/       # Reusable input components like Button, TextField
├── config/          # Global configurations (site paths, API info, etc.)
├── store/           # Global store using Zustand
├── providers/       # Wrapping classes for providers
├── hooks/           # Custom React hooks
├── pages/           # Vite routing folder
├── services/        # Application logic and API services
├── styles/          # Global styles and Tailwind CSS configurations
├── types/           # Global TypeScript types
├── utils/           # Utility functions and helpers
└── App.tsx          # Root component
``` 

-   **components**: Contains common and atomic components. Reusable components that are not tied to specific application logic reside here. Further categorized into subfolders like `ui` for Shadcn/UI components and `input` for form-related components.
    
-   **config**: Holds all global configurations such as site paths, API endpoints, and other environment-specific settings.
    
-   **store**: Manages the global state using Zustand.
    
-   **providers**: Contains wrapping classes for various providers (e.g., context providers).
    
-   **hooks**: Custom React hooks for reusable logic.
    
-   **pages**: Manages routing with Vite.
    
-   **services**: Consolidates all application logic, including API calls and state management services.
    
-   **styles**: Contains global styles, Tailwind CSS configurations, and related utilities.
    
-   **types**: Stores global TypeScript types that are not specific to any single component or service.
    
-   **utils**: Includes global utility functions and helpers that can be used throughout the application.
    

## Running the Project

### Installation

1.  **Node Version**: Ensure you have Node.js version **20.x** installed. You can check your Node version with:
    
    `node -v` 
    
    If you need to install or switch Node versions, consider using [nvm](https://github.com/nvm-sh/nvm).
    
2.  **Navigate to Frontend Directory**:
    
    `cd FE` 
    
3.  **Install Dependencies**:
    
    `npm install -D pnpm
    pnpm install` 
    

### Development

1.  **Environment Configuration**:
    
    -   Copy `.env.example` to `.env` and add valid environment variables there.
2.  **Start Development Server**:
    
    
    `pnpm dev` 
    
    The application will be available at `http://localhost:3000` (or the port specified in your configuration).
    

### Building for Production

To build the frontend for production with optimizations:


`pnpm build` 

This command will create an optimized build of the application in the `dist` folder, ready for deployment.

## Buyer App

### Prerequisites

1.  [Node.js v22+](https://nodejs.org/)
2.  Enable [PNPM](https://pnpm.io/installation)

### Running Locally

1.  **Install Dependencies**:
    
    `pnpm install` 
    
2.  **Start the Application**:
    
    `pnpm dev` 
    
    The app will be online at [http://localhost:3000](http://localhost:3000).
    
3.  **Format Code**:
    
    `pnpm format` 
    
4.  **Lint Code**:
    
    `pnpm lint` 
    
5.  **Check for Typos**:
    
    `pnpm spellcheck` 
    

### Setup with Docker

1.  **Build Docker Image**:
    
    `docker build -t buyerapp .` 
    
2.  **Run Docker Container**:
    
    `docker run -d --name buyerapp -p 80:80 buyerapp` 
    
    The application will be online at [http://localhost:80](http://localhost:80).
    

### Utilities

This repository has some additional tools already set up for you:

-   [TypeScript](https://www.typescriptlang.org/) for static type checking
-   [Biome](https://biomejs.dev/) for code linting and formatting

### Running Unit Tests

1.  **Run Tests**:
    `pnpm run test` 
    
2.  **Run Coverage Report**:
    
    `pnpm run coverage` 
    

## Additional Information

-   **Tailwind CSS**: Tailwind is configured in `tailwind.config.js`. Customize the theme and plugins as needed to match the design requirements.
    
-   **Shadcn/UI**: Shadcn components are utilized for building accessible and customizable UI elements. Refer to the Shadcn Documentation for more details on component usage and customization.
    
-   **State Management**: Zustand is set up for efficient state management. Global states can be managed in the `store` directory as appropriate.
    
-   **API Management**: Axios is used for handling API requests. Base configurations and interceptors can be found in `src/services/api.ts`.
    
-   **TypeScript**: Ensure type safety by defining appropriate types in the `types` directory and using TypeScript features across the codebase.
    
