# Project Tree

```markdown
.
├── astro.config.mjs
├── dist
│  ├── _astro
│  │  └── _slug_.BgfABJ9C.css
│  ├── docs
│  │  ├── how-to-write-better-prompts
│  │  │  └── index.html
│  │  └── Leo-journey-10-things-developers-should-know-about-learning
│  │     └── index.html
│  ├── favicon.svg
│  └── index.html
├── docs
│  ├── create-coding-project-astro-wiki-app.md
│  └── project-tree.md
├── LICENSE
├── migrations
├── node_modules
├── package-lock.json
├── package.json
├── public
│  └── favicon.svg
├── README.md
├── scripts
│  └── start-astro-wiki.sh
├── src
│  ├── components
│  │  ├── auth
│  │  │  ├── AuthForm.tsx
│  │  │  └── Profile.tsx
│  │  ├── Card.astro
│  │  ├── CopyButton.astro
│  │  ├── Sidebar.astro
│  │  └── ThemeToggle.astro
│  ├── content
│  │  ├── config.ts
│  │  ├── docs
│  │  │  ├── how-to-write-better-prompts.md
│  │  │  └── Leo-journey-10-things-developers-should-know-about-learning.md
│  │  └── images
│  │     └── leo-journey.png
│  ├── db
│  │  ├── init.ts
│  │  ├── migrate.ts
│  │  └── migrations
│  │     └── 001_create_users_table.sql
│  ├── env.d.ts
│  ├── layouts
│  │  ├── DocsLayout.astro
│  │  └── Layout.astro
│  ├── lib
│  │  ├── api.ts
│  │  ├── auth.ts.bak
│  │  ├── client
│  │  │  └── auth.ts
│  │  ├── db.ts
│  │  ├── test-hash.ts
│  │  └── user.ts
│  ├── middleware
│  │  └── auth.ts
│  ├── pages
│  │  ├── api
│  │  │  ├── auth
│  │  │  │  ├── login.ts
│  │  │  │  └── register.ts
│  │  │  └── user
│  │  │     ├── delete.ts
│  │  │     └── profile.ts
│  │  ├── docs
│  │  │  └── [...slug].astro
│  │  ├── index.astro
│  │  ├── login.astro
│  │  ├── profile.astro
│  │  └── register.astro
│  └── styles
│     └── docs.css
├── tailwind.config.mjs
├── tests
│  ├── api-test.ts
│  └── test.ts
└── tsconfig.json
```

## Directory Structure Explanation

This Astro Wiki App follows a well-organized structure:

1. **Root Configuration Files**
   - `astro.config.mjs`: Configures Astro project settings
   - `package.json`: Manages dependencies and scripts
   - `tsconfig.json`: TypeScript configuration

2. **Core Directories**
   - `/src`: Main source code
     - `/components`: UI components (auth forms, cards, theme toggles)
     - `/content`: Documentation and media files
     - `/db`: Database management and migrations
     - `/layouts`: Page templates and layouts
     - `/lib`: Core utilities and services
     - `/middleware`: Request interceptors
     - `/pages`: Route definitions and API endpoints
     - `/styles`: Global and component-specific styles

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

     *Library*:
     - `lib/api.ts`: API utility functions and response handlers
     - `lib/auth.ts.bak`: Authentication logic backup
     - `lib/client/auth.ts`: Client-side authentication functions
     - `lib/db.ts`: Database connection and query utilities
     - `lib/test-hash.ts`: Password hashing test utilities
     - `lib/user.ts`: User management functions

     *Middleware*:
     - `middleware/auth.ts`: Authentication middleware for protected routes

     *Pages*:
     - `pages/api/auth/login.ts`: Login API endpoint
     - `pages/api/auth/register.ts`: Registration API endpoint
     - `pages/api/user/delete.ts`: Account deletion endpoint
     - `pages/api/user/profile.ts`: Profile management endpoint
     - `pages/docs/[...slug].astro`: Dynamic documentation route handler
     - `pages/index.astro`: Homepage
     - `pages/login.astro`: Login page
     - `pages/profile.astro`: User profile page
     - `pages/register.astro`: Registration page

     *Styles*:
     - `styles/docs.css`: Documentation-specific styles

   - `/public`: Static assets
     - Direct access files (favicon, images)
     - Assets that don't require processing

   - `/dist`: Production build output
     - Compiled and optimized assets
     - Generated HTML files
     - Processed styles and scripts

   - `/tests`: Test files
     - API endpoint tests
     - Utility test helpers
     - Integration tests

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
