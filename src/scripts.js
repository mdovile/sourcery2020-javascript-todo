const containerDiv = document.querySelector('.todo-list');

const formElement = document.querySelector('.add-todo-form');
formElement.addEventListener('submit', handleFormSubmit);

const completeButton = document.getElementsByClassName('complete');
for (var i = 0; i < completeButton.length; i++) {
  completeButton[i].addEventListener('click', handleComplete);
}

const deleteButton = document.getElementsByClassName('delete');
for (var i = 0; i < deleteButton.length; i++) {
  deleteButton[i].addEventListener('click', handleDelete);
}

function handleFormSubmit(e) {
  e.preventDefault();

  const inField = document.querySelector('.add-todo-form > input');
  const inValue = inField.value;

  const newTodo = document.createElement('li');
  newTodo.textContent = inValue;

  newTodo.classList.add('todo-item');

  const buttons = document.createElement('div');
  buttons.classList.add('buttons');
  const completeButton = addCompleteButton()
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete');
  deleteButton.textContent = 'Delete';
  buttons.appendChild(completeButton);
  buttons.appendChild(deleteButton);

  deleteButton.addEventListener('click', handleDelete);
  
  newTodo.appendChild(buttons);

  containerDiv.appendChild(newTodo);
  
  inField.value = null;
}

function handleComplete(e) {
  const completedTodo = this.parentElement.parentElement;
  completedTodo.classList.add('completedTodo');
  const revertButton = document.createElement('button'); 
  revertButton.classList.add('revert');
  revertButton.textContent = 'Revert';
  revertButton.id = 'revert';
  revertButton.addEventListener('click', handleRevert);
  this.parentElement.appendChild(revertButton);
  e.currentTarget.parentNode.removeChild(this);
}

function handleDelete(e) {
  e.currentTarget.parentNode.parentNode.remove();
}

function handleRevert(e) {
  const completedTodo = e.currentTarget.parentElement.parentElement;
  completedTodo.classList.remove('completedTodo');
  const buttonToAdd = addCompleteButton();
  this.parentElement.insertBefore(buttonToAdd, this.parentElement.firstChild);
  e.currentTarget.parentNode.removeChild(document.getElementById('revert'));
}

function addCompleteButton() {
  const completeButton = document.createElement('button');
  completeButton.classList.add('complete');
  completeButton.id = 'complete';
  completeButton.textContent = 'Complete';
  completeButton.addEventListener('click', handleComplete);
  return completeButton;
}