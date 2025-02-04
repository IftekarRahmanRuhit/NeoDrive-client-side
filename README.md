# NeoDrive

## Description of the Project

**NeoDrive** is an innovative car rental platform designed to make renting vehicles easy, fast, and user-friendly. Users can explore a wide variety of cars, make bookings effortlessly, and manage their reservations. Authenticated users can add, update, and delete car listings, ensuring a dynamic and user-driven inventory. The platform offers an intuitive and responsive experience with robust features like JWT authentication, real-time updates, and a seamless booking process.

---

## Live Demo
[Visit the Live Website](https://neodrive-be91c.web.app/)

---
## Server Side Code
[NeoDrive-Server-Side](https://github.com/IftekarRahmanRuhit/NeoDrive-server-side)

---

## Key Features
- **User Authentication**: Secure login and registration system using Firebase Authentication and JWT for private route protection.
- **Car Management**: Authenticated users can add, update, and delete car listings.
- **Search and Filter**: Advanced search and sorting options for cars based on price, date added, and availability.
- **Real-Time Updates**: Instantaneous updates on car availability and booking statuses.
- **Revenue Insights**: Visualize booking revenue using Chart.js for better financial analysis.
- **Booking Management**: Users can view, modify, or cancel their bookings from a dedicated dashboard.
- **Special Offers**: Highlighted discounts and promotions for users.
- **Error Handling**: Custom 404 error page with a "Back to Home" button.
- **Interactive UI**: Animations and dynamic elements enhance user experience.
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices.

---

## Technologies Used
### Frontend:
- **React.js**: For building a dynamic and interactive user interface.
- **React Router**: For navigation between pages.
- **Tailwind CSS**: Utility-first CSS framework for efficient styling.
- **DaisyUI**: Pre-built Tailwind components for enhanced design.
- **React Icons**: For vector icons in the UI.
- **React Hot Toast**: Interactive toast notifications for real-time feedback.
- **Animation.css**: For smooth animations throughout the platform.
- **AOS (Animate on Scroll)**: For scroll-based animations.
- **React Typewriter**: For adding typewriter-style animated text.
- **Chart.js**: For visualizing booking revenue insights.

### Backend:
- **Node.js**: Server runtime for scalable backend development.
- **Express.js**: Framework for building APIs and managing routes.
- **MongoDB**: Database to store user, car, and booking data.
- **JWT (JSON Web Token)**: For secure authentication and private route access.

### Authentication:
- **Firebase Authentication**: For login, registration, and social login options.
- **Environment Variables**: Securely managing Firebase keys and MongoDB credentials.

### Date Management:
- **Date Picker Package**: For seamless date selection.
- **Date-fns**: For formatting and manipulating dates.

---


## Key Functionalities
### Pages:
- **Home Page**:
  - Banner with motivational heading and call-to-action button.
  - "Why Choose Us?" section with icons and descriptions.
  - Recent car listings and special offers sections.
- **Add Car**: Private page for authenticated users to add car details.
- **My Cars**: View and manage cars added by the user, with options to update or delete.
- **Available Cars**: Browse and book available cars with search, filter, and sort features.
- **Car Details**: Detailed view of car information with a "Book Now" option.
- **My Bookings**: Dashboard to view, modify, or cancel bookings.

### Additional Features:
- **JWT Authentication**: Secure private routes with token validation.
- **Sorting and Filtering**: Sort cars by price, availability, or date added.
- **Error Handling**: Graceful error pages and smooth navigation.

---

## Dependencies
```json
{
  "dependencies": {
    "@eslint/js": "^9.17.0",
    "@types/react": "^18.3.17",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "daisyui": "^4.12.22",
    "eslint": "^9.17.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.13.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.3"
    "animate.css": "^4.1.1",
    "aos": "^2.3.4",
    "axios": "^1.7.9",
    "date-fns": "^4.1.0",
    "firebase": "^11.1.0",
    "localforage": "^1.10.0",
    "match-sorter": "^8.0.0",
    "react": "^18.3.1",
    "react-datepicker": "^7.5.0",
    "react-dom": "^18.3.1",
    "react-dropzone": "^14.3.5",
    "react-helmet-async": "^2.0.5",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^5.4.0",
    "react-router-dom": "^7.1.0",
    "react-simple-typewriter": "^5.0.1",
    "recharts": "^2.15.0",
    "sort-by": "^1.2.0",
    "sweetalert2": "^11.15.3"
  }
}
```
## Installation Guide

Follow these steps to set up the project locally:

### 1. Clone the Repository
```sh
git clone https://github.com/IftekarRahmanRuhit/NeoDrive-client-side.git

```
### 2. Navigate into the project folder
```sh
cd your-repository
```
### 3. Install Dependencies
```sh
npm install
```
### 4. Set Up Environment Variables
```sh
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
```
### 5. Run the Application
```sh
npm run dev
```