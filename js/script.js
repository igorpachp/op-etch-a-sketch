const DEFAULT_CELL_COLOR = "#ffffff";

const gridContainer = document.querySelector(".grid-container");
const resetButton = document.querySelector(".clear");
const sizeSlider = document.querySelector(".size-slider");

let brushMode = "mouseover";

const colorListener = function (event) {
    event.currentTarget.style.backgroundColor = "blue";
}

const resetListener = function (event) {
    gridContainer.innerHTML = "";
    makeGrid(sizeSlider.value);
}

function updateTextInput(val) {
    document.getElementById('textInput').value = val;
}

resetButton.addEventListener("click", resetListener, false);

function makeGrid(size) {
    for(let i = 0; i < size*size; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${100/size}%`;
        cell.addEventListener(brushMode, colorListener, false);
        gridContainer.appendChild(cell);
    }
}

makeGrid(sizeSlider.value);
