let optionsCont = document.querySelector(".options-cont");
let optionsFlag = true;
let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let toolsCont = document.querySelector(".tools-cont");
// let body = do
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let pencilFlag = false;
let eraserFlag = false;
let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload");
optionsCont.addEventListener("click", (e) => {
  optionsFlag = !optionsFlag;

  if (optionsFlag) {
    closeTools();

    // iconElem.classList[1] = "fa-chart-bar";
  } else {
    openTools();

    // iconElem.classList[1] = "fa-xmark";
  }
});

function openTools() {
  // let toolsCont = document.querySelector('.tools-cont');
  let iconElem = optionsCont.children[0];

  toolsCont.style.display = "none";
  pencilToolCont.style.display = "none";
  eraserToolCont.style.display = "none";
  iconElem.classList.remove("fa-xmark");
  iconElem.classList.add("fa-chart-bar");
}

function closeTools() {
  // let toolsCont = document.querySelector('.tools-cont');
  let iconElem = optionsCont.children[0];

  iconElem.classList.remove("fa-chart-bar");
  iconElem.classList.add("fa-xmark");
  toolsCont.style.display = "flex";
}

pencil.addEventListener("click", (e) => {
  pencilFlag = !pencilFlag;
  if (pencilFlag) {
    pencilToolCont.style.display = "block";
  } else {
    pencilToolCont.style.display = "none";
  }
});

eraser.addEventListener("click", (e) => {
  eraserFlag = !eraserFlag;
  if (eraserFlag) {
    eraserToolCont.style.display = "flex";
  } else {
    eraserToolCont.style.display = "none";
  }
});
sticky.addEventListener("click", (e) => {
  let stickyTemplateHTML=`
      <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
      </div>
      <div class="note-cont">
        <textarea name="" id="" cols="30" rows="10" placeholder='enter your notes here' spellcheck = 'false'></textarea>
      </div>
      

  `;
  createSticky(stickyTemplateHTML);
  
  // dragAnddrop(stickyCont);
});

function noteActions(minimize, remove, stickyCont) {
  remove.addEventListener("click", (e) => {
    stickyCont.remove();
  });

  minimize.addEventListener("click", (e) => {
    let noteCont = stickyCont.querySelector(".note-cont");
    let display = getComputedStyle(noteCont).getPropertyValue("display");
    if (display === "none") {
      noteCont.style.display = "block";
    } else {
      noteCont.style.display = "none";
    }
  });
}
function dragAnddrop(stickyCont, event) {
  let shiftX = event.clientX - stickyCont.getBoundingClientRect().left;
  let shiftY = event.clientY - stickyCont.getBoundingClientRect().top;

  stickyCont.style.position = "absolute";
  stickyCont.style.zIndex = 1000;
  // document.body.append(stickyCont);

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    stickyCont.style.left = pageX - shiftX + "px";
    stickyCont.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the ball, remove unneeded handlers
  stickyCont.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    stickyCont.onmouseup = null;
  };
}

upload.addEventListener("click", (e) => {
  // open file explorer
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.addEventListener("change", (e) => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);
    let stickyTemplateHTML = `
        <div class="header-cont">
          <div class="minimize"></div>
          <div class="remove"></div>
        </div>
        <div class="note-cont">
          <img src = "${url}">
        </div>
    `;
    createSticky(stickyTemplateHTML)
  });
});

function createSticky(stickyTemplateHTML) {
  let stickyCont = document.createElement("div");
  stickyCont.setAttribute("class", "sticky-cont");
  stickyCont.innerHTML = stickyTemplateHTML;
  document.body.appendChild(stickyCont);
  let minimize = stickyCont.querySelector(".minimize");
  let remove = stickyCont.querySelector('.remove')
  noteActions(minimize, remove, stickyCont);

  stickyCont.onmousedown = function (event) {
    dragAnddrop(stickyCont, event);
  };
  stickyCont.ondragstart = function () {
    return false;
  };
}
