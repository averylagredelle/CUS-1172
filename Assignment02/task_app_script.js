class Task {
    constructor(title, priority, completed) {
        this.title = title;
        this.priority = priority;
        this.completed = completed;
    }
}

var taskArray = [];
var numberOfTasks = 0;

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#submit").onclick = function() {
        let title = document.querySelector("#title").value;
        let priorityChoices = document.querySelector("#priority");
        let priority = priorityChoices.options[priorityChoices.selectedIndex].value;
        let completed = false;
        if(document.querySelector("#status_completed").checked) {
            completed = true;
        }

        const myTask = new Task(title, priority, completed);
        addTask(myTask);

        document.querySelector("#title").value = "";
        return false; //Prevents the page from reloading and removing our task by stopping the function here.
    };

    showEmptyListText();
});

function showEmptyListText() {
    let taskList = document.querySelector("#task_list");
    const text = document.createElement("li");

    text.innerHTML = "No tasks added";
    text.className = "italicized";
    text.id = "empty_list_text";
    taskList.append(text);
}

function hideEmptyListText() {
    document.querySelector("#empty_list_text").remove();
}

function addTask(task) {
    let taskList = document.querySelector("#task_list");
    const newTask = document.createElement("li");
    
    const taskTitle = document.createElement("span");
    taskTitle.className = "bg-light block";
    taskTitle.style.padding = "5px";
    taskTitle.innerHTML = task.title;
    newTask.append(taskTitle)

    const taskPriority = document.createElement("span");
    taskPriority.innerHTML = task.priority;
    
    if(task.priority === "Low") {
        taskPriority.className = "badge badge-info small-block";
    }
    else if(task.priority === "Medium") {
        taskPriority.className = "badge badge-warning small-block";
    }
    else if(task.priority === "High") {
        taskPriority.className = "badge badge-danger small-block";
    }

    newTask.append(taskPriority);

    const taskStatus = document.createElement("span");
    if(task.completed) {
        taskStatus.className = "badge badge-success";
        taskStatus.innerHTML = "Completed";
        taskTitle.style.textDecoration = "line-through";
    }
    else {
        taskStatus.className = "badge badge-secondary";
        taskStatus.innerHTML = "Pending";
    }
    newTask.append(taskStatus);

    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-danger block";
    removeButton.innerHTML = "Remove Task";
    removeButton.onclick = removeTask;
    newTask.append(removeButton);

    if(task.completed) {
        newTask.append(newMarkPendingButton());
    }
    else {
        newTask.append(newMarkCompletedButton());
    }
    
    taskList.append(newTask);

    taskArray[numberOfTasks] = task;
    numberOfTasks++;

    if(numberOfTasks === 1) {
        hideEmptyListText();
    }

    console.log("Task Added");
    console.log(taskArray);
}

function removeTask() {
    for(let i = 0; i < taskArray.length; i++)
    {
        if(this.parentElement.firstChild.innerHTML === taskArray[i].title)
        {
            removeFromTaskArray(i);
        }
    }
    this.parentElement.remove();
}

function removeFromTaskArray(index) {
    console.log("Task Removed");
    let newTaskArray = [];
    let currentIndex = 0;

    for(let i = 0; i < index; i++) {
        newTaskArray[i] = taskArray[i];
        currentIndex = i;
    }
    currentIndex = index;
    for(let i = index + 1; i < taskArray.length; i++) {
        newTaskArray[currentIndex] = taskArray[i];
        currentIndex++;
    }

    taskArray = newTaskArray;
    numberOfTasks--;

    if(numberOfTasks === 0) {
        showEmptyListText();
    }
    
    console.log(taskArray);
}

function newMarkCompletedButton() {
    const newMarkCompletedButton = document.createElement("button");
    newMarkCompletedButton.className = "btn btn-success";
    newMarkCompletedButton.innerHTML = "Mark Completed";
    newMarkCompletedButton.onclick = markCompleted;
    return newMarkCompletedButton;
}

function markCompleted() {
    this.parentElement.firstChild.style.textDecoration = "line-through";
    this.parentElement.children[2].innerHTML = "Completed";
    this.parentElement.children[2].className = "badge badge-success";

    for(let i = 0; i < taskArray.length; i++)
    {
        if(this.parentElement.firstChild.innerHTML === taskArray[i].title)
        {
            taskArray[i].completed = true;
        }
    }
    
    console.log("Task Array Updated");
    console.log(taskArray);

    this.parentElement.append(newMarkPendingButton());
    this.remove();
}

function newMarkPendingButton() {
    const newMarkPendingButton = document.createElement("button");
    newMarkPendingButton.className = "btn btn-warning";
    newMarkPendingButton.innerHTML = "Mark Pending";
    newMarkPendingButton.onclick = markPending;
    return newMarkPendingButton;
}

function markPending() {
    this.parentElement.firstChild.style.textDecoration = "none";
    this.parentElement.children[2].innerHTML = "Pending";
    this.parentElement.children[2].className = "badge badge-secondary";

    for(let i = 0; i < taskArray.length; i++)
    {
        if(this.parentElement.firstChild.innerHTML === taskArray[i].title)
        {
            taskArray[i].completed = false;
        }
    }
    
    console.log("Task Array Updated");
    console.log(taskArray);

    this.parentElement.append(newMarkCompletedButton());
    this.remove();
}