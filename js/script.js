const DEFAULT_CELL_COLOR = "transparent";
const DEFAULT_BRUSH_COLOR = "454545";
const DEFAULT_BRUSH_MODE = "mouseover";

// page elements
const gridContainer = document.querySelector(".grid-container");
const colorPicker = document.getElementById("color-picker");
const resetButton = document.querySelector(".clear");
const sizeSlider = document.querySelector(".size-slider");
const brushButton = document.querySelector(".brush");
const eraserButton = document.querySelector(".eraser");
const rainbowButton = document.querySelector(".rainbow");
const resizeButton = document.querySelector(".resize");
const trackButton = document.querySelector(".trail");
const clickButton = document.querySelector(".click");
const dragButton = document.querySelector(".drag");
const shadeButton = document.querySelector(".shade");
const lightButton = document.querySelector(".light");

// control variables
let currentBrushMode = DEFAULT_BRUSH_MODE;
let currentBrushColor = `#${DEFAULT_BRUSH_COLOR}`;
let currentSize = 16;
let shadeIncrement = 0;

// updates cell color
function paintCell(cell, color) {
    let finalColor = DEFAULT_BRUSH_COLOR;
    switch (color) {
        case "random":
            finalColor = randomizeColor();
            break;
        case "shade":
            let cellColor = cell.style.backgroundColor;
            if (cellColor !== "transparent") {
                cellColor = cellColor.slice(3).slice(1, cellColor.length-1).split(",");
                finalColor = shadeCell(cellColor, shadeIncrement);
            }
            break;
        default:
            finalColor = color;
    }
    cell.style.backgroundColor = finalColor;
}

// handles cell event
const colorListener = function (event) {
    if (currentBrushMode !== "drag")
        paintCell(event.currentTarget, currentBrushColor);
    else {
        if (event.buttons)
        paintCell(event.currentTarget, currentBrushColor);
    }
}

// GRID FUNCTIONS ---------------------------------------
// resets grid with new size
const resetListener = function () {
    gridContainer.innerHTML = "";
    makeGrid(currentSize);
}

