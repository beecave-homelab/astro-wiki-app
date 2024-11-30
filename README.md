# Astro Wiki App

A simple NodeJS and Astro-powered wiki website designed to host markdown files as articles.

## Versions

**Current version**: 0.1.0 - Initial development release

## Table of Contents

- [Versions](#versions)
- [Badges](#badges)
- [Installation](#installation)
- [Usage](#usage)
- [Article Creation](#article-creation)
- [Features](#features)
- [Project Structure](#project-structure)
- [Database Setup](#database-setup)
- [Authentication Setup](#authentication-setup)
- [License](#license)
- [Contributing](#contributing)

## Badges

![GitHub](https://img.shields.io/badge/framework-Astro-orange)
![GitHub](https://img.shields.io/badge/runtime-Node.js-green)
![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-yellow)

## Installation

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

## Usage

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Build for production:

```bash
npm run build
```

## Article Creation

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

## Features

- 📝 Markdown file support
- ⚡ Fast page transitions
- 🎨 Clean and simple interface
- 🔍 Automatic article indexing
- 🏷️ Article tagging support
- 🚀 Built with Astro
- 📱 Responsive design

## Project Structure

```markdown
.
├── src/
│   ├── components/    # Reusable UI components
│   ├── content/       # Wiki articles (Markdown)
│   │   └── docs/      # All documentation articles
│   ├── layouts/       # Page layouts
│   └── pages/         # Route components
├── public/            # Static assets
└── astro.config.mjs   # Astro configuration
```

## Database Setup

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

## Authentication Setup

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

## License

This project is licensed under the MIT license. See [LICENSE](LICENSE) for more information.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
