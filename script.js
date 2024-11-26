document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        addTaskToDOM(task);
    });

    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            const task = {
                text: taskText,
                completed: false
            };
            tasks.push(task);
            addTaskToDOM(task);
            updateLocalStorage();
            newTaskInput.value = '';
        }
    });

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }

        li.addEventListener('click', () => {
            task.completed = !task.completed;
            li.classList.toggle('completed');
            updateLocalStorage();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = tasks.indexOf(task);
            tasks.splice(index, 1);
            li.remove();
            updateLocalStorage();
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});