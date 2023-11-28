document.addEventListener("DOMContentLoaded", function () {
  const addTaskButton = document.getElementById("addTaskButton");
  const taskInput = document.querySelector(".task");
  const newTask = document.getElementById("tasks");

  function createLi() {
    return document.createElement("li");
  }

  taskInput.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
      if (!taskInput.value) return;
      addTask(taskInput.value);
    }
  });

  function createCheckBox() {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkboxLi";
    checkbox.checked = false;
    return checkbox;
  }

  function clearInput() {
    taskInput.value = "";
    taskInput.focus();
  }

  function createDeleteButton() {
    const deleteButton = document.createElement("button");
    const trashIcon = document.createElement("img");
    trashIcon.src = "/assets/img/trash-simple.svg";
    trashIcon.alt = "Delete";
    deleteButton.appendChild(trashIcon);
    deleteButton.setAttribute("class", "delete");
    deleteButton.setAttribute("title", "Delete task");
    return deleteButton;
  }

  function createEditButton() {
    const editButton = document.createElement("button");
    const editIcon = document.createElement("img");
    editIcon.src = "/assets/img/pencil-simple.svg";
    editIcon.alt = "Edit";

    editButton.appendChild(editIcon);
    editButton.setAttribute("class", "edit");
    editButton.setAttribute("title", "Edit task");

    return editButton;
  }

  function addTaskToDOM(task) {
    const li = createLi();
    const checkbox = createCheckBox();
    const spanText = document.createElement("span");
    spanText.classList.add("text");
    spanText.innerText = task.text;

    li.appendChild(checkbox);
    li.appendChild(spanText);
    newTask.appendChild(li);

    checkbox.checked = task.checked;

    if (task.checked) {
      li.classList.add("completed");
    }

    spanText.addEventListener("click", function () {
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        li.classList.add("completed");
      } else {
        li.classList.remove("completed");
      }
      saveTasks();
    });

    const editButton = createEditButton();
    const deleteButton = createDeleteButton();
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    editButton.addEventListener("click", function () {
      const newText = prompt("Enter the new text:", task.text);
      if (newText !== null) {
        task.text = newText;
        spanText.innerText = newText;
        saveTasks();
      }
    });

    deleteButton.addEventListener("click", function () {
      li.remove();
      saveTasks();
    });
  }

  function addTask(taskText, checked = false) {
    const taskObject = {
      text: taskText,
      checked: checked,
    };

    addTaskToDOM(taskObject);
    clearInput();
    saveTasks();
  }

  addTaskButton.addEventListener("click", function () {
    if (!taskInput.value) return;
    addTask(taskInput.value);
  });

  newTask.addEventListener("click", function (e) {
    const element = e.target;

    if (element.classList.contains("checkboxLi")) {
      const checkedValue = element.checked;
      const li = element.parentElement;

      if (checkedValue === true) {
        li.classList.add("completed");
      } else {
        li.classList.remove("completed");
      }
      saveTasks();
    }
  });

  function saveTasks() {
    const liTasks = newTask.querySelectorAll("li");
    const taskList = [];

    for (let task of liTasks) {
      let taskText = task.querySelector(".text").innerText;
      const checked = task.querySelector(".checkboxLi").checked;

      const taskObject = {
        text: taskText,
        checked: checked,
      };

      taskList.push(taskObject);
    }

    const tasksJSON = JSON.stringify(taskList);
    localStorage.setItem("tasks", tasksJSON);
  }

  function addSavedTasks() {
    const tasks = localStorage.getItem("tasks");
    const taskList = JSON.parse(tasks);

    if (taskList) {
      for (let task of taskList) {
        addTaskToDOM(task);
      }
    }
  }
  addSavedTasks();
});
