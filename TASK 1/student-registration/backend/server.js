const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

function validateStudentInput(body) {
  const { name, email, dob, department, phone } = body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,15}$/;

  if (!name || !name.trim()) return "Name is required.";
  if (!email || !emailRegex.test(email)) return "Valid email is required.";
  if (!dob) return "Date of birth is required.";
  if (!department || !department.trim()) return "Department is required.";
  if (!phone || !phoneRegex.test(phone)) return "Phone must be 10 to 15 digits.";

  return null;
}

app.post("/register", async (req, res) => {
  try {
    const validationError = validateStudentInput(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const { name, email, dob, department, phone } = req.body;

    const insertQuery = `
      INSERT INTO students (name, email, dob, department, phone)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(insertQuery, [
      name.trim(),
      email.trim().toLowerCase(),
      dob,
      department.trim(),
      phone.trim(),
    ]);

    return res.status(201).json({
      message: "Student registered successfully.",
      studentId: result.insertId,
    });
  } catch (error) {
    // ER_DUP_ENTRY is MySQL code for unique constraint violation.
    if (error && error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Email already exists." });
    }

    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
});

app.get("/students", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT id, name, email, dob, department, phone FROM students ORDER BY id DESC"
    );

    return res.status(200).json({ students: rows });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running." });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
