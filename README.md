# Todo App (Fullstack)

This is a fullstack Todo application with:

- **Frontend**: React
- **Backend**: Node.js
- **UI Automation**: Cypress (located inside `frontend/`)
- **API Automation**: Postman (collection provided)-Todo API Tests.json

## Prerequisites
 VS Code
 node.js

## Clone the GitHub Repository

Open your Visual studio code terminal and run:
git clone https://github.com/saranyabot/todo-app.git

## Project Structure

todo-app/
├── backend/ # Node.js API server
│ └── server.js
├── frontend/ # React app + Cypress tests
│ ├── src/ # React components
│ ├── cypress/ # Cypress UI tests
│ ├── cypress.config.js
│ └── package.json
├── postman/
│   ├── todo-api-collection.json
└── README.md


## How to Run the App
Recommended :  Open three split terminals in Visual Studio Code to clearly monitor and manage each part of the application:
First terminal – Start the backend server
Second terminal – Launch the frontend React app
Third terminal – Run the Cypress test runner
This setup helps ensure all components are running and visible simultaneously.

### Start Backend - Terminal 1
cd backend
npm install
node server.js
Backend runs at: http://localhost:5000

### Start Frontend - Terminal 2
cd frontend
npm install
npm start
Frontend runs at: http://localhost:3000

### Setup Cypress in your frontend project -Terminal 3

cd frontend
npm install cypress --save-dev

**Run Cypress UI Tests**
Cypress tests are inside frontend/cypress/e2e
cd frontend
npx cypress open
Then click on todo.cy.js to run tests.

 **Run Postman API Tests**
A Postman Collection "Todo API Tests.json" is provided to automate testing of all Todo API endpoints.

Includes:(Include both positive and negative test cases)
Login (POST /login)
Add Todo (POST /todos)
Get Todos (GET /todos)
Update Todo (PUT /todos/:id)
Delete Todo (DELETE /todos/:id)

**Environment Setup within the postman collection**

baseURL = http://localhost:5000
token = (initially blank, will be set after login)

**How to Run the Collection**
Open Postman
Import the collection file and environment (todo-api-collection.json)
Click on the collection name
Click three dots on the right hand side of collection and select run (opens Collection Runner)
Click Start Run

**Note**
Make sure your backend server is running at http://localhost:5000
The token is stored in the environment and automatically added to authenticated requests via the Authorization header

Test Documentation URL link: https://1drv.ms/w/c/4a94f0ac064c4f04/EX3CaRbpFV1FlXHt_c20lj8BjYOxlcRrbA0Vu8VK_sJyWg



