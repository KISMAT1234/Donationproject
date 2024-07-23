# Fundraising App Backend

## Overview

This repository contains the backend code for the Fundraising App, a platform that enables users to create, manage, and contribute to fundraising campaigns. The backend is built using Node.js and Express.js, with MongoDB as the database. The application also integrates with Stripe for payment processing.

## Features

- **User Authentication**: Secure user registration and login with JWT.
- **Campaign Management**: Create, update, and delete fundraising campaigns.
- **Donation Processing**: Integration with Stripe for handling donations.
- **Notification System**: Real-time notifications for campaign updates and donations.
- **Admin Dashboard**: Manage users and campaigns from an admin panel.

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- MongoDB
- Stripe API key

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/fundraising-app-backend.git
   cd fundraising-app-backend


Install dependencies:

bash

npm install

Configure environment variables:

Create a .env file in the root directory and add the following environment variables:

env

MONGODB_URI=mongodb://localhost:27017/fundraising-app
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

Run the application:

bash

    npm start

    The server will start on http://localhost:8000 by default.

API Endpoints
User Endpoints

    POST /api/user: Register a new user.
    POST /api/users/login: Authenticate a user and return a JWT.

Campaign Endpoints

    GET /api/campaigns: Get a list of all campaigns.
    POST /api/campaigns: Create a new campaign (admin only).
    PUT /api/campaigns/
    : Update a campaign (admin only).
    DELETE /api/campaigns/
    : Delete a campaign (admin only).

Donation Endpoints

    POST /api/donations: Make a donation to a campaign.

Testing

To run the tests, use:

bash

npm test

Make sure you have set up the test environment variables in a .env.test file.
Deployment

To deploy the application, you can use services like Heroku, AWS, or any other cloud platform. Ensure you set the environment variables as needed.
Contributing

    Fork the repository.
    Create a new branch (git checkout -b feature/your-feature).
    Commit your changes (git commit -am 'Add new feature').
    Push to the branch (git push origin feature/your-feature).
    Create a new Pull Request.

License

This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments

    Express.js
    MongoDB
    Stripe
    Socket.io