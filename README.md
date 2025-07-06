# 📚 CampusConnect - College Management System

CampusConnect is a full-stack web application designed to streamline and digitize campus operations, making it easier for students, teachers, and administrators to manage academic workflows. This project supports role-based access, student course management, teacher note uploads, notifications, user authentication, and more.

---

## 🚀 Features

- 👨‍🎓 Student and 👩‍🏫 Teacher roles with separate dashboards
- 🔐 Secure login and registration
- 📘 Course management (assigned and enrolled)
- 📄 Teachers can upload notes for students
- 📥 Students can view assigned notes
- 📨 Notifications module
- 🌙 Dark and light mode support
- 📋 Profile update with image upload (students)
- 📊 Admin: View users and analytics

---

## 🛠️ Technologies Used

### 🔧 Backend (Spring Boot)
- Java 17+
- Spring Boot 3.4.7
- Spring Web
- Spring Data JPA
- MySQL Database
- Hibernate ORM
- JWT (JSON Web Token) for Authentication
- Lombok
- RESTful APIs
- File Upload (for notes and images)

### 🎨 Frontend (React.js)
- React 18+
- Axios for API calls
- React Router DOM for routing
- Tailwind CSS / Custom CSS for styling
- HTML5 Video support
- Responsive design with modern UI

---

## ⚙️ How to Run the Project

### 📁 Backend - Spring Boot

1. Import project into any IDE (like IntelliJ or Eclipse)
2. Make sure `MySQL` is running and update credentials in `application.properties`
3. Run `CcSpringApplication.java`

### 🌐 Frontend - React

# Step 1: Navigate to the frontend folder
cd client  # or whatever folder your React code is in

# Step 2: Install dependencies
npm install

# Step 3: Install React Router and Axios
npm install react-router-dom
npm install axios

# Step 4: Start the development server
npm run dev

🔁 Git & GitHub Setup
If you're contributing or pushing to GitHub, use:

# Set origin (if not already)
git remote set-url origin https://github.com/malipeddisekhar/CampusConnect.git

# Add all files
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push -u origin main

📸 Screenshots (Optional)
![image](https://github.com/user-attachments/assets/e1ee6dc8-de50-4b12-a88c-6bd226717098)

🙌 Contributors
Malipeddi Sekhar - Full Stack Developer

📁 CampusConnect Project Structure
pgsql
Copy
Edit
CampusConnect/
├── backend/
│   └── src/
│       └── main/
│           ├── java/
│           │   └── com/example/CCSpring/
│           │       ├── CampusConnectApplication.java
│           │       ├── controller/
│           │       │   ├── AuthController.java
│           │       │   ├── StudentController.java
│           │       │   ├── TeacherController.java
│           │       │   ├── AdminController.java
│           │       │   └── NoteController.java
│           │       ├── dto/
│           │       │   ├── LoginRequest.java
│           │       │   ├── RegisterRequest.java
│           │       │   ├── NoteDTO.java
│           │       │   └── AssignedNotesDTO.java
│           │       ├── model/
│           │       │   ├── User.java
│           │       │   ├── Student.java
│           │       │   ├── Teacher.java
│           │       │   ├── Course.java
│           │       │   └── Note.java
│           │       ├── repository/
│           │       │   ├── UserRepository.java
│           │       │   ├── StudentRepository.java
│           │       │   ├── CourseRepository.java
│           │       │   └── NoteRepository.java
│           │       ├── security/
│           │       │   ├── JWTFilter.java
│           │       │   ├── JWTUtil.java
│           │       │   └── SecurityConfig.java
│           │       ├── service/
│           │       │   ├── UserService.java
│           │       │   ├── StudentService.java
│           │       │   └── NoteService.java
│           │       └── util/
│           │           └── FileStorageUtil.java
│           └── resources/
│               ├── static/
│               │   └── assets/         # uploaded profile photos, notes, etc.
│               ├── application.properties
│               └── templates/ (optional)
├── pom.xml

├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   │   ├── logo.jpg
│   │   │   └── students.mp4
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── student/
│   │   │   │   ├── StudentHome.jsx
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── Courses.jsx
│   │   │   │   ├── Notifications.jsx
│   │   │   │   └── ViewAssignedNotes.jsx
│   │   │   ├── teacher/
│   │   │   │   ├── TeacherHome.jsx
│   │   │   │   ├── AssignNotes.jsx
│   │   │   │   └── StudentsList.jsx
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── ViewAllUsers.jsx
│   │   │   │   └── ManageCourses.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── services/
│   │   │   └── authService.js
│   │   └── styles/
│   │       ├── StudentHome.css
│   │       └── global.css
├── package.json
├── vite.config.js
✅ Notes
Adjust folder names to your actual project if you're not using frontend/ or backend/.

Use vite or create-react-app inside frontend/

static/assets/ in backend is for uploaded files (notes, images, etc.)

The routes/ folder is optional but recommended to organize routing logic

The utils/ and services/ folders are useful for reusable functions and API configs
