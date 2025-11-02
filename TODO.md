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

# TODO: Fix accent color consistency in admin components

## Steps:
1. ✅ Update AddEditModal.jsx to use consistent accent color (change focus:ring-[#5a422d] to focus:ring-accent, bg-[#5a422d] to bg-accent, hover:bg-[#3b2a1a] to hover:bg-accent-hover)
2. ✅ Check Sidebar.jsx for accent usage and update if needed (changed hover:bg-indigo-50 hover:text-indigo-600 to hover:bg-accent/10 hover:text-accent)
3. ✅ Update AdminAccount.jsx focus rings and button colors
4. ✅ Update HotelManagement.jsx heading, button, and table header colors
5. ✅ Update RoomsManagement.jsx heading, button, and table header colors
6. ✅ Update UserManagement.jsx button and table header colors
7. ✅ Update UserManagement.jsx styling to match HotelManagement and RoomsManagement (consistent spacing, icons, layout)
8. Test the updated components in browser to verify styling consistency
