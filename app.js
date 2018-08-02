// VARIABLES
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {

  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);

}

// 1 ) Add Task To The DOM


function addTask(e) {

  e.preventDefault();

  if(taskInput.value === '') {
    alert('Add a task');
  }



  // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'list-group-item d-flex justify-content-between align-items-center listItem';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'badge badge-danger badge-pill delete-item ';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);




  // Store in LocalStorage //5)
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';


}

// 2)  Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);

    }
  }
}

// 3) Clear Tasks Button

function clearTasks(){
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
}



// 4) Filter Tasks
function filterTasks(e) {
  const searchValue = e.target.value.toLowerCase();

  document.querySelectorAll('.listItem').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(searchValue) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

// 5) STORE TASK IN LOCALSTORAGE


function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}



// 6) GET TASKS FROM LOCALSTORAGE


function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){

    // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'list-group-item d-flex justify-content-between align-items-center listItem';
      // Create text node and append to li
      li.appendChild(document.createTextNode(task));
      // Create new link element
      const link = document.createElement('a');
      // Add class
      link.className = 'badge badge-danger badge-pill delete-item ';
      // Add icon html
      link.innerHTML = '<i class="fa fa-remove"></i>';
      // Append the link to li
      li.appendChild(link);

      // Append li to ul
      taskList.appendChild(li);

  })
}

// 7) REMOVE TASK FROM LOCALSTORAGE

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
