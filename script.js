function addTask() {
  let task = document.querySelector("#taskInput").value.trim();
  let title = document.querySelector("#title").value.trim();

  if (!task || !title) {
    alert(`Enter Both title and task`);
  } else {

    const ToDo = { title, task };
    const ToDoList = getTask();
    ToDoList.push(ToDo);
    saveTasks(ToDoList);
    displayToDoList();
    document.querySelector("#taskInput").value = "";
    document.querySelector("#title").value = "";
  }
}

function getTask() {
  return JSON.parse(localStorage.getItem('Tasks')) || [];
}

function saveTasks(ToDoList) {
  localStorage.setItem(`Tasks`, JSON.stringify(ToDoList))
}

function displayToDoList() {
  const ToDoList = getTask();

  const unli = document.querySelector("#taskList");
  unli.innerHTML = '';

  ToDoList.forEach((ToDo, index) => {
    const title = `${ToDo.title}`;
    const task = `${ToDo.task}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
      ToDoList.splice(index, 1);
      saveTasks(ToDoList);
      displayToDoList();
    };

    const li = document.createElement('li');
    const titleDiv = document.createElement("div")
    const taskDiv = document.createElement("div");
    titleDiv.innerHTML = titleDiv.innerHTML + `Title: ${title}`;
    titleDiv.id = "task-title";
    taskDiv.innerHTML = taskDiv.innerHTML + `${task}`;
    taskDiv.id = "task-list";

    li.appendChild(titleDiv);
    li.appendChild(taskDiv);
    li.appendChild(deleteBtn);
    unli.appendChild(li);


  });
}

displayToDoList();