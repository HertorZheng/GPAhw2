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

document.addEventListener('DOMContentLoaded', () => {
    fetchCourses();
});

async function fetchCourses() {
    const response = await fetch('/api/courses');
    const courses = await response.json();
    const table = document.getElementById('courses');
    table.innerHTML = ''; // Clear existing rows

    courses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="text" value="${course.name}" placeholder="Course name"></td>
            <td><input type="text" value="${course.grade}" placeholder="Grade"></td>
            <td><input type="number" value="${course.credits}" placeholder="Credits"></td>
            <td><button onclick="deleteRow(this)">x</button></td>
        `;
        table.appendChild(row);
    });

    // If no courses exist, add a default row
    if (courses.length === 0) {
        addRow();
    }
}

function addRow() {
    const table = document.getElementById('courses');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" placeholder="Course name"></td>
        <td><input type="text" placeholder="Grade"></td>
        <td><input type="number" placeholder="Credits"></td>
        <td><button onclick="deleteRow(this)">x</button></td>
    `;
    table.appendChild(row);
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function calculateGPA() {
    const table = document.getElementById('courses');
    let totalPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const grade = row.cells[1].children[0].value;
        const credits = parseFloat(row.cells[2].children[0].value);

        if (grades[grade] !== undefined && !isNaN(credits)) {
            totalPoints += grades[grade] * credits;
            totalCredits += credits;
        }
    }

    const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;
    document.getElementById('gpa').textContent = gpa;
}

function reset() {
    fetchCourses(); // Reload courses from the database
    document.getElementById('gpa').textContent = '';
}
