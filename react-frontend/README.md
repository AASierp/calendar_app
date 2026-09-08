# Calendar Application

A React and TypeScript calendar application that allows registered users to create and manage events, invite other users, respond to invitations, and view their upcoming schedule.

This project was created as a frontend assessment using React, TypeScript, Vite, and JSON Server.

## Features

### Account Management

* Create a new account with a name, email, and password
* Log in and log out
* Edit profile information

### Event Management

* Create events with:

  * Title
  * Description
  * Date
  * Time
  * Location
* View event details
* Edit events created by the logged-in user
* Delete events created by the logged-in user
* View events created by the user as well as events they have accepted

### Invitations and RSVP

* Invite registered users to an event
* Prevent duplicate invitations
* Accept or decline invitations
* View invitation details including date, time, and location
* View attendee RSVP status for an event

### Schedule

* View the logged-in user's events
* Filter events using a start and end date

## Technologies

* React
* TypeScript
* Vite
* HTML
* CSS
* JSON Server

## Project Structure

The application separates UI components, TypeScript types, and HTTP request logic into their own areas.

* `components` — React components used throughout the application
* `services` — functions responsible for communicating with JSON Server
* `types` — shared TypeScript types
* `db.json` — persistent application data used by JSON Server

## Data Model

The application uses three primary data types:

### Users

Stores account information including name, email, and password.

### Events

Stores event information and the ID of the user who created the event.

### Invitations

Connects a registered user to an event and stores their RSVP status as:

* `pending`
* `accepted`
* `declined`

## Running the Application

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

In a second terminal, start JSON Server:

```bash
npm run server
```

JSON Server runs at:

```text
http://localhost:3001
```

Both servers must be running for the application to function correctly.

## Design

The application was designed around a simple dashboard that gives the user immediate access to their three primary tasks:

* View and manage events
* Review invitations
* Create new events

The interface uses a consistent frosted-glass visual style with a green gradient background and shared styling across forms and event cards.

## Planning

Planning documentation for the application is included in the repository and was used to define the application's components, data structure, and major user flows before and during development.
