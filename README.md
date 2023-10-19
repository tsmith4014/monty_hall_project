# Monty Hall Game Application Documentation

## Table of Contents

1. [Introduction](#introduction)
   - [The Monty Hall Problem](#the-monty-hall-problem)
   - [Testing the Monty Hall Theory](#testing-the-monty-hall-theory)
2. [Technologies](#technologies)
3. [Frontend Architecture](#frontend-architecture)
   - [GameBoard.jsx](#gameboardjsx)
   - [Future Improvements](#future-improvements)
   - [Refactor Suggestions](#refactor-suggestions)
4. [Backend Architecture](#backend-architecture)
5. [Deployment](#deployment)

## Introduction

This documentation provides an overview of the Monty Hall game application. The application combines a Django backend for managing data and a React frontend for UI to offer a robust platform for both playing the Monty Hall game and statistically analyzing it.

### The Monty Hall Problem

The Monty Hall problem is a probability puzzle rooted in a game show scenario. You're presented with three doors. Behind one is a car, and behind the other two are goats. After you pick a door, Monty Hall, who knows what's behind each door, opens another door, revealing a goat. You then have the choice to either stick with your original choice or switch to the remaining door. The counter-intuitive solution to the problem is that you are more likely to win the car if you switch (probability of 2/3) rather than stick with your initial choice (probability of 1/3).

### Testing the Monty Hall Theory

The application serves as a real-world testing ground for the Monty Hall problem. Players can opt to stick or switch doors after Monty reveals a goat behind one of the remaining doors. The backend API collects these game results and computes the win percentages for both "stick" and "switch" strategies, offering empirical evidence for the Monty Hall theory.

## Technologies

- Frontend: React.js
- Backend: Django, Django REST Framework
- Database: SQLite
- Deployment: AWS
- DevOps: AWS and Docker
- Other Libraries: SoundManager for audio management

## Frontend Architecture

### GameBoard.jsx

The `GameBoard.jsx` component is central, responsible for rendering game boards and curtains. It also handles the game's primary logic and keeps track of statistics.

- **State Variables**: Keeps track of the game state, selected curtains, and results.

- **API Call**: Sends the game results to the backend API.

- **Game Logic**: Handles the selection and revealing of curtains.

- **Event Handlers**: Manage curtain selections and switch/stick decisions.

- **Game Round Management**: Keeps track of game rounds and win statistics.

- **UI Rendering**: Generates the curtain components and conditionally displays the decision buttons and results.

### Future Improvements

- Implement a leaderboard to track the highest scores.
- Add a user login and registration system.

### Refactor Suggestions

- The component handles more logic than it ideally should.
- Consider breaking up the logic into smaller, more focused components.
- Separate out the statistics and game result handling into a different component.

## Backend Architecture

The Django backend is responsible for storing game results. It uses the SQLite database for storage and Django REST Framework for creating an API endpoint (`http://localhost:8000/api/monty_hall/gameruns/`).

<!-- ## Deployment
The application is deployed on AWS, encapsulated in Docker containers. The CI/CD pipeline ensures that code changes are smoothly transitioned from development to production. -->

## Running the Application Locally

### Frontend

To start the frontend development server, navigate to the frontend directory and run:

```bash
npm run dev
```

This will start the Vite development server, and you can access the application at http://localhost:3000.

### Backend

To start the backend development server, navigate to the backend directory and run:

```bash
python manage.py runserver
```

This will start the Django development server, and you can access the API at http://localhost:8000/api/monty_hall/gameruns/.
