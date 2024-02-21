BONE MARROW DONATION (BMD)

Basically there are two folders client and express-server.
client consists of all the frontend part in react.
express-server consists of all backend part .

To Run client - 
  1. cd client
  2.npm run start
Then open http://localhost:3000 in browser.
http://localhost:3000/Admin consists of all the information admin after logging in succefully.
The username for admin is BMD and password is BMDbmd@123.

To Run express-server - 
  1. cd express-server
  2. nodemon index.js/ node index.js
This run on local host no. 4000.
We used mongoose to store all the data in backend. 
We can see the swagger part by opening http://localhost:4000/api-docs/ in the browser.
