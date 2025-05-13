# Geek Project

A React application for browsing users and albums using JSONPlaceholder API.

## Features

- Browse users with detailed profiles
- View user albums
- Explore album photos with gallery preview
- Responsive design for mobile and desktop
- Ant Design UI components
- React Router for navigation

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (v8 or higher)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd geek-project
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start the development server

```bash
pnpm start
```

This will start the development server at [http://localhost:5173](http://localhost:5173)

## Project Structure

```
geek-project/
├── src/
│   ├── components/          # Reusable components
│   │   └── sidebar/         # Sidebar navigation components
│   ├── config/              
│   │   └── service/         # API and global services
│   ├── layout/              # App layout components
│   ├── page/                # Page components
│   │   ├── albums/          # Albums listing page
│   │   ├── albums-detail/   # Album detail page with photos
│   │   ├── users/           # Users listing page
│   │   └── user-detail/     # User detail page with albums
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Entry point
├── public/                 # Static assets
└── index.html              # HTML template
```

## Technologies Used

- [React](https://reactjs.org/) - UI library
- [React Router](https://reactrouter.com/) - Routing
- [Ant Design](https://ant.design/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Fake REST API

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint to check code quality

## Browser Support

The application is tested and works on the latest versions of:
- Chrome
- Firefox
- Safari
- Edge

## License

[MIT](LICENSE)