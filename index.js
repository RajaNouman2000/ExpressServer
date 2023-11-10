import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import {
  createCollection,
  updateData,
  getData,
  deleteData,
  insertData,
  getDataById,
} from "./database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static("FrontEnd"));

// Enable CORS for all routes
app.use(cors());

app.get("/get", async (req, res) => {
  const result = await getData();
  // console.log(result);
  res.send(result);
});

// Endpoint to get data by ID

app.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  const result = await getDataById(id);

  if (result) {
    // console.log(result);
    res.json(result); // Send JSON response with the data
  } else {
    res.status(404).json({ error: "Data not found" }); // Send error response if data is not found
  }
});

// Endpoint to handle form submission
app.post("/addstudent", (req, res) => {
  try {
    // Log the request body
    console.log(req.body);

    // Insert data into the database
    insertData(req.body);

    // Return a successful response
    res.status(200).send("Successfully received the student data");
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Route handler for serving the addStudent.html file
app.get("/addStudent", (req, res) => {
  // Use the path module to get the absolute path to the HTML file
  const filePath = path.join(__dirname, "public", "index.html");
  // Send the HTML file as the response
  res.sendFile(filePath);
});
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
