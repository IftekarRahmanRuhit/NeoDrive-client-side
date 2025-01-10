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
