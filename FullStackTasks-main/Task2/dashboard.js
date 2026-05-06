// Sample student data (in real scenario, this would come from backend API)
let allStudents = [];
let filteredStudents = [];
let currentSort = 'name-asc';
let currentFilter = '';

// Fetch student data from backend
async function fetchStudents() {
    try {
        const response = await fetch('/students');
        allStudents = await response.json();
        filteredStudents = [...allStudents];
        
        // Populate department filter dropdown
        populateDepartmentFilter();
        
        // Display initial data
        displayStudents();
        displayCountCards();
    } catch (error) {
        console.error('Error fetching students:', error);
        // Use sample data if API fails
        useSampleData();
    }
}

// Sample data for testing (remove or comment out when backend is ready)
function useSampleData() {
    allStudents = [
        {
            id: 1,
            name: 'John Smith',
            email: 'john.smith@university.edu',
            dob: '2002-03-15',
            department: 'CSE',
            phone: '9876543210'
        },
        {
            id: 2,
            name: 'Alice Johnson',
            email: 'alice.johnson@university.edu',
            dob: '2001-07-22',
            department: 'CSE',
            phone: '9876543211'
        },
        {
            id: 3,
            name: 'Bob Wilson',
            email: 'bob.wilson@university.edu',
            dob: '2003-01-10',
            department: 'ECE',
            phone: '9876543212'
        },
        {
            id: 4,
            name: 'Carol Davis',
            email: 'carol.davis@university.edu',
            dob: '2002-05-18',
            department: 'CSE',
            phone: '9876543213'
        },
        {
            id: 5,
            name: 'David Miller',
            email: 'david.miller@university.edu',
            dob: '2001-11-30',
            department: 'ECE',
            phone: '9876543214'
        },
        {
            id: 6,
            name: 'Emma Brown',
            email: 'emma.brown@university.edu',
            dob: '2003-09-12',
            department: 'ME',
            phone: '9876543215'
        },
        {
            id: 7,
            name: 'Frank Taylor',
            email: 'frank.taylor@university.edu',
            dob: '2002-02-25',
            department: 'CE',
            phone: '9876543216'
        },
        {
            id: 8,
            name: 'Grace Lee',
            email: 'grace.lee@university.edu',
            dob: '2001-08-14',
            department: 'CSE',
            phone: '9876543217'
        }
    ];

    filteredStudents = [...allStudents];
    populateDepartmentFilter();
    displayStudents();
    displayCountCards();
}

// Populate department filter dropdown
function populateDepartmentFilter() {
    const departments = [...new Set(allStudents.map(s => s.department))].sort();
    const filterSelect = document.getElementById('departmentFilter');
    
    departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept;
        option.textContent = dept;
        filterSelect.appendChild(option);
    });
}

// Display students in table
function displayStudents() {
    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = '';

    filteredStudents.forEach(student => {
        const row = document.createElement('tr');
        const formattedDOB = formatDate(student.dob);
        
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${formattedDOB}</td>
            <td>${student.department}</td>
            <td>${student.phone}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Display count cards
function displayCountCards() {
    const countSection = document.getElementById('countSection');
    countSection.innerHTML = '';

    // Get all students or filtered students based on current filter
    const dataToCount = currentFilter ? filteredStudents : allStudents;
    const departmentCounts = {};

    dataToCount.forEach(student => {
        departmentCounts[student.department] = (departmentCounts[student.department] || 0) + 1;
    });

    // Create count cards
    Object.keys(departmentCounts).sort().forEach(dept => {
        const card = document.createElement('div');
        card.className = 'count-card';
        card.innerHTML = `
            <div class="count-card-title">${dept}</div>
            <div class="count-card-number">${departmentCounts[dept]}</div>
        `;
        countSection.appendChild(card);
    });
}

// Format date to readable format
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Sort students
function sortStudents() {
    const sortValue = document.getElementById('sortDropdown').value;
    currentSort = sortValue;

    switch(sortValue) {
        case 'name-asc':
            filteredStudents.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredStudents.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'dob-newest':
            filteredStudents.sort((a, b) => new Date(b.dob) - new Date(a.dob));
            break;
        case 'dob-oldest':
            filteredStudents.sort((a, b) => new Date(a.dob) - new Date(b.dob));
            break;
    }

    displayStudents();
}

// Filter students by department
function filterByDepartment() {
    const selectedDept = document.getElementById('departmentFilter').value;
    currentFilter = selectedDept;

    if (selectedDept === '') {
        filteredStudents = [...allStudents];
    } else {
        filteredStudents = allStudents.filter(s => s.department === selectedDept);
    }

    // Apply current sort to filtered data
    sortStudents();
    displayCountCards();
}

// Event listeners
document.getElementById('sortDropdown').addEventListener('change', sortStudents);
document.getElementById('departmentFilter').addEventListener('change', filterByDepartment);

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchStudents();
});
