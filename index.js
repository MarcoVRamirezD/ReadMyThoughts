const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");
const { json } = require("express/lib/response");

// Initializer
console.log("The App has been started...");

// Connection to the database
connection();

// Create Node server
const app = express();
const port = 3900;

// Configure CORS
app.use(cors());

// Convert body to JS Object
app.use(express.json()); // Receive data with content-type application/json
app.use(express.urlencoded({extended:true})) //Receive data with content-type "form-urlencoded"

// Routes
const article_routes = require("./routes/Article");

// Load the routes
app.use("/api/Article", article_routes);

// Testing routes
app.get("/Testing", (req, res) => {
    console.log('The endpoint "Testing has been executed."');

    return res.status(200).json([
    {
        name: "Marco Ramirez",
        Age: 24,
        Country: "Costa Rica"
    },
    {
        name: "Charlie",
        Age: 2,
        Country: "Costa Rica"
    }
    ])
});

// Create server and listen to http requests
app.listen(port, () => {
    console.log(`The server is running in the port: ${port}`);
});