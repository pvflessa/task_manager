// Variables
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

}

// 1 ) Add Task To The DOM


function addTask(e) {

  e.preventDefault();

  if(taskInput.value === '') {
    alert('Add a task');
  }

  //Create li element

  const li = document.createElement('li');
  //Add class

  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  //Create text for li

  li.textContent = taskInput.value


  //Create new link element
  const link = document.createElement('a');
  //Add class
  link.className = 'delete-item'

  li.appendChild(link)

  //Create a span element
  const span = document.createElement('span');
  //Add class
  span.className = 'badge badge-danger badge-pill'
  span.textContent = 'X'

  link.appendChild(span)

  document.querySelector('ul').appendChild(li)


  /*
  <li class="list-group-item d-flex justify-content-between align-items-center"> KEIMENO
      <a class="delete-item"><span class="badge badge-danger badge-pill">X</span></a>
  </li>
  */



  // Clear input
  taskInput.value = '';


}

// 2)  Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();


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
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.list-group-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
