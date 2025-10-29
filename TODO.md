# TODO: Update pages to use new AuthContext.jsx

## Steps:
1. Export useAuth from src/context/index.js
2. Wrap App with AuthProvider in src/main.jsx
3. Update App.jsx to include routes for auth and public pages
4. Remove unused AuthContext import from src/pages/public/HomePage.jsx
5. Update useAuth import in src/pages/auth/LoginPage.jsx
6. Update useAuth import in src/pages/auth/RegisterPage.jsx
7. Update useAuth import in src/components/Header.jsx
8. Add useAuth import to src/pages/Dashboard.jsx and destructure logout
9. Test the application for auth functionality
