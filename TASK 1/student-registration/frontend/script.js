const API_BASE_URL = "http://localhost:5000";

const studentForm = document.getElementById("studentForm");
const messageEl = document.getElementById("message");
const studentsTableBody = document.getElementById("studentsTableBody");
const submitBtn = document.getElementById("submitBtn");
const refreshBtn = document.getElementById("refreshBtn");

function setMessage(text, type = "") {
  messageEl.textContent = text;
  messageEl.className = "message";
  if (type) {
    messageEl.classList.add(type);
  }
}

function validateFormData(data) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,15}$/;

  if (!data.name.trim()) {
    return "Name is required.";
  }
  if (!emailRegex.test(data.email)) {
    return "Please enter a valid email address.";
  }
  if (!data.dob) {
    return "Date of birth is required.";
  }
  if (!data.department) {
    return "Department is required.";
  }
  if (!phoneRegex.test(data.phone)) {
    return "Phone must contain 10 to 15 digits.";
  }

  return null;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }
  return date.toISOString().split("T")[0];
}

function renderStudents(students) {
  if (!students.length) {
    studentsTableBody.innerHTML =
      '<tr><td colspan="6" class="empty">No students found.</td></tr>';
    return;
  }

  studentsTableBody.innerHTML = students
    .map(
      (student) => `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${formatDate(student.dob)}</td>
        <td>${student.department}</td>
        <td>${student.phone}</td>
      </tr>
    `
    )
    .join("");
}

async function fetchStudents() {
  try {
    const response = await fetch(`${API_BASE_URL}/students`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch students.");
    }

    renderStudents(data.students || []);
  } catch (error) {
    setMessage(error.message || "Unable to load students.", "error");
  }
}

studentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    dob: document.getElementById("dob").value,
    department: document.getElementById("department").value,
    phone: document.getElementById("phone").value.trim(),
  };

  const validationError = validateFormData(formData);
  if (validationError) {
    setMessage(validationError, "error");
    return;
  }

  submitBtn.disabled = true;
  setMessage("Registering student...");

  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register student.");
    }

    setMessage("Student registered successfully.", "success");
    studentForm.reset();
    await fetchStudents();
  } catch (error) {
    setMessage(error.message || "Registration failed.", "error");
  } finally {
    submitBtn.disabled = false;
  }
});

refreshBtn.addEventListener("click", fetchStudents);

fetchStudents();
