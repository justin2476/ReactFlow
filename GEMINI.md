# Project Overview

This is a full-stack application for building and managing procurement workflows. It features a drag-and-drop interface for designing workflows, with different node types representing steps in the procurement process.

**Main Technologies:**

*   **Frontend:** React, React Flow, TypeScript, Tailwind CSS, Shadcn UI
*   **Backend:** Node.js, Express, TypeScript
*   **Database:** Unspecified, but `drizzle-kit` and `@neondatabase/serverless` suggest a serverless Postgres database.
*   **Data Validation:** Zod

**Architecture:**

The application is divided into three main parts:

*   **`client`:** A React-based single-page application (SPA) that provides the workflow builder interface. It uses `vite` for development and bundling.
*   **`server`:** An Express-based backend that provides a REST API for the client.
*   **`shared`:** A directory containing shared code between the client and server, such as Zod schemas for data validation.

# Building and Running

**Dependencies:**

The project uses `npm` to manage dependencies. To install them, run:

```bash
npm install
```

**Development:**

To run the application in development mode, use the following command. This will start both the backend server and the vite development server for the frontend.

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

**Building for Production:**

To build the application for production, run:

```bash
npm run build
```

This will create a `dist` directory with the bundled frontend and backend code.

**Starting in Production:**

To start the application in production mode, run:

```bash
npm start
```

# Development Conventions

*   **Code Style:** The project uses Prettier for code formatting, but there is no `.prettierrc` file, so it is likely using the default settings.
*   **Testing:** There are no testing frameworks or tests included in the project.
*   **Commits:** There is no information about commit message conventions.
*   **Branching:** There is no information about branching conventions.
