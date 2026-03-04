# FarmerEats Mobile Application

A React Native mobile application designed to connect consumers with fresh, local farming produce through a seamless user interface.

## Core Features
- User Authentication and Authorization
- Multi-step Registration and Signup Flow
- Local Data Persistence for Sessions
- Native Cross-Platform Interactions

## Architecture & Technology Stack
The application follows a modular, feature-based architecture to promote scalability, maintainability, and code separation.

- **React Native (v0.84)**: Used for its ability to build native Android and iOS applications using a single JavaScript/TypeScript codebase.
- **Redux Toolkit**: Chosen for centralized and predictable global state management. It handles complex data flows efficiently without the boilerplate of legacy Redux or the performance pitfalls of large-scale Context API usage.
- **React Navigation (v7)**: Implemented to provide a high-performance, native-feeling navigation experience across navigation flows and stacks.
- **Axios**: Provides a streamlined approach for handling API requests with built-in interceptors.
- **Zod**: Used for strict schema validation to ensure data integrity in forms and network responses.
- **AsyncStorage**: Facilitates lightweight, persistent key-value local storage.

## Project Structure
The `src` directory is organized into distinct domain areas:
- `src/app/`: Application entry point and top-level configurations.
- `src/assets/`: Static resources like fonts, icons, and SVGs.
- `src/core/`: Global utilities, API instances, and centralized configurations.
- `src/flows/`: Navigation stacks and routing definitions.
- `src/modules/`: Feature-isolated domains (e.g., `auth`, `signup`) containing their distinct screens and logic.
- `src/ui/`: Reusable, atomic UI components and styling definitions.

## Installation Guide

### Prerequisites
- Node.js (>= 20.19.4)
- React Native environment configured for targeting Android and/or iOS

### Setup Steps
1. Install node dependencies:
   ```bash
   npm install
   ```

2. Install iOS CocoaPods dependencies (macOS only):
   ```bash
   cd ios && bundle install && bundle exec pod install && cd ..
   ```

## Running the Application

1. Start the Metro Bundler:
   ```bash
   npm start
   ```

2. Run on Android:
   ```bash
   npm run android
   ```

3. Run on iOS:
   ```bash
   npm run ios
   ```

## Development Scripts
- `npm run lint`: Analyzes the codebase and automatically fixes standard linting issues.
- `npm run test`: Runs the automated Jest test suite.
- `npm run type-check`: Validates TypeScript strict typings without emitting build files.
- `npm run doctor`: Troubleshoots environment setup via `react-native doctor`.
