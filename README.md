## ABOUT THE PROJECT 
This project is an API developed for queue management in a service center.The system can add a new customer to the queue, view, delete and update all the customers in the queue

## TECH STACK
Node.js
Express.js
MongoDB (Atlas)
Mongoose
dotenv

## Instructions for running locally
1. Clone the repository
git clone https://github.com/MehparaK/Smart_Queue_API.git
cd Smart_queue
2. Install the packages
npm install
3. Set up the environment file
Copy the .env.example file with the .env adi, and write a little MongoDB connection string inside it:
cp .env.example .env
4. Start the server:
node server.js
## API ENDPOINTS
1. Fetch all queues

GET /api/queues

Response — 200 OK

[
  {
    "_id": "xxxxxxxxxxxxxxxxxxxxxxx (burda başqa id olur)",
    "name": "random name", 
    "status": "Waiting", 
    "createdAt": "2026-10-21T23:13:49.609Z",
    "updatedAt": "2026-10-21T23:13:49.609Z"
  }
]

2. Fetching a customer by ID

GET /api/queues/:id

Response — 200 OK

{
  "_id": "xxxxxxxxxxxxxxxxxxxxxxx (burda başqa id olur)",
  "name": "random name", 
  "status": "Waiting", 
  "createdAt": "2026-10-21T23:13:49.609Z",
  "updatedAt": "2026-10-21T23:13:49.609Z"
}

Error — 404 Not Found

{ "error": "this customer doesnt exist" }

3. Adding a new customer to the queue

POST /api/queues

Request Body

{
  "name": "random name" (məcburidir, boş olduqda status kodu 400 qaytarır)
}
Response-201 Created

{
  "_id": "xxxxxxxxxxxxxxxxxxxxxxx (burda başqa id olur)",
  "name": "random name",
  "status": "Waiting",
  "createdAt": "2026-10-21T23:13:49.609Z",
  "updatedAt": "2026-10-21T23:13:49.609Z"
}
Error-400 Bad request

{ "error": "'name' cannot be empty" }

4. Calling the next customer / updating status (Atomic Update)

POST /api/queues/next

Response — 200 OK

{
  "_id": "xxxxxxxxxxxxxxxxxxxxxxx (burda başqa id olur)",
  "name": "random name",
  "status": "Serving",
  "createdAt": "2026-10-21T23:13:49.609Z",
  "updatedAt": "2026-10-21T23:13:49.609Z"
}

Error — 404 Not Found
{ "error": "no customers in the queue" }

5. Removing a customer from the queue

DELETE /api/queues/:id

Response — 200 OK
{
  "_id": "xxxxxxxxxxxxxxxxxxxxxxx (burda başqa id olur)",
  "name": "random name",
  "status": "Waiting",
  "createdAt": "2026-10-21T23:13:49.609Z",
  "updatedAt": "2026-10-21T23:13:49.609Z"
}

Error — 404 Not Found

{ "error": "this customer doesnt exist" }