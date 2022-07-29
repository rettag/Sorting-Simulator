var array = new Array;
var bars_container = document.getElementById("bars_container");

let size_slider = document.getElementById("sliderSize");
var array_size = size_slider.value;

var Barheight = 5;

let speed_slider = document.getElementById("sliderSpeed");
var speed = speed_slider.value;

button_on = false;

size_slider.addEventListener("input", function () {
    if (!button_on) {
        array_size = size_slider.value;
        bars_container.innerHTML = "";
        array = [];
        generateArray();
        renderBars();
    }
  });

speed_slider.addEventListener("input", function () {
    x = speed_slider.value;
    speed = 220 - (21 * x);
  });

function start() {
    if (!button_on) {
        array = [];
        bars_container.innerHTML = "";
        generateArray();
        renderBars();
    }
}

function generateArray() { 
    var text = document.getElementById('h4');
    text.innerHTML = "Choose a sorting algorithm to visualize";
    text.style.color = "black";

    for (let i = 0; i < array_size; i++) {
        var number = Math.floor(3 + Math.random() * 87);
        array.push(number);
    }

    //Control the hight displayed - to make sure buttons don't move up/down with each new array
    var idx = Math.floor(Math.random() * array_size);
    array[idx] = 90;
}

function renderBars() {
    for (let i = 0; i < array_size; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * Barheight + "px";
        bar.style.width = Math.floor(1100 / array_size) + "px";
        bars_container.appendChild(bar);
      }
}

function success() {
    let bars = document.getElementsByClassName("bar");
    for(let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "lightgreen";
    }

    var text = document.getElementById('h4');
    text.innerHTML = "Complete!"
    text.style.color = "lightgreen";
    button_on = false;
}

//Delay Clock
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

/*Below is Code for the various sorting algorithms*/

//Bubble Sort
function updateHeightsBubble(i, bars) {
    bars[i].style.height = array[i] * Barheight + "px";
    bars[i].style.backgroundColor = "lightgreen";
    bars[i - 1].style.height = array[i - 1] * Barheight + "px";
    bars[i - 1].style.backgroundColor = "lightgreen";
}

//Swap
function swapBubble(i) {
    let temp = array[i];
    array[i] = array[i - 1];
    array[i - 1] = temp;
}

async function bubbleSort() {
    var text = document.getElementById('h4');
    text.innerHTML = "Processing Bubble Sort..."
    text.style.color = "red";

    let bars = document.getElementsByClassName("bar");
    left = 0;
    right = array_size;
    for (let i = left; i < right - 1; i++) {
        var swapped = false;
        for (let j = right - 1; j > i; j--) {
            if (array[j] < array[j - 1]) {
                swapped = true;
                for(let k = 0; k < bars.length; k++) {
                    if (k !== j && k !== j - 1) {
                        bars[k].style.backgroundColor = "rgb(71, 135, 218)";
                    }
                }
                swapBubble(j);
                updateHeightsBubble(j, bars);
                await sleep(speed / 5);
            }
        }
        if (!swapped) {
            break;
        }
        await sleep(speed / 5);
    }

    success();
}

function generateBubbleSort() {
    if (!button_on) {
        button_on = true;
        bubbleSort();
    }
}

//Selection Sort
function swapSelection(i, minIdx) {
    let temp = array[i];
    array[i] = array[minIdx];
    array[minIdx] = temp;
}

function updateHeightsSelection(i, minIdx, bars) {
    bars[i].style.height = array[i] * Barheight + "px";
    bars[i].style.backgroundColor = "lightgreen";
    bars[minIdx].style.height = array[minIdx] * Barheight + "px";
    bars[minIdx].style.backgroundColor = "lightgreen";
}

async function selectionSort() {
    var text = document.getElementById('h4');
    text.innerHTML = "Processing Selection Sort..."
    text.style.color = "red";

    let bars = document.getElementsByClassName("bar");
    left = 0;
    right = array_size;

    for (let i = left; i < right - 1; i++) {
        var minIdx = i;
        for (let j = i + 1; j < right; j++) {
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            for(let k = 0; k < bars.length; k++) {
                if (k !== i && k !== minIdx) {
                    bars[k].style.backgroundColor = "rgb(71, 135, 218)";
                }
            }
            swapSelection(i, minIdx);
            updateHeightsSelection(i, minIdx, bars);
            await sleep(speed);
        }
        await sleep(speed);
    }
    success();
}

function generateSelectionSort() {
    if (!button_on) {
        button_on = true;
        selectionSort();
    }
}

