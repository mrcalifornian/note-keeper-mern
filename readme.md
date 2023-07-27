# Note Keeper Platform (MERN)

## Description

techNotes is a Note Keeper platform built using MERN stack (MongoDB, Express, React, Node.js) with additional libraries and tools like Redux, Redux-Toolkit, Bcrypt, and JWT. It serves as a replacement for traditional ticketing systems within organizations, providing a more efficient and user-friendly experience.

### User Roles

- **Employees**: Employees can access and manage their assigned notes. They have the ability to create and edit notes that are associated with them.
- **Managers and Admins**: Managers and Admins have elevated privileges. They can create, update, and delete all notes within the organization. Additionally, they can manage employee and admin data, create new users, and access User Settings.

## Tech Stack

### Backend

- JavaScript
- Node.js
- Express
- MongoDB
- Mongoose
- Bcrypt
- JWT (JSON Web Tokens)

### Frontend

- JavaScript
- ReactJS
- Redux
- Redux-Toolkit

## Getting Started

To run techNotes locally, follow these instructions:

1. Clone the repository from GitHub.
2. Navigate to the backend directory and install the required dependencies using `npm install`.
3. Set the following environment variables to the backend .env file:

- DATABASE_URI
- ACCESS_TOKEN_SECRET
- REFRESH_TOKEN_SECRET

4. Run the backend server using `npm start`.
5. Navigate to the frontend directory and install the required dependencies using `npm install`.
6. Run the frontend development server using `npm start`.

## Usage

Once the application is up and running, you can access the following features based on your user role:

- **Employees**: As an employee, you can log in to the notes app, view your assigned notes, and create new notes associated with yourself.
- **Managers and Admins**: As a manager or admin, you can log in to the notes app, view, edit, and delete all notes within the organization. You also have the ability to manage employee and admin data, create new users, and access User Settings.

## Note States

Notes within techNotes can have one of the following states:

- **OPEN**: Notes that are currently active and being worked on.
- **COMPLETED**: Notes that have been successfully resolved and completed.

## Mobile Support

While the platform primarily targets desktop users, it has been designed with some level of mobile responsiveness to ensure basic functionality is available on mobile devices.

Please note that this documentation provides a brief overview of the techNotes platform. For detailed instructions on installation, usage, and contribution guidelines, kindly refer to the relevant files and documentation within the repository.
