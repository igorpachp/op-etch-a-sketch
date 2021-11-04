const DEFAULT_CELL_COLOR = "#ffffff";
const DEFAULT_BRUSH_COLOR = "#454545";
const DEFAULT_BRUSH_MODE = "mouseover";

// page elements
const gridContainer = document.querySelector(".grid-container");
const resetButton = document.querySelector(".clear");
const sizeSlider = document.querySelector(".size-slider");
const brushButton = document.querySelector(".brush");
const eraserButton = document.querySelector(".eraser");
const rainbowButton = document.querySelector(".rainbow");
const trailButton = document.querySelector(".trail");
const clickButton = document.querySelector(".click");

// control variables
let currentBrushMode = DEFAULT_BRUSH_MODE;
let currentBrushColor = DEFAULT_BRUSH_COLOR;

// updates cell color
const colorListener = function (event) {
    if (brushButton.classList.contains("active") || eraserButton.classList.contains("active"))
        event.currentTarget.style.backgroundColor = `${currentBrushColor}`;
}

// resets grid with new size
const resetListener = function (event) {
    gridContainer.innerHTML = "";
    makeGrid(sizeSlider.value);
}

function updateTextOutput(val) {
    document.querySelector('.range-output').textContent = `${val} x ${val}`;
}

// handles wich button appears as active
function toggleButton(target) {
    if (target.classList.contains("active")) {
        target.classList.remove("active");
    }
    else {
        target.classList.add("active");
    }
}

// updates events for every cell in the grid
function switchBrushEvents(newMode, oldMode) {
    cells = Array.from(gridContainer.childNodes);
    cells.forEach(cell => {
        cell.removeEventListener(oldMode, colorListener, false);
        cell.addEventListener(newMode, colorListener, false);
    });
    currentBrushMode = newMode;
}

// controls the brush mode
function toggleBrushMode(event) {
    target = event.currentTarget;

    if(target.classList.contains("click")) {
        if(!target.classList.contains("active")) {
            switchBrushEvents("click", currentBrushMode);
            toggleButton(trailButton);
            toggleButton(target);
        }
        else {
            switchBrushEvents(DEFAULT_BRUSH_MODE, currentBrushMode);
            toggleButton(target);
            toggleButton(trailButton);
        }
    }
    else {
        if(!target.classList.contains("active")) {
            switchBrushEvents(DEFAULT_BRUSH_MODE, currentBrushMode);
            toggleButton(clickButton);
            toggleButton(target);
        }
        else {
            switchBrushEvents("click", currentBrushMode);
            toggleButton(target);
            toggleButton(clickButton);
        }
    }
}

// event listeners for each individual task
resetButton.addEventListener("click", resetListener, false);
trailButton.addEventListener("click", toggleBrushMode, false);
clickButton.addEventListener("click", toggleBrushMode, false);

function makeGrid(size) {
    for(let i = 0; i < size*size; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${100/size}%`;
        cell.style.backgroundColor = `${DEFAULT_CELL_COLOR}`;
        cell.addEventListener(currentBrushMode, colorListener, false);
        gridContainer.appendChild(cell);
    }
}

makeGrid(sizeSlider.value);
