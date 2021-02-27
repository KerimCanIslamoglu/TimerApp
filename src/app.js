import { getDataFromApi, addTaskToApi } from './data';

class PomodoroApp {
  constructor(options) {
    let { tableTbodySelector, taskFormSelector, addButton } = options;
    this.$tableTbody = document.querySelector(tableTbodySelector);
    this.$taskForm = document.querySelector(taskFormSelector);
    this.$addButton = document.querySelector(addButton);
    this.$taskFormInput = this.$taskForm.querySelector('input');
  }

  addTask(task) {
    addTaskToApi(task)
      .then((data) => data.json())
      .then((newTask) => {
        this.addTaskToTable(newTask);
      }).then(() => {
        this.$addButton.innerText = 'Add Task';
        this.$addButton.disabled = false;
      });
  }

  addTaskToTable(task, index) {
    const $newTaskEl = document.createElement('tr');
    $newTaskEl.innerHTML = `<th scope="row">${task.id}</th><td>${task.title}</td><td><button class="btn btn-danger deleteButton" id="${task.id}" value="${task.id}">Delete</button></td>`;
    this.$tableTbody.appendChild($newTaskEl);
    this.$taskFormInput.value = '';
  }

  handleAddTask() {
    this.$taskForm.addEventListener('submit', (e) => {
      debugger;
      e.preventDefault();
      this.$addButton.innerText = 'Adding';
      this.$addButton.disabled = true;
      const task = { title: this.$taskFormInput.value };
      this.addTask(task);
    });
  }

  handleDeleteTask() {
    const deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach((item) => {
      item.addEventListener('click', (e) => {
        deleteTaskFromApi(item.value)
          .then(() => { window.location.reload() });
      });
    })
  }

  fillTasksTable() {
    getDataFromApi().then((currentTasks) => {
      currentTasks.forEach((task, index) => {
        this.addTaskToTable(task, index + 1);
      })
    }).then(() => {
      this.handleDeleteTask();
    });;
  }

  init() {
    this.fillTasksTable();
    this.handleAddTask();
  }
}

export default PomodoroApp;
