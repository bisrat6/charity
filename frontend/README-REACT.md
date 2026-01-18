# CORNERSTONE - React JSX Version

This is the React JSX version of the CORNERSTONE charity platform. All design elements have been preserved exactly as they were in the original HTML version.

## Project Structure

```
frontend/
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── src/
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # Main app component with routing
│   ├── css/
│   │   └── style.css      # All styles (unchanged)
│   ├── components/
│   │   ├── Header.jsx     # Shared header component
│   │   └── Footer.jsx     # Shared footer component
│   └── pages/
│       ├── Home.jsx       # Home page
│       ├── About.jsx      # About page
│       ├── Involved.jsx    # Get Involved page
│       ├── SignIn.jsx     # Sign In page
│       └── SignUp.jsx     # Sign Up page
└── README.md              # Original documentation
```

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

### Build

Create a production build:
```bash
npm run build
```

### Preview Production Build

Preview the production build:
```bash
npm run preview
```

## Features

- ✅ All original HTML pages converted to React components
- ✅ React Router for navigation
- ✅ Shared Header and Footer components
- ✅ All CSS styles preserved exactly as original
- ✅ All design elements maintained
- ✅ FontAwesome icons working
- ✅ Responsive design intact

## Technologies Used

- **React 18** - UI library
- **React Router DOM 6** - Client-side routing
- **Vite** - Build tool and dev server
- **FontAwesome 6.5.1** - Icons (via CDN)

## Design Preservation

All design elements from the original HTML version have been preserved:
- Color scheme and CSS variables
- Typography (Space Grotesk font)
- Layout and spacing
- Component styles
- Responsive breakpoints
- All images and backgrounds

## Navigation

The app uses React Router for client-side navigation:
- `/` - Home page
- `/about` - About/For Charities page
- `/involved` - Get Involved page
- `/signin` - Sign In page
- `/signup` - Sign Up page

## Notes

- The original HTML files are still in the root directory but are not used by the React app
- All styles are in `src/css/style.css` (copied from original `css/style.css`)
- The Header component automatically highlights the active route
- Forms are functional but don't have backend integration yet
