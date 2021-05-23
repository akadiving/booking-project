# Booking App

### **To run server in development mode**

-       See envSample file for enviromental variables
-       pull this branch
-       npm install
-       npm run dev

### **_API Routes_**

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

-       GET /api/admin/me
-       POST /api/admin/login
            Body
            {
                email : String,
                password : String
            }
-       POST /api/logout
-       GET /api/users

##### CRUD workingTime API for ADMIN

-       POST /api/admin/workTime/add
            Body
            {
                workDay: String,
                workTime: String
            }
