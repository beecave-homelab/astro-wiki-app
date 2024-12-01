# Astro Wiki App

A simple NodeJS and Astro-powered wiki website designed to host markdown files as articles.

![GitHub](https://img.shields.io/badge/framework-Astro-orange)
![GitHub](https://img.shields.io/badge/runtime-Node.js-green)
![Version](https://img.shields.io/badge/version-0.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-yellow)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Authentication Setup](#authentication-setup)
- [Usage](#usage)
  - [Article Creation](#article-creation)
- [Project Structure](#project-structure)
- [Versions](#versions)
- [Security Notes](#security-notes)
- [License](#license)
- [Contributing](#contributing)

## Features

- 📝 Markdown file support
- ⚡ Fast page transitions
- 🎨 Clean and simple interface
- 🔍 Automatic article indexing
- 🏷️ Article tagging support
- 🚀 Built with Astro
- 📱 Responsive design

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- MariaDB (v10.6 or higher)

## Setup

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/beecave-homelab/astro-wiki-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd astro-wiki-app
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

### Database Setup

The application uses MariaDB as its database. To set up the database:

1. Install MariaDB on your system:

    ```bash
    # macOS (using Homebrew)
    brew install mariadb

    # Start MariaDB service
    brew services start mariadb
    ```

2. Create a new database and user:

    ```sql
    mysql -u root -p

    CREATE DATABASE astro_wiki;
    CREATE USER 'admin'@'localhost' IDENTIFIED BY 'your_password';
    GRANT ALL PRIVILEGES ON astro_wiki.* TO 'admin'@'localhost';
    FLUSH PRIVILEGES;
    ```

3. Configure the database connection:

    ```bash
    # Copy the example environment file
    cp .env.example .env

    # Update the database configuration in .env
    DB_HOST=localhost
    DB_USER=admin
    DB_PASSWORD=your_password
    DB_NAME=astro_wiki
    ```

### Authentication Setup

The application uses JWT (JSON Web Token) based authentication with secure cookie sessions. To set up authentication:

1. Copy the example environment file (if you haven't already):

    ```bash
    cp .env.example .env
    ```

2. Open the `.env` file and update the environment variables:

    ```env
    # Authentication
    JWT_SECRET=your-secure-secret-here

    # Cookie Settings
    COOKIE_SECURE=true
    COOKIE_SAME_SITE=lax

    # Database Configuration
    DB_HOST=localhost
    DB_USER=admin
    DB_PASSWORD=password
    DB_NAME=astro_wiki
    ```

3. Generate a secure JWT secret using Node.js:

    ```bash
    node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
    ```

4. Copy the generated string and use it as your `JWT_SECRET` in the `.env` file.

## Usage

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Build for production:

    ```bash
    npm run build
    ```

### Article Creation

1. Place your Markdown files in the `src/content/docs/` directory

2. Each article must include frontmatter with the following properties:

    ```yaml
    ---
    title: Your Article Title    # Required: The title of your article
    description: Brief description   # Optional: Short description for SEO
    order: 1    # Required: Controls the order in the navigation (lower numbers first)
    ---
    ```

3. Articles are automatically rendered and listed on the landing page

4. The first plain text line after the H1 header in your article will be used as the description on the landing page

    Example article structure:

    ```markdown
    ---
    title: Getting Started Guide
    description: Learn how to set up and use our documentation
    order: 1
    ---

    # Getting Started Guide

    This is the description that will appear on the landing page.

    ## Further Content

    Rest of your article content...
    ```

## Project Structure

```markdown
.
├── src/
│   ├── components/  # UI components
│   ├── content/     # Wiki articles (Markdown)
│   │   └── docs/    # Documentation articles
│   ├── db/          # Database models and migrations
│   ├── layouts/     # Page layouts and templates
│   ├── lib/         # Shared utilities and helpers
│   ├── middleware/  # Request middleware
│   ├── pages/       # Route components and API endpoints
│   └── styles/      # CSS and styling files
├── public/          # Static assets
├── scripts/         # Build and utility scripts
├── tests/           # Test files
├── .env.example     # Example environment configuration
├── astro.config.mjs # Astro configuration
├── tailwind.config.mjs # Tailwind CSS configuration
├── tsconfig.json    # TypeScript configuration
└── package.json     # Project dependencies and scripts
```

## Versions

**Current version**: 0.2.0 - Second development release

## Security Notes

- Never commit the `.env` file to version control
- Use different JWT secrets in development and production
- Ensure your MariaDB installation is properly secured
- Set strong passwords for both database and admin users
- In production, always use HTTPS and set `COOKIE_SECURE=true`

## License

This project is licensed under the MIT license. See [LICENSE](LICENSE) for more information.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