function makeGrid(size) {
    for(let i = 0; i < size*size; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${100/size}%`;
        cell.style.backgroundColor = DEFAULT_CELL_COLOR;
        cell.setAttribute('draggable', 'false');
        if (currentBrushMode !== "drag")
            cell.addEventListener(currentBrushMode, colorListener, false);
        else {
            cell.addEventListener("mousedown", colorListener, false);
            cell.addEventListener("mouseover", colorListener, false);
        }
        gridContainer.appendChild(cell);
    }
}

function resizeGrid() {
    gridContainer.innerHTML = "";
    makeGrid(sizeSlider.value);
    currentSize = sizeSlider.value;
}

function updateTextOutput(val) {
    document.querySelector('.range-output').textContent = `${val} x ${val}`;
}

// BUTTONS FUNCTIONS -------------------------------------
// handles wich button appears as active
function toggleButton(target) {
    if (target.classList.contains("active")) {
        target.classList.remove("active");
    }
    else {
        target.classList.add("active");
    }
}

// deactivate all brush mode buttons
function updateBrushButtons() {
    if (brushButton.classList.contains("active"))
        toggleButton(brushButton);
    if (eraserButton.classList.contains("active"))
        toggleButton(eraserButton);
    if (rainbowButton.classList.contains("active"))
        toggleButton(rainbowButton);
}

// deactivate all paint mode buttons
function updatePaintButtons() {
    if (clickButton.classList.contains("active"))
        toggleButton(clickButton);
    if (trackButton.classList.contains("active"))
        toggleButton(trackButton);
    if (dragButton.classList.contains("active"))
        toggleButton(dragButton);
}

// deactivate shade and light mode buttons
function updateShadeButtons() {
    if (shadeButton.classList.contains("active"))
        toggleButton(shadeButton);
    if (lightButton.classList.contains("active"))
        toggleButton(lightButton);
}

// updates events for every cell in the grid
function switchBrushEvents(newMode, oldMode) {
    cells = Array.from(gridContainer.childNodes);
    cells.forEach(cell => {
        if (oldMode !== "drag")
            cell.removeEventListener(oldMode, colorListener, false);
        else {
            cell.removeEventListener("mousedown", colorListener, false);
            cell.removeEventListener("mouseover", colorListener, false);
        }
        if (newMode !== "drag")
            cell.addEventListener(newMode, colorListener, false);
        else {
            cell.addEventListener("mousedown", colorListener, false);
            cell.addEventListener("mouseover", colorListener, false);
        }
    });
    currentBrushMode = newMode;
}

// controls the brush mode
function toggleBrushMode(event) {
    target = event.currentTarget;

    if(!target.classList.contains("active")) {
        updatePaintButtons();
        toggleButton(target);
        if(target.classList.contains("click"))
            switchBrushEvents("click", currentBrushMode);
        else if(target.classList.contains("drag"))
            switchBrushEvents("drag", currentBrushMode);
        else
            switchBrushEvents(DEFAULT_BRUSH_MODE, currentBrushMode);
    }
    else {
        updatePaintButtons();
        toggleButton(trackButton);
        switchBrushEvents(DEFAULT_BRUSH_MODE, currentBrushMode);
    }
}

function setCurrentColor(newColor) {
    if (brushButton.classList.contains("active") && currentBrushColor !== "shade")
        currentBrushColor = newColor;
}

function randomizeColor() {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function toggleBrush(event){
    target = event.currentTarget;
    if(!target.classList.contains("active")) {
        updateBrushButtons();
        currentBrushColor = colorPicker.value;
        toggleButton(target);
    }
}

function toggleEraser(event) {
    target = event.currentTarget;
    if(!target.classList.contains("active")) {
        updateBrushButtons();
        updateShadeButtons();
        shadeIncrement = 0;
        currentBrushColor = DEFAULT_CELL_COLOR;
        toggleButton(target);
    }
    else {
        toggleButton(target);
        toggleButton(brushButton);
        currentBrushColor = colorPicker.value;
    }
}

function toggleRainbow(event) {
    target = event.currentTarget;
    if(!target.classList.contains("active")) {
        updateBrushButtons();
        updateShadeButtons();
        shadeIncrement = 0;
        currentBrushColor = "random";
        toggleButton(target);
    }
    else {
        toggleButton(target);
        toggleButton(brushButton);
        currentBrushColor = colorPicker.value;
    }
}

// controls the shade mode
function toggleShade(event) {
    target = event.currentTarget;

    if(!brushButton.classList.contains("active")) {
        updateBrushButtons();
        currentBrushColor = colorPicker.value;
        toggleButton(brushButton);
    }

    if(!target.classList.contains("active")) {
        updateShadeButtons();
        currentBrushColor = "shade";
        shadeIncrement = target.classList.contains("shade") ? -10 : 10;
    }
    else {
        shadeIncrement = 0;
        currentBrushColor = colorPicker.value;
    }
    toggleButton(target);
}

function calculateColor(color, value) {
    color = color + value;
    color = (color > 0xFF) ? "FF" : (color < 0x00) ? "00" : (color < 0x10) ? `0${color.toString(16)}` : color.toString(16);
    return color;
}

function shadeCell(color, value) {
    for (let i = 0; i < color.length; i++)
        color[i] = parseInt(color[i]);
    let red = calculateColor(color[0], value);
    let green = calculateColor(color[1], value);
    let blue = calculateColor(color[2], value);
    console.log([red,green,blue]);
    return `#${red}${green}${blue}`;
}

// event listeners for each individual task
resetButton.addEventListener("click", resetListener, false);
brushButton.addEventListener("click", toggleBrush, false);
eraserButton.addEventListener("click", toggleEraser, false);
rainbowButton.addEventListener("click", toggleRainbow, false);
resizeButton.addEventListener("click", resizeGrid, false);
trackButton.addEventListener("click", toggleBrushMode, false);
clickButton.addEventListener("click", toggleBrushMode, false);
dragButton.addEventListener("click", toggleBrushMode, false);
shadeButton.addEventListener("click", toggleShade, false);
lightButton.addEventListener("click", toggleShade, false);
colorPicker.onchange = (e) => setCurrentColor(colorPicker.value);

colorPicker.value = currentBrushColor;
gridContainer.setAttribute('draggable', 'false');
gridContainer.style.backgroundColor = "#ffffff";
makeGrid(sizeSlider.value);
