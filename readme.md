# Blogging Platform

## About the Project

This is a blogging platform application where users can register themselves, create, edit, and delete their blogs, view their own blogs as well as blogs created by others, and leave comments on them.

---

## Features

- Sign up for an account.

- Log in with their credentials.

- Create new blog posts with a title and content.

- View a list of all blog posts with their titles and authors.

- Click on a blog post to view its full content and comments.

- Add comments to blog posts.

- Edit and update their own blog posts.

- Delete their own blog posts.

- Log out.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [Angular CLI](https://angular.dev/tools/cli/setup-local) (v18 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/souviksar/blogging-platform-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd blogging-platform-frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

Start the development server:

```bash
ng serve
```

Visit `http://localhost:4200` in your browser.

### Building for Production

Build the application for production:

```bash
npm run build:production
```

The output will be in the `dist/` directory.

---

## Folder Structure

```plaintext
src/
├── app/                # Application-specific code
├── assets/             # Static assets
├── environments/       # Environment configurations
├── styles.scss          # Global styles
├── index.html          # Main HTML file
└── main.ts             # Entry point for the application
```

---

## Technologies Used

- [Angular](https://angular.dev)
- [RxJS](https://rxjs.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Bootstrap/Angular Material]
