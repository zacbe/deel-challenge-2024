# Challenge Documentation

## Project Structure

Below is the directory layout of the project, highlighting major components and their responsibilities:

```
└── 📁src
    └── 📁controllers # controllers are splited by route
        └── 📁admin
            └── bestPayedProfession.ts
            └── bestPayingClient.ts
            └── index.ts
        └── 📁contracts
            └── findAll.ts
            └── findOne.ts
            └── index.ts
        └── 📁jobs
            └── findUnpaid.ts
            └── index.ts
            └── pay.ts
        └── 📁profiles
            └── addBalance.ts
            └── index.ts
    └── 📁middleware  # basic middlewares for input validation
        └── errorHandler.ts
        └── getProfile.ts
        └── index.ts
        └── logger.ts
        └── parseInteger.ts
        └── validateQueryParams.ts
    └── 📁models  # Contains the Sequelize models and setup
        └── contract.ts
        └── index.ts
        └── job.ts
        └── profile.ts
    └── 📁routers # Routes
        └── adminRouter.ts
        └── contractRouter.ts
        └── index.ts
        └── jobRouter.ts
        └── profileRouter.ts
    └── 📁services  # Services and query implementation
        └── contractService.ts
        └── jobService.ts
        └── profileService.ts
    └── 📁utils
        └── envConfig.ts
    └── index.ts
    └── server.ts
```

## Changes to the Original Project

### Migration to TypeScript

- Introduced a simple `tsconfig.json` to enable TypeScript support in the project, enhancing type safety and maintainability.

### Revamped Folder Structure

- Reorganized the folder structure to better suit multiple routes, facilitating scalability and potential API versioning:

```
└── 📁src
    └── 📁api
        └── 📁v1
          └── 📁controllers
          └── 📁routers
```

### Model Breakdown

- Split models into individual files to simplify maintenance and enhance modularity.

### Server and Entry Point Refactor

- `server.ts` and `index.ts` have been refactored for clarity, utilizing `Router` for easy route management and including a script for graceful service termination.

### Service Layer Enhancements

- Refactored business logic into service functions that return promises. This design isolates controller handlers from direct model interactions, promoting a clean architecture.

### Handling Transactions

- Implemented transactions, particularly in operations that update records such as `processJobPaymentById` and `updateClientBalance`, to ensure data consistency.
- Applied `ISOLATION_LEVELS.SERIALIZABLE` to the Sequelize instance to enhance performance under concurrent operations.
- Managed transactions are used for their automatic rollback capabilities in case of failures.

### Note on Database Busy State

- Due to time constraints, a specialized mechanism to handle the `SQLITE_BUSY` state was not implemented. This may be considered for future enhancements to improve robustness under high load.

## Play with the API

For ease of testing and interaction with the API endpoints, I've used `Swagger-Autogen` to automatically generate comprehensive documentation. This documentation is integrated with `Swagger-UI`, allowing you to explore and test the API directly through a user-friendly web interface.

### Access the API Documentation

To view and interact with the API documentation, visit:

[API Documentation](http://localhost:3001/api-docs/)

### Running the Service

You can start the service in two modes:

#### 1. Development Mode

Run the service in development mode using the following command:

```bash
$ npm run dev
```

This mode uses `tsx`, a TypeScript execution engine for Node.js that allows you to run the application directly from TypeScript files (\*.ts) without pre-compilation.

> This is ideal for development purposes due to the immediate feedback loop it provides.

#### 2. Production Mode

For production environments, it’s recommended to run the compiled JavaScript code to enhance performance. First, compile the TypeScript code, and then start the server:

```bash
$ npm run build  # Compiles TS to JS under the 'dist/' directory
$ npm start      # Serves the project from the compiled files
```
