// Object mapping grades to their GPA values
const grades = {
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'F': 0.0
};

// Adding an event listener for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    fetchCourses(); // Fetching courses from the database when the page loads
});

// Function to fetch courses from the backend API
async function fetchCourses() {
    const response = await fetch('/api/courses'); // Fetching courses from the API
    const courses = await response.json(); // Parsing the response as JSON
    const table = document.getElementById('courses'); // Getting the courses table element
    table.innerHTML = ''; // Clearing existing rows

    // Adding a row for each course
    courses.forEach(course => {
        const row = document.createElement('tr'); // Creating a new row
        row.innerHTML = `
            <td><input type="text" value="${course.name || ''}" placeholder="Course name"></td>
            <td><input type="text" value="${course.grade || ''}" placeholder="Grade"></td>
            <td><input type="number" value="${course.credits || ''}" placeholder="Credits"></td>
            <td><button onclick="deleteRow(this)">x</button></td>
        `;
        table.appendChild(row); // Appending the row to the table
    });

    // If no courses exist, add a default row
    if (courses.length === 0) {
        addRow(); // Adding a default row if the courses list is empty
    }
}

// Function to add a new row to the courses table
function addRow() {
    const table = document.getElementById('courses'); // Getting the courses table element
    const row = document.createElement('tr'); // Creating a new row
    row.innerHTML = `
        <td><input type="text" placeholder="Course name"></td>
        <td><input type="text" placeholder="Grade"></td>
        <td><input type="number" placeholder="Credits"></td>
        <td><button onclick="deleteRow(this)">x</button></td>
    `;
    table.appendChild(row); // Appending the row to the table
}

// Function to delete a row from the courses table
function deleteRow(button) {
    const row = button.parentNode.parentNode; // Getting the row to delete
    row.parentNode.removeChild(row); // Removing the row from the table
}

// Function to calculate GPA based on the courses in the table
function calculateGPA() {
    const table = document.getElementById('courses'); // Getting the courses table element
    let totalPoints = 0;
    let totalCredits = 0;

    // Iterating over each row in the table
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const grade = row.cells[1].children[0].value; // Getting the grade value
        const credits = parseFloat(row.cells[2].children[0].value); // Getting the credits value

        // If the grade and credits are valid, calculate total points and credits
        if (grades[grade] !== undefined && !isNaN(credits)) {
            totalPoints += grades[grade] * credits;
            totalCredits += credits;
        }
    }

    // Calculating the GPA
    const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;
    document.getElementById('gpa').textContent = gpa; // Displaying the GPA
}

// Function to reset the courses table and GPA display
function reset() {
    fetchCourses(); // Reloading courses from the database
    document.getElementById('gpa').textContent = ''; // Clearing the GPA display
}
