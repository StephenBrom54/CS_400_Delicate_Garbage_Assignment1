const classrooms = [
    { id: 1, name: 'Alumni Hall 101', isClean: true, techFunctional: true, isStocked: true, notes: ['Will need more markers soon.'] },
    { id: 2, name: 'Miles Hall 102', isClean: false, techFunctional: true, isStocked: true, notes: ['Coffee stain on carpet'] },
    { id: 3, name: 'Centro 102', isClean: false, isStocked: false, notes: ['Monitor not working'] },
    // This is the list of prepopulated classrooms.
];

function createClassroomElement(classroom) {
    const element = document.createElement('div');
    element.className = `classroom ${getClassroomState(classroom)}`;
    element.setAttribute('data-id', classroom.id);
    element.innerHTML = `
        <h3>${classroom.name}</h3>
        <p>Clean: <input type="checkbox" ${classroom.isClean ? 'checked' : ''} 
            onchange="toggleCondition(${classroom.id}, 'isClean')"></p>
        <p>Technology Functional: <input type="checkbox" ${classroom.techFunctional ? 'checked' : ''} 
            onchange="toggleCondition(${classroom.id}, 'techFunctional')"></p>
        <p>Inventory Stocked: <input type="checkbox" ${classroom.isStocked ? 'checked' : ''} 
            onchange="toggleCondition(${classroom.id}, 'isStocked')"></p>
        <button onclick="toggleNotes(${classroom.id})">View Notes</button>
        <div class="notes-box" id="notes-${classroom.id}" style="display: none;">
            ${classroom.notes.join('<br>')}
        </div>
    `;
    return element;
}

function toggleNotes(classroomId) {
    const notesBox = document.getElementById(`notes-${classroomId}`);
    if (notesBox.style.display === 'none') {
        notesBox.style.display = 'block';
    } else {
        notesBox.style.display = 'none';
    }
}

function toggleCondition(classroomId, condition) {
    const classroom = classrooms.find(c => c.id === classroomId);
    classroom[condition] = !classroom[condition];

    // Update the UI to reflect the change
    updateClassroomDisplay(classroom);
}


function displayClassrooms() {
    const container = document.getElementById('classrooms-container');
    classrooms.forEach(classroom => {
        container.appendChild(createClassroomElement(classroom));
    });
}

// Call this function when the page loads to display the classrooms for the user.
displayClassrooms();


function populateClassroomSelect() {
    const select = document.getElementById('classroom-select');
    classrooms.forEach(classroom => {
        const option = document.createElement('option');
        option.value = classroom.id;
        option.textContent = classroom.name;
        select.appendChild(option);
    });
}

function addFeedback() {
    const selectedClassroomId = document.getElementById('classroom-select').value;
    const feedback = document.getElementById('feedback-text').value;

    if (feedback.trim() === ''){
        //Don't add empty feedback
        alert('Please enter some feedback before submitting.');
        return;
    }

    const classroom = classrooms.find(c => c.id == selectedClassroomId);
    classroom.notes.push(feedback);

    // Update the UI to reflect the new feedback
    updateNotesDisplay(classroom);
    document.getElementById('feedback-text').value = ''; // Clear the textarea
}

function updateNotesDisplay(classroom){
    const notesBox = document.getElementById(`notes-${classroom.id}`);
    notesBox.innerHTML = classroom.notes.join('<br>');
    if (classroom.notes.length > 0) {
        notesBox.style.display = 'block'; // Show the notes box if it has content
    }
}

// Call this when the page loads
populateClassroomSelect();

function getClassroomState(classroom) {
    const conditions = [classroom.isClean, classroom.techFunctional, classroom.isStocked];
    const badConditions = conditions.filter(condition => !condition).length;

    if (badConditions > 1) return 'bad';
    if (badConditions === 1) return 'warning';
    return 'good';
}

function updateClassroomDisplay(classroom) {
    const classroomElement = document.querySelector(`.classroom[data-id="${classroom.id}"]`);
    if (classroomElement) {
        // Update the color based on the state
        classroomElement.className = `classroom ${getClassroomState(classroom)}`;
    }
}

