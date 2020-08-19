const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

// Store listitems
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() })) // {value: "Jeff Bezos", sort: 0.4188508026282225}
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");
      //   listItem.classList.add("over");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;
      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

// listItems[0].className = "qwelrijqawerl"; you can change class directly

function dragStart() {
  //   console.log("Event: ", "dragstart");
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  console.log(dragStartIndex);
}

function dragEnter() {
  //   console.log("Event: ", "dragEnter");
  this.classList.add("over");
}
function dragLeave() {
  //   console.log("Event: ", "dragleave");
  this.classList.remove("over");
}
function dragOver(e) {
  //   console.log("Event: ", "dragover");
  //   nothing happens and the reason
  // for that is basically the drag over event is getting in the way.
  // So we want the read the only reason I have drag over here is to prevent the default action.
  e.preventDefault();
}
function dragDrop() {
  //   console.log("Event: ", "dragdrop");
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

// Swap list iteams that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  console.log(itemOne, itemTwo);
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();
    if (personName !== richestPeople[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);