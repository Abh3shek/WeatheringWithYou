// select the elements.
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST = [],
  id = 0;

//Show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-in", options);

//add to do function

function addToDo(todo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id=${id}></i>
                    <p class="text ${LINE}">${todo}</p>
                    <i class="fa fa-trash-o de" job="delete" id=${id}></i>    
                  </li>
                `;

  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", function (even) {
  if (event.keyCode == 13) {
    const todo = input.value;

    //if the input isn't empty
    if (todo) {
      addToDo(todo, id, false, false);

      LIST.push({
        name: todo,
        id: id,
        done: false,
        trash: false,
      });

      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

// check data is in present in local storage
function checkDataInStorage() {
  if (localStorage.getItem("TODO") === null) {
    LIST = [];
    return false;
  } else {
    LIST = JSON.parse(localStorage.getItem("TODO"));

    for (let i = 0; i < LIST.length; i++) {
      if (LIST[i] == null) {
        LIST.splice(i, 1);
      }
    }

    return true;
  }
}

function load_data() {
  if (checkDataInStorage()) {
    LIST.forEach(function (element) {
      if (element == null) return;
      addToDo(element.name, element.id, element.done, element.trash);
    });
  }
}

function clearAll() {
  localStorage.clear();
}

// update local storage
function updateLocalStorage() {
  localStorage.setItem("TODO", JSON.stringify(LIST));
}

//complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  element.parentNode.setAttribute(
    "data-status",
    element.classList.contains(CHECK)
  );
  // LIST[element.id].done = LIST[element.id].done ? false : true;

  var index = LIST.findIndex((x) => x.id == element.id);
  LIST[index].done = LIST[index].done ? false : true;

  updateLocalStorage();
}

//remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  var index = LIST.findIndex((x) => x.id == element.id);
  delete LIST.splice(index, 1);
  updateLocalStorage();
}

// target the items created dynamically
list.addEventListener("click", function (event) {
  const element = event.target; // returns the clicked eleement inside the list.
  const elementJob = element.attributes.job.value; //complete/delete.

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }

  updateLocalStorage();
});

load_data();
