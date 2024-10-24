
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');


function addTask() {
    const taskText = taskInput.value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const li = document.createElement('li');
    li.innerText = taskText;

    const editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.onclick = function () {
        editTask(taskText, li);
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = function () {
        taskList.removeChild(li);
    };

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    taskInput.value = '';
}


function editTask(taskText, li) {
    const newTaskText = prompt('Edit your task:', taskText);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        li.childNodes[0].nodeValue = newTaskText;
    }
}


addTaskBtn.addEventListener('click', addTask);
