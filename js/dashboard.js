const classrooms = [
    { id: 1, name: 'Room 101', isClean: true, isStocked: false, notes: ['Need more markers'] },
    { id: 2, name: 'Room 102', isClean: false, isStocked: true, notes: [] },
    // ... add more classrooms as needed
];

function createClassroomElement(classroom) {
    const element = document.createElement('div');
    element.className = 'classroom';
    element.innerHTML = `
        <h3>${classroom.name}</h3>
        <p>Clean: ${classroom.isClean ? 'Yes' : 'No'}</p>
        <p>Inventory Stocked: ${classroom.isStocked ? 'Yes' : 'No'}</p>
        <button onclick="viewNotes(${classroom.id})">View Notes</button>
    `;
    return element;
}

function displayClassrooms() {
    const container = document.getElementById('classrooms-container');
    classrooms.forEach(classroom => {
        container.appendChild(createClassroomElement(classroom));
    });
}

// Call this function when the page loads
displayClassrooms();


function viewNotes(classroomId) {
    const classroom = classrooms.find(c => c.id === classroomId);
    alert('Notes: ' + classroom.notes.join(', '));
}
