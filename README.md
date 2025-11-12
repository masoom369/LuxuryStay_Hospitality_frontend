# LuxuryStay Hospitality - Frontend

This is the frontend application for the LuxuryStay Hospitality hotel management system, built with React and Vite.

## Features

- React-based user interface with modern design
- Responsive layout using Tailwind CSS
- Role-based access control for different user types (Admin, Manager, Receptionist, Housekeeping, Maintenance, Guest)
- Integration with backend API for hotel management operations
- Real-time dashboard with analytics and reporting
- Room management and reservation system
- User authentication and authorization
- Guest feedback system
- Service request management

## Technologies Used

- React v18+
- Vite as build tool
- Tailwind CSS for styling
- React Router DOM v6+ for routing
- Headless UI React for accessible components
- Recharts for data visualization
- Axios for API requests
- Lucide React for icons
- Framer Motion for animations
- React Datepicker for date selection

## Prerequisites

- Node.js (v18+)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/masoom369/LuxuryStay_Hospitality_frontend.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create environment file:
   ```bash
   cp .env.example .env
   ```

5. Configure environment variables in `.env` file (see Environment Variables section below)

6. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root of the frontend directory and add the following variables:

```
VITE_API_URL=http://localhost:5000
```

- `VITE_API_URL`: The base URL for API requests to the backend server (default: http://localhost:5000)

## Available Scripts

- `npm run dev`: Starts the development server with hot reload
- `npm run build`: Builds the application for production
- `npm run preview`: Locally preview the production build
- `npm run lint`: Lints the codebase

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── contexts/
│   ├── utils/
│   ├── assets/
│   ├── styles/
│   └── App.jsx
├── index.html
├── package.json
└── README.md
```

## Development

The frontend application uses a component-based architecture with the following main sections:

- Components: Reusable UI elements
- Pages: Route-specific components
- Layouts: Common page layouts
- Contexts: State management
- Utils: Utility functions and helpers

## API Integration

The application communicates with the backend server using Axios for API calls. All API endpoints follow a consistent structure:

- `/api/auth` - Authentication routes
- `/api/users` - User management
- `/api/rooms` - Room management
- `/api/reservations` - Reservation system
- `/api/billing` - Billing and invoices
- `/api/housekeeping` - Housekeeping tasks
- `/api/maintenance` - Maintenance requests
- `/api/feedback` - Guest feedback
- `/api/analytics` - Reporting and analytics
- `/api/services` - Additional services
- `/api/config` - System configuration

## Deployment

To build the application for production:

```bash
npm run build
```

This will create a `dist/` directory with the optimized build ready for deployment to a web server or hosting platform like Netlify.

## Support

For support or questions, please contact the development team or open an issue in the repository.