//Insertion Sort
function swapInsertion(i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function updateHeightsInsertion(i, j, bars) {
    bars[i].style.height = array[i] * Barheight + "px";
    bars[i].style.backgroundColor = "lightgreen";
    bars[j].style.height = array[j] * Barheight + "px";
    bars[j].style.backgroundColor = "lightgreen";
}

async function insertionSort() {
    var text = document.getElementById('h4');
    text.innerHTML = "Processing Insertion Sort..."
    text.style.color = "red";

    let bars = document.getElementsByClassName("bar");
    left = 0;
    right = array_size;

    for (let i = right - 1; i > left; --i) {
        if (array[i] < array[i - 1]) {
            //For updating bars color
            for(let k = 0; k < bars.length; k++) {
                if (k !== i && k !== i - 1) {
                    bars[k].style.backgroundColor = "rgb(71, 135, 218)";
                }
            }
            swapInsertion(i - 1, i);
            updateHeightsInsertion(i - 1, i, bars);
            await sleep(speed);
        }
    }

    for (let i = left + 2; i < right; ++i) {
        let v = array[i];
        let j = i;
        while(v < array[j - 1]) {
            array[j] = array[j - 1];
            updateHeightsInsertion(j, j - 1, bars);
            //await sleep(speed);
            --j;
        }
        array[j] = v;
        bars[j].style.height = array[j] * Barheight + "px";
        bars[j].style.backgroundColor = "lightgreen";
        await sleep(speed);
    }
    success();
}

function generateInsertionSort() {
    if (!button_on) {
        button_on = true;
        insertionSort();
    }
}

//Quick Sort
function swapQuick(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

}

function updateHeightsQuick(arr, i, j) {
    let bars = document.getElementsByClassName("bar");

    bars[i].style.height = arr[i] * Barheight + "px";
    bars[i].style.backgroundColor = "lightgreen";
    bars[j].style.height = arr[j] * Barheight + "px";
    bars[j].style.backgroundColor = "lightgreen";
}

async function partition(arr, left, right) {
    let pivot = --right;
    while(true) {
        while(arr[left] < arr[pivot]) {
            ++left;
        }
        while(left < right && arr[right - 1] >= arr[pivot]) {
            --right;
        }
        if (left >= right) {
            break;
        }
        if (left !== right - 1) {
            swapQuick(arr, left, right - 1)
            updateHeightsQuick(arr, left, right - 1);
            await sleep(speed);
        }
    }
    if (pivot !== left) {
        swapQuick(arr, left, pivot);
        updateHeightsQuick(arr, left, pivot);
        await sleep(speed);
    }
    return left;
}

async function quickSort(arr, left, right) {
    if (left + 1 >= right) {
        return;
    }
    let pivot = await partition(arr, left, right);
    await quickSort(arr, left, pivot);
    await quickSort(arr, pivot + 1, right);
}

async function generateQuickSort() {
    if(!button_on) {
        var text = document.getElementById('h4');
        text.innerHTML = "Processing Quick Sort..."
        text.style.color = "red";

        button_on = true;
        left = 0;
        right = array_size;
        await quickSort(array, left, right);
        success();
    }
}

//Merge Sort
function updateHeightsMerge(arr, i, j, bars) {
    bars[i].style.height = arr[i] * Barheight + "px";
    bars[i].style.backgroundColor = "lightgreen";
    bars[j].style.height = arr[j] * Barheight + "px";
    bars[j].style.backgroundColor = "lightgreen";
}

async function merge(arr, left, mid, right) {
    let bars = document.getElementsByClassName("bar");

    let n = right - left;
    let c = [];
    for (let i = 0; i < n; i++) {
        c.push(50);
    }
    
    let i = left;
    let h = mid;
    for (let k = 0; k < n; ++k) {
        if (i == mid) {
            c[k] = arr[h];
            h++
        }
        else if (h == right) {
            c[k] = arr[i];
            i++
        }
        else {
            if (arr[i] <= arr[h]) {
                c[k] = arr[i];
                i++;
            }
            else {
                c[k] = arr[h];
                h++;
            }
        }
    }

    let j = left;
    for (let i = 0; i < c.length; i++) {
        arr[j] = c[i];
        bars[j].style.height = arr[j] * Barheight + "px";
        bars[j].style.backgroundColor = "lightgreen";
        ++j;
        await sleep(speed);
    }
}

async function mergeSort(arr, left, right) {
    if (right < left + 2) {
        return;
    }
    let mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid, right);
    await merge(arr, left, mid, right);
}

async function generateMergeSort() {
    if (!button_on) {
        button_on = true;
        var text = document.getElementById('h4');
        text.innerHTML = "Processing Merge Sort..."
        text.style.color = "red";

        let left = 0;
        let right = array_size;

        await mergeSort(array, left, right);
        success();
    }
}

//Heap Sort
function swapHeap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function updateHeightsHeap(arr, i, j, bars) {
    bars[i].style.height = arr[i] * Barheight + "px";
    bars[i].style.backgroundColor = "lightgreen";
    bars[j].style.height = arr[j] * Barheight + "px";
    bars[j].style.backgroundColor = "lightgreen";
}

async function heapify(arr, n, i) {
    let bars = document.getElementsByClassName("bar");

    let largest = i;
    let l = (2 * i) + 1;
    let r = (2 * i) + 2;

    if (l < n && arr[l] > arr[largest]) {
       largest = l;
    }
    if (r < n && arr[r] > arr[largest]) {
        largest = r;
    }
    if (largest != i) {
        swapHeap(arr, i, largest);
        updateHeightsHeap(arr, i, largest, bars);
        await sleep(speed);
  
        await heapify(arr, n, largest);
    }
}

async function sortHeap(arr) {
    let bars = document.getElementsByClassName("bar");
    let n = array_size;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i);
    }
    for (let i = n - 1; i >= 0; i--) {
        // Move current root to end
        swapHeap(arr, i, 0);
        updateHeightsHeap(arr, i, 0, bars);
        await sleep(speed);

        // call max heapify on the reduced heap
        await heapify(arr, i, 0);
    }
    success();
}

async function heapSort() {
    if (!button_on) {
        button_on = true;
        var text = document.getElementById('h4');
        text.innerHTML = "Processing Heap Sort..."
        text.style.color = "red";

        await sortHeap(array);
    }
}