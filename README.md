# **LeetClone – Modern Online Coding Platform**

**LeetClone** is a full-stack web application for practicing coding problems with real-time code execution, problem management, and user authentication. Inspired by platforms like LeetCode, it is built to showcase **full-stack engineering skills**.

---

## **🚀 Highlights**

- **Secure Authentication** – JWT + cookie sessions, role-based access, Redis token blacklist.
- **Interactive Monaco Editor** – Supports JavaScript, Java, and C++.
- **Real-Time Execution** – Integrated with Judge0 API for safe, sandboxed code running.
- **Problem Management** – Admin panel for adding problems, test cases, and starter code.
- **Submission Tracking** – View and revisit past attempts with runtime/memory stats.

---

## **🛠 Tech Stack**

| Layer        | Technologies |
|--------------|--------------|
| **Frontend** | React (Vite), Redux Toolkit, React Router, TailwindCSS, DaisyUI, Monaco Editor, Zod, React Hook Form |
| **Backend**  | Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt, Redis |
| **Code Execution** | Judge0 API |
| **Tools**    | Git, Postman, VS Code |

---

## **🏗 Architecture**

[Frontend: React + Vite] ---> [Backend: Express + Node.js] ---> [MongoDB]
|
v
[Judge0 API]
|
v
[Redis]

yaml
Copy code

---

## **📂 Project Structure**

leetclone/
├── Backend/ # Node.js + Express APIs
│ ├── config/ # DB & Redis setup
│ ├── controllers/ # Business logic
│ ├── middleware/ # Auth middleware
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API endpoints
│ └── utils/ # Judge0 integration
│
├── Frontend/ # React + Vite SPA
│ ├── components/ # Reusable UI parts
│ ├── pages/ # Main views
│ ├── store/ # Redux state
│ ├── utils/ # Axios client
│ └── App.jsx # Router

yaml
Copy code

---

## **📌 Future Enhancements**
- Live collaborative coding mode.
- Problem filtering by difficulty & tags.
- Leaderboards & achievements.
- In-app discussion forum.

---

## **👨‍💻 Author**
**Abhishek Kumar** – Full Stack Developer & CS Enthusiast



