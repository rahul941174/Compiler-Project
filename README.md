# 🖥️ Compiler Phase Simulator

An **interactive, educational web-based compiler simulator** demonstrating the complete phases of a compiler — **Lexical Analysis, Syntax Analysis, Semantic Analysis, Intermediate Code Generation, and Target Code Generation** — using a clean **React.js frontend** and **Node.js backend**.  

This project allows users to input C-like source code and process it step-by-step through all compiler phases, visualizing how compilers break down, validate, and transform source code into lower-level representations.  



## 📦 Docker Hub Deployment
The project is fully containerized and published on Docker Hub for **plug-and-play deployment** — no need to clone the source code.

**Docker Hub Repository:**  
🔗 [https://hub.docker.com/r/rahul941174/c-compiler-simulator](https://hub.docker.com/r/rahul941174/c-compiler-simulator)

We maintain **two images** in the same repository:
- `rahul941174/c-compiler-simulator:backend` → Node.js backend container (port `5000`)  
- `rahul941174/c-compiler-simulator:frontend` → React build served via Nginx (port `3000`)  

**Quick Start with Docker Compose:**
```bash
curl -O https://raw.githubusercontent.com/rahul941174/compiler-project/main/docker-compose.yml
docker compose up -d
```
Then open:
- **Frontend:** http://localhost:3000  
- **Backend:** http://localhost:5000  

---

## 📚 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Docker Hub Deployment](#docker-hub-deployment)
- [Installation (Local)](#installation-local)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Team Members](#team-members)
- [License](#license)

---

## 📝 Overview
The Compiler Phase Simulator is designed to make compiler theory practical and interactive. It breaks the compilation process into **five phases**:

1. **Lexical Analysis** – Tokenizes source code into keywords, identifiers, literals, operators, and symbols.  
2. **Syntax Analysis** – Validates code structure and grammar, detecting syntax errors with detailed reports.  
3. **Semantic Analysis** – Performs scope checking, type verification, and ensures semantic correctness.  
4. **Intermediate Code Generation** – Transforms validated code into three-address code for easier optimization.  
5. **Target Code Generation** – Produces simplified assembly-like target code from the intermediate representation.

---

## 🚀 Features
- **Step-by-step visualization** of all compiler phases.
- **Error highlighting** with line numbers and descriptive messages.
- **Code forwarding** from one phase to the next for smooth workflow.
- **Clean and modular** React.js interface.
- **Node.js backend** with dedicated controllers for each compiler phase.
- **Dockerized** for quick deployment and portability.

---

## 🛠 Architecture
The system follows a **modular client-server architecture**:

**Frontend (React.js)**  
- Pages for each phase with structured output tables.  
- React Router for navigation.  
- API calls to backend using `fetch`.  

**Backend (Node.js + Express)**  
- Separate routes & controllers for each compiler phase.  
- Middleware: `cors`, `express.json()`.  

**Data Flow**  
1. User inputs C-like code in the frontend.  
2. Frontend sends the code to backend phase endpoints via HTTP POST.  
3. Backend processes the code and returns JSON.  
4. Frontend formats and displays the results.  

---

## ⚙️ Tech Stack
- **Frontend:** React.js, React Router DOM  
- **Backend:** Node.js, Express.js  
- **Middleware:** CORS, body-parser  
- **Other Tools:** Visual Studio Code, Postman (testing)  
- **Deployment:** Docker, Docker Compose, Docker Hub  

---

## 💻 Installation (Local)
If you prefer running locally without Docker:

```bash
# Clone the repo
git clone https://github.com/rahul941174/compiler-project.git
cd compiler-project

# Start backend
cd backend
npm install
node server.js

# Start frontend
cd ../frontend
npm install
npm start
```

---

## ▶ Usage
1. Open the frontend in your browser.  
2. Enter C-like code in the code editor.  
3. Navigate through compiler phases:
   - Lexical → Syntax → Semantic → Intermediate → Target Code  
4. View structured results for each phase.

---

## 📂 Project Structure
```
Compiler-Project/
│
├── backend/         # Node.js server & routes for all compiler phases
├── frontend/        # React.js UI
├── docker-compose.yml
└── README.md
```


