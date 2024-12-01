# Project Tree

```markdown
.
├── .astro
│   ├── settings.json
│   ├── types.d.ts
│   └── astro
│       └── content.d.ts
├── .env
├── .env.example
├── .git
├── .gitignore
├── astro.config.mjs
├── dist
│   ├── _astro
│   │   └── _slug_.BgfABJ9C.css
│   ├── docs
│   │   ├── how-to-write-better-prompts
│   │   │   └── index.html
│   │   └── Leo-journey-10-things-developers-should-know-about-learning
│   │       └── index.html
│   ├── favicon.svg
│   └── index.html
├── docs
│   ├── create-coding-project-astro-wiki-app.md
│   └── project-tree.md
├── LICENSE
├── migrations
├── node_modules
├── package-lock.json
├── package.json
├── public
│   └── favicon.svg
├── README.md
├── scripts
│   └── start-astro-wiki.sh
├── src
│   ├── components
│   │   ├── auth
│   │   │   ├── AuthForm.tsx
│   │   │   └── Profile.tsx
│   │   ├── Card.astro
│   │   ├── CopyButton.astro
│   │   ├── Sidebar.astro
│   │   └── ThemeToggle.astro
│   ├── content
│   │   ├── config.ts
│   │   ├── docs
│   │   │   ├── how-to-write-better-prompts.md
│   │   │   └── Leo-journey-10-things-developers-should-know-about-learning.md
│   │   └── images
│   │       └── leo-journey.png
│   ├── db
│   │   ├── init.ts
│   │   ├── migrate.ts
│   │   └── migrations
│   │       └── 001_create_users_table.sql
│   ├── env.d.ts
│   └── layouts
│       ├── DocsLayout.astro
│       └── Layout.astro
├── tailwind.config.mjs
├── tests
│   ├── api-test.ts
│   └── test.ts
└── tsconfig.json
```

## Directory Structure Explanation

This Astro Wiki App follows a well-organized structure:

1. **Root Configuration Files**
   - `.astro`: Astro.js configuration and type definitions
   - `.env` and `.env.example`: Environment configuration
   - `astro.config.mjs`: Astro.js project configuration
   - `tailwind.config.mjs`: Tailwind CSS configuration
   - `tsconfig.json`: TypeScript configuration

2. **Core Directories**
   - `/src`: Main source code
     - `/components`: UI components (auth forms, cards, theme toggles)
     - `/content`: Documentation and media files
     - `/db`: Database management and migrations
     - `/layouts`: Page templates and layouts

     **Core Files by Directory**:
     *Root*:
     - `env.d.ts`: TypeScript environment declarations and type definitions

     *Components*:
     - `components/auth/AuthForm.tsx`: Login and registration form component
     - `components/auth/Profile.tsx`: User profile management interface
     - `components/Card.astro`: Article/document preview card component
     - `components/CopyButton.astro`: Code snippet copy functionality
     - `components/Sidebar.astro`: Documentation navigation sidebar
     - `components/ThemeToggle.astro`: Dark/light theme switcher

     *Content*:
     - `content/config.ts`: Content collection configuration
     - `content/docs/how-to-write-better-prompts.md`: Documentation article
     - `content/docs/Leo-journey-10-things-developers-should-know-about-learning.md`: Documentation article
     - `content/images/leo-journey.png`: Article image asset

     *Database*:
     - `db/init.ts`: Database initialization script
     - `db/migrate.ts`: Database migration runner
     - `db/migrations/001_create_users_table.sql`: Initial user table schema

     *Layouts*:
     - `layouts/DocsLayout.astro`: Documentation page layout template
     - `layouts/Layout.astro`: Base layout template for all pages

3. **Source Code Organization**
   - Components are modular and feature-specific
   - Clear separation between client and server code
   - Structured API endpoints
   - Dedicated content management
   - Centralized styling

4. **Key Features**
   - Authentication system
   - User management
   - Documentation system
   - Theme switching
   - Database integration
   - API endpoints
   - Content collections
