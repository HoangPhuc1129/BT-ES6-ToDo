let toDo = [];

const li = document.createElement("li");

// add  việc toDo
document.getElementById("addItem").onclick = () => {
  const newTask = dom("#newTask").value;
  toDo = [...toDo, newTask];
  displayToDo(toDo);
};

let toDoDone = [];

// đánh dấu todo đã làm xong và xóa todo muốn xóa
document.getElementById("todo").addEventListener("click", (e) => {
  let elType = e.target.getAttribute("data-type");
  let idx = e.target.getAttribute("data-idx");
  let toDoFound = toDo.find((item, index) => index == idx);

  toDoDone = [...toDoDone, toDoFound];
  switch (elType) {
    case "complete":
      displayToDoDone(toDoDone);
      toDo.splice(idx, 1);
      displayToDo(toDo);
      break;
    case "remove":
      toDo.splice(idx, 1);
      displayToDo(toDo);
  }
});

//hiển thị toDo chưa làm
function displayToDo(list) {
  const html = list.reduce((result, item, index) => {
    return (
      result +
      `
    <li> ${item}
     <div class="buttons">
     <button class="remove">
     <i data-type="remove" data-idx='${index}' class="fa-regular fa-trash-can "></i>
     </button >
     <button class="complete" > 
    <i data-type="complete" data-idx='${index}' class="fa-regular fa-circle-check "></i>
     </button>
     </div>
    
     </li>`
    );
  }, "");

  dom("#todo").innerHTML = html;

  //reset ô input sau mỗi lần add
  dom("#newTask").value = "";
}

// hiển thị các todo đã làm
function displayToDoDone(list) {
  const html = list.reduce((result, item, index) => {
    return (
      result +
      `
    <li style="color:#25b99a"> ${item}
     <div class="buttons">
     <button class="remove">
     <i data-type="remove" class="fa-regular fa-trash-can "></i>
     </button >
     <button class="complete" style="color:#25b99a" > 
    <i data-type="complete" class="fa-regular fa-circle-check "></i>
     </button>
     </div>
    
     </li>`
    );
  }, "");
  dom("#completed").innerHTML = html;
}

// Sắp xếp theo tên
function arrangeList(type) {
  if (type === 1) {
    toDo.sort((a, b) => {
      a = a.toLowerCase();
      b = b.toLowerCase();
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
  } else {
    toDo.sort((a, b) => {
      a = a.toLowerCase();
      b = b.toLowerCase();
      if (a > b) {
        return -1;
      }
      if (a < b) {
        return 1;
      }
      return 0;
    });
  }
  displayToDo(toDo);
}

// Helper function
dom = (sel) => document.querySelector(sel);
