# TODO: Unify Theme Across All Public and Auth Pages

## Overview
Ensure all pages in `src/pages/public/` and `src/pages/auth/` have consistent theme elements including colors, spacing, fonts, hero sections, backgrounds, text colors, buttons, forms, and CTA sections. The theme is based on Tailwind config with primary black (#0a0a0a), accent gold (#a37d4c), fonts (Gilda Display, Barlow), and standardized layouts.

## Current Issues Identified
- Inconsistent background colors (e.g., bg-gray-50 in some pages)
- Varying text colors and spacing
- Non-standardized hero sections (though mostly consistent)
- Different form and button styling
- Inconsistent CTA sections

## Steps to Complete

### 1. Standardize Hero Sections
- Ensure all pages use the same hero structure: `bg-room h-[400px] relative flex justify-center items-center bg-cover bg-center` with overlay `bg-black/70` and text `text-6xl text-white z-20 font-primary text-center`
- Update any variations (e.g., RoomDetailsPage uses h-[560px], adjust to 400px for consistency)

### 2. Unify Background Colors
- Remove inconsistent backgrounds like `bg-gray-50` (used in AboutUsPage, PrivacyPolicyPage)
- Use consistent white or transparent sections for content areas
- Ensure main content uses `bg-white` where needed for contrast

### 3. Standardize Text Colors and Spacing
- Use `text-gray-700` for body text
- Use `text-primary` for headings where appropriate
- Ensure consistent spacing with `container mx-auto py-14 px-4` for main sections
- Standardize paragraph spacing and justification

### 4. Uniform Button and Form Styling
- All buttons use `btn btn-primary` or `btn btn-lg btn-primary`
- Forms use consistent classes: `bg-white shadow-lg rounded-lg p-8` for containers, `shadow border rounded w-full py-2 px-3 text-gray-700` for inputs
- Labels use `block text-gray-700 text-sm font-bold mb-2`

### 5. Consistent CTA Sections
- Standardize CTA sections with `bg-primary text-white rounded-lg shadow-lg` and consistent button styling
- Ensure links use `btn btn-lg btn-primary` and `btn btn-lg border border-white text-white`

### 6. Update Specific Pages
- **Public Pages:**
  - AboutUsPage: Remove bg-gray-50, standardize sections
  - ContactUsPage: Already mostly consistent
  - FAQPage: Standardize hero and CTA
  - PrivacyPolicyPage: Remove bg-gray-50, standardize
  - HomePage: Already consistent
  - HotelListingPage: Implement full theme (currently minimal)
  - OnlineBookingForm: Implement full theme
  - RoomDetailsPage: Adjust hero height, standardize
- **Auth Pages:**
  - LoginPage: Already consistent
  - RegisterPage: Already consistent
  - PasswordResetPage: Already consistent

### 7. Testing and Verification
- After updates, verify all pages look consistent
- Check responsiveness and theme adherence

## Files to Edit
- frontend/src/pages/public/AboutUsPage.jsx
- frontend/src/pages/public/ContactUsPage.jsx
- frontend/src/pages/public/FAQPage.jsx
- frontend/src/pages/public/PrivacyPolicyPage.jsx
- frontend/src/pages/public/HotelListingPage.jsx
- frontend/src/pages/public/OnlineBookingForm.jsx
- frontend/src/pages/public/RoomDetailsPage.jsx
- frontend/src/pages/auth/LoginPage.jsx (minor if needed)
- frontend/src/pages/auth/RegisterPage.jsx (minor if needed)
- frontend/src/pages/auth/PasswordResetPage.jsx (minor if needed)

## Dependencies
- No new dependencies needed
- Relies on existing Tailwind config and CSS

## Followup Steps
- Run the app to visually inspect changes
- Make any final adjustments for consistency

# TODO: Prevent index.css from applying to dashboard pages

## Overview
The index.css file contains Tailwind CSS and custom styles for public pages. Dashboard pages use their own styles via Layout component. To avoid conflicts, load index.css conditionally only for non-dashboard routes.

## Steps to Complete

### 1. Remove Global Import
- [x] Remove the line `import "./style/index.css";` from frontend/src/App.jsx

### 2. Add Conditional Loading
- [x] In the ConditionalLayout component in App.jsx, add useEffect to dynamically import index.css only when the current path is not a dashboard route (not starting with /dashboard or /admin)

### 3. Testing and Verification
- Test dashboard pages to confirm index.css styles do not apply
- Test public pages to ensure index.css styles still work
- Check for any style conflicts

## Files to Edit
- [x] frontend/src/App.jsx

## Dependencies
- No new dependencies needed

## Followup Steps
- Run the app to verify changes
- Make adjustments if needed
