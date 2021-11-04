const DEFAULT_CELL_COLOR = "ffffff";
const DEFAULT_BRUSH_COLOR = "454545";
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
let currentBrushColor = `#${DEFAULT_BRUSH_COLOR}`;

// updates cell color
const colorListener = function (event) {
    // if (brushButton.classList.contains("active") || eraserButton.classList.contains("active"))
        // event.currentTarget.style.backgroundColor = currentBrushColor;
    event.currentTarget.style.backgroundColor = currentBrushColor === "random" ? randomizeColor() : currentBrushColor;
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

function updatePaintButtons() {
    if (brushButton.classList.contains("active"))
        toggleButton(brushButton);
    if (eraserButton.classList.contains("active"))
        toggleButton(eraserButton);
    if (rainbowButton.classList.contains("active"))
        toggleButton(rainbowButton);
}

function toggleBrush(event){
    target = event.currentTarget;
    if(!target.classList.contains("active")) {
        updatePaintButtons();
        currentBrushColor = `#${DEFAULT_BRUSH_COLOR}`;
        toggleButton(target);
    }
}

function toggleEraser(event) {
    target = event.currentTarget;
    if(!target.classList.contains("active")) {
        updatePaintButtons();
        currentBrushColor = `#${DEFAULT_CELL_COLOR}`;
        toggleButton(target);
    }
    else {
        toggleButton(target);
        toggleButton(brushButton);
        currentBrushColor = `#${DEFAULT_BRUSH_COLOR}`;
    }
}

function randomizeColor() {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function toggleRainbow(event) {
    target = event.currentTarget;
    if(!target.classList.contains("active")) {
        updatePaintButtons();
        currentBrushColor = "random";
        toggleButton(target);
    }
    else {
        toggleButton(target);
        toggleButton(brushButton);
        currentBrushColor = `#${DEFAULT_BRUSH_COLOR}`;
    }
}

// event listeners for each individual task
resetButton.addEventListener("click", resetListener, false);
brushButton.addEventListener("click", toggleBrush, false);
eraserButton.addEventListener("click", toggleEraser, false);
rainbowButton.addEventListener("click", toggleRainbow, false);
trailButton.addEventListener("click", toggleBrushMode, false);
clickButton.addEventListener("click", toggleBrushMode, false);

function makeGrid(size) {
    for(let i = 0; i < size*size; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${100/size}%`;
        cell.style.backgroundColor = `#${DEFAULT_CELL_COLOR}`;
        cell.addEventListener(currentBrushMode, colorListener, false);
        gridContainer.appendChild(cell);
    }
}

makeGrid(sizeSlider.value);
