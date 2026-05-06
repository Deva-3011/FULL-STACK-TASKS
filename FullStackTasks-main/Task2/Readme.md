# 🎓 Student Dashboard

A responsive and interactive **Student Dashboard** built using **HTML, CSS, and JavaScript**.
This project displays student records with features like **sorting, filtering, and department-wise statistics**.

---

## 🚀 Features

* 📋 Display student details in a structured table
* 🔽 Sort students by:

  * Name (A–Z / Z–A)
  * Date of Birth (Newest / Oldest)
* 🔍 Filter students by department
* 📊 Dynamic department-wise count cards
* 📱 Fully responsive design

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (Vanilla JS)

---

## 📂 Project Structure

```
📁 student-dashboard
│── index.html
│── dashboard.css
│── dashboard.js
│── README.md
```

---

## ⚙️ How It Works

* Fetches student data from a backend API (`/students`)
* If API fails, uses sample data for demonstration 
* Dynamically:

  * Populates department filter
  * Displays student table
  * Updates count cards
  * Applies sorting & filtering

---

## ▶️ How to Run

1. Clone the repository:

```
git clone https://github.com/FullStackTasks.git
```

2. Open the project folder:

```
cd FullStackTasks
```

3. Run the project:

* Open `index.html` in your browser
  OR
* Use Live Server (VS Code recommended)

---

## 🔗 Backend Integration (Optional)

Replace:

```
fetch('/students')
```

with your actual backend API endpoint.

Expected JSON format:

```json
[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "dob": "2002-03-15",
    "department": "CSE",
    "phone": "9876543210"
  }
]
```

---

## 📸 UI Highlights

* Clean dashboard layout
* Blue-themed modern design
* Interactive dropdown controls
* Dynamic data rendering

---

## 💡 Future Enhancements

* ✅ Add search functionality
* ✅ Pagination for large data
* ✅ Edit/Delete student records
* ✅ Backend database integration
* ✅ Authentication system

---

## 👨‍💻 Author

**Shubham S**
B.Tech CSE Student | Developer | AI Enthusiast

---

## ⭐ Contribute

Feel free to fork this repo and improve it!
Pull requests are welcome 🚀

---
