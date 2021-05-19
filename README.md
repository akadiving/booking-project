# Booking App

### **To run server in development mode**
-       See envSample file for enviromental variables
-       pull this branch
-       npm install
-       npm run dev


### ***API Routes***
    REQUEST METHOD ->>> PATH
#### USERS API
-        POST ->>>  /api/login 
         BODY 
            { 
                name : String,
                email : String
            }

-       POST ->>> /api/logout 

#### ADMIN API
-       POST /api/admin/login  
            Body
            {
                email : String,
                password : String
            }
-       POST /api/logout
-       GET /api/users

