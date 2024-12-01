# Project Tree

```markdown
.
├── astro.config.mjs                             # Astro configuration file for project settings and integrations
├── dist                                         # Built and compiled files ready for production
│  ├── _astro
│  │  └── _slug_.BgfABJ9C.css
│  ├── docs
│  │  ├── how-to-write-better-prompts
│  │  │  └── index.html
│  │  └── Leo-journey-10-things-developers-should-know-about-learning
│  │     └── index.html
│  ├── favicon.svg
│  └── index.html
├── docs                                        # Project documentation
│  ├── create-coding-project-astro-wiki-app.md
│  └── project-tree.md                          # Documentation of project structure
├── LICENSE
├── migrations
├── node_modules
├── package-lock.json
├── package.json                                # Project dependencies and scripts
├── public                                      # Static assets served directly to clients
│  └── favicon.svg                              # Website favicon
├── README.md
├── scripts
│  └── start-astro-wiki.sh
├── src                                         # Source code directory
│  ├── components                               # Reusable UI components
│  │  ├── auth                                  # Authentication-related components
│  │  │  ├── AuthForm.tsx                       # Login/Registration form component
│  │  │  └── Profile.tsx                        # User profile management component
│  │  ├── Card.astro                            # Article/document preview card
│  │  ├── CopyButton.astro                      # Code snippet copy functionality
│  │  ├── Sidebar.astro                         # Documentation navigation sidebar
│  │  └── ThemeToggle.astro                     # Dark/light theme switcher
│  ├── content                                  # Content management
│  │  ├── config.ts                             # Content collection configuration
│  │  ├── docs                                  # Documentation markdown files
│  │  │  ├── how-to-write-better-prompts.md
│  │  │  └── Leo-journey-10-things-developers-should-know-about-learning.md
│  │  └── images                                # Content-specific images
│  │     └── leo-journey.png
│  ├── db                                       # Database management
│  │  ├── init.ts                               # Database initialization
│  │  ├── migrate.ts                            # Database migration runner
│  │  └── migrations                            # SQL migration files
│  │     └── 001_create_users_table.sql # Initial user table schema
│  ├── env.d.ts                                 # TypeScript environment declarations
│  ├── layouts                                  # Page layout templates
│  │  ├── DocsLayout.astro                      # Documentation page layout
│  │  └── Layout.astro                          # Base layout template
│  ├── lib                                      # Core utilities and services
│  │  ├── api.ts                                # API utility functions
│  │  ├── auth.ts.bak                           # Authentication logic backup
│  │  ├── client                                # Client-side utilities
│  │  │  └── auth.ts                            # Client authentication functions
│  │  ├── db.ts                                 # Database connection utilities
│  │  ├── test-hash.ts                          # Password hashing tests
│  │  └── user.ts                               # User management functions
│  ├── middleware                               # Request middleware
│  │  └── auth.ts                               # Authentication middleware
│  ├── pages                                    # Application routes
│  │  ├── api                                   # API endpoints
│  │  │  ├── auth                               # Authentication endpoints
│  │  │  │  ├── login.ts                        # Login API
│  │  │  │  └── register.ts                     # Registration API
│  │  │  └── user                               # User management endpoints
│  │  │     ├── delete.ts                       # Account deletion
│  │  │     └── profile.ts                      # Profile management
│  │  ├── docs                                  # Documentation pages
│  │  │  └── [...slug].astro                    # Dynamic doc routes
│  │  ├── index.astro                           # Homepage
│  │  ├── login.astro                           # Login page
│  │  ├── profile.astro                         # User profile page
│  │  └── register.astro                        # Registration page
│  └── styles                                   # Styling
│     └── docs.css                              # Documentation styles
├── tailwind.config.mjs
├── tests                                       # Test files
│  ├── api-test.ts                              # API endpoint tests
│  └── test.ts                                  # General test utilities
└── tsconfig.json                               # TypeScript configuration
```

## Directory Structure Explanation

This Astro Wiki App follows a well-organized structure:

1. **Root Configuration Files**
   - `astro.config.mjs`: Configures Astro project settings
   - `package.json`: Manages dependencies and scripts
   - `tsconfig.json`: TypeScript configuration

2. **Core Directories**
   - `/src`: Main source code
   - `/public`: Static assets
   - `/dist`: Production build output
   - `/tests`: Test files

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
