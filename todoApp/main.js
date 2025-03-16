let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let underLine = document.getElementById("under-line");
let tabs = document.querySelectorAll(".task-tabs div");

let taskList = [];
let filterList = [];
let mode = "all";

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
    if(event.key === "Enter") { 
        addTask();
    }
})
for(let i = 1; i <tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        filter(event);
});
}

function addTask() {
  if(taskInput.value == "" || taskInput.value.length < 0) {
    alert("할 일을 입력해주세요.");
    return;
  }
  let task = {
    id: randomIdGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = "";
  filter();
}

function randomIdGenerate() {
  return "_" + Math.random().toString(36).substring(2, 9);
}

function render() {
    let resultHTML = "";
    let list = [];
    // 1. 내가 선택한 탭에 따라
    if(mode === "all") {
        list = taskList;
    } else if (mode === "ongoing" || mode === "done") {
        list = filterList;
    } 
    // 2. 리스트를 달리 보여준다
    // all taskList
    // ongoing, done filterList
    
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `                <div class="task">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">Check</button>
                        <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>`;
    } else {
      resultHTML += `                <div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id === id) {
            taskList.splice(i, 1);
            break;
        }
    }
    filter();
}

function filter(event) {
    if(event) {
        mode = event.target.id;
        horizontalIndicator(event);
    }
    
    filterList = [];
    if(mode === "all") {
        // 전체 리스트
        render();
    } else if(mode === "ongoing") {
        for(let i = 0; i < taskList.length; i++) {
            if(!taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
        render();
    } else if(mode === "done") {
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
    
}

function horizontalIndicator(event) {
    underLine.style.left = event.currentTarget.offsetLeft + "px";
    underLine.style.width = event.currentTarget.offsetWidth + "px";
    underLine.style.top = 
        event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px";

}
