# CS 602 Project
# Online Travel Planner
## Author: Yiqi Lu

This project is to create an online travel planner. Users can add their travel plans, then edit, delete, and save plans. To share travel plans with other users, the plan owner can add other participants with their usernames. This project is based on Node.js, MySQL, MongoDB, Bootstrap, JQuery (and JQuery plugins), and Yelp API. All modules, frameworks, and APIs in this project have no any limitation of use.

## Installing
Run "npm install" to install all required modules listed in package.json.

## Configure Databases
This project uses MySQL and MongoDB. To configure MySQL, firstly create a new database called "CS602_Project", then run the sql file called "CS602_Project.sql" in the folder "CS602_Project_Lu" (or use "create.sql" to create tabels and triggers, then use "insert.sql" to insert records; both sql files are in the folder "CS602_Project_Lu".). MySQL uses the local port 3307; MongoDB uses the local port 27017. Credentials information of MySQL and MongoDB can be found in **credentials.js in the folder "CS602_Project_Lu"**. To change MySQL connection port, go to "dbConnection.js" in the folder "routes".

## Running the Application
The entry is "server.js" in the folder "CS602_Project_Lu". Before using this web application, users need to log in or sign up a new account.

### 1. Add a trip
Currently only three destinations in the database -- Boston, NYC, and D.C. So users can only choose these three destinations. 
**Note:** Users need to click the pop-up list of destinations after typing something -- the name of destination is the primary key in database.

### 2. Edit a trip
    1) transport: Transport information is stored in MongoDB. The travel date can only be within this trip (use the "datepicker").
    2) attraction: Attraction information is stored in MySQL. When add or edit an attraction, please click the pop-up list of names to ensure the input is valid. The pop-up list of attraction names is from the database. 
    3) hotel: Hotel information is stored in MySQL. The travel date must be within this trip (use the "datepicker").
    4) travel partners: Add partners with their usernames. All participants are able to edit the same trip. The user as the owner who created the trip, is the only user can delete this trip. Other participants can leave this trip.
    5) online chat: Use Socket.io to create an online chatroom -- messages will not be stored.
**Note:** 
    1) Every request will be checked a)if the valid user has logged in; b)if the user participate in this trip that he/she is going to edit.
    2) All records will be sorted in order of date and time.
    3) After travel dates are modified, a trigger in database will remove all records that are not within the updated dates.
    4) Since the user's input has not been validated at frontend, the error message from database will be displayed if the input is not valid. (This will be discussed more in Further Development.)

3. Look around
Display the attractions list of each destination -- currently only Boston has pictures. In each destination, Yelp API is used to search for anything insteresting and display the results. 

## Further Development
 1. To keep the security and reduce the traffic to/from database, this web application needs to validate users' input at frontend.
 2. Now only the "search" functionality powered by Yelp API uses Ajax to retrieve information. The next step is to merge all pages to create a one-page application.
 3. Store chat messages so that users can check the chat history.
 4. Add more functionalities in the "Look Around" section. Users can save or add attractions or other interesting things/places. For further development, I leave the trip_id in the page of Look Around if users click the button "Explore" in their trip edit page.
 5. Create an API to download trip information for other desktop application -- not completed yet but I wrote sample code to show the prototype.