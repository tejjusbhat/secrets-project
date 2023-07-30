# Secret Keeper Web Application

Secret Keeper is a web application built using Node.js and Express.js that allows users to register, login, and share their secrets anonymously. Users can sign up using either their email and password or their Google account. Once logged in, users can submit their secrets, which will be displayed anonymously on the "Secrets" page for all users to see.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Prerequisites

Before running this application, you need to have the following installed:

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- npm (Node Package Manager): npm comes bundled with Node.js installation.
- MongoDB: Make sure you have MongoDB installed and running on your system.

## Installation

1. Clone the repository to your local machine:

```
git clone https://github.com/your-username/secret-keeper.git
cd secret-keeper
```

2. Install the required dependencies using npm:

```
npm install
```

3. Create a `.env` file in the root directory of the project and provide the required environment variables:

```
CLIENT_ID=your_google_oauth_client_id
CLIENT_SECRET=your_google_oauth_client_secret
URL=mongodb://localhost:27017/
```

Replace `your_google_oauth_client_id` and `your_google_oauth_client_secret` with your Google OAuth 2.0 credentials. Make sure you have MongoDB running on your local machine with the default configuration (port 27017). Adjust the URL if you have a different MongoDB setup.

## Usage

1. Run the application:

```
npm start
```


2. Open your web browser and visit [http://localhost:3000/](http://localhost:3000/) to access the home page.

3. Use the navigation links to register, login, and access other pages of the application.

4. Register an account using your email and password or using your Google account.

5. Once logged in, you can submit your secrets from the "Submit" page. These secrets will be displayed anonymously on the "Secrets" page.

6. You can log out at any time using the "Logout" link.

## Features

- User registration and authentication using local email/password or Google OAuth 2.0.
- Anonymous sharing of secrets with other users.
- Secure storage of user information and secrets using MongoDB and encryption.
