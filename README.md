# 📚 Book Review Platform

A full-stack MERN web app that allows users to register/login, add books, view a book list, and leave reviews with star ratings.

---

##  Features

- 🔐 User Authentication (JWT)
- 📖 Add Book with Title, Author, Genre, and Description
- 👀 View Books and Filter by Genre
- ✍️ Review and Rate Books (1 to 5 stars)
- 🧑 Added by user and shows reviews by user

---

## Tech Stack

- **Frontend**: React.js (Create React App)
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Authentication**: JSON Web Tokens (JWT)

---

## 🔧 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/kavya-310/book-review-platform.git
cd book-review-platform

2. Backend Setup
 cd server
npm install
npm run dev

3. Frontend Setup
cd ../client
npm install
npm start
Frontend will run on: http://localhost:3000
Backend will run on: http://localhost:5000

Loom Walkthrough
👉 Watch the Project Demo (https://www.loom.com/share/cb0886035a284b2bb0ba280f0a3caa89?sid=6bce19c5-2fb9-4596-bfad-41218e9ed817)

FOLDER STRUCTURE
book-review-platform/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── public/
└── README.md

👩 Author
Kavya Boddu
email: boddukavya49@gmail.com


## Notes

- Protected routes using JWT and middleware  
- Rating is strictly validated between 1 and 5  
- UI is kept simple for better usability  
- Book deletion is only allowed by the user who added it


## AI Usage Disclosure
This project was built with significant assistance from AI tools (such as ChatGPT) for code structure, implementation guidance, and debugging. However, I took the time to understand how each part of the code works, made customizations, and ensured the application logic aligns with the requirements. The final product reflects both AI support and my learning process.


