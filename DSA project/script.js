document.addEventListener("DOMContentLoaded", () => {
    const stage = document.getElementById("stage");
    const generateBtn = document.getElementById("generateBtn");
    const solveBtn = document.getElementById("solveBtn");
    const selectionAlgorithm = document.getElementById("selectionAlgorithm");
    const numbersBars = document.getElementById("numbersBars");

    let bars = [];

    // Generate a new random array of bars
    function generateArray() {
        const numberOfBars = numbersBars.value;
        stage.innerHTML = "";
        bars = [];
        for (let i = 0; i < numberOfBars; i++) {
            const value = Math.floor(Math.random() * 100) + 10;
            const bar = document.createElement("div");
            bar.style.height = `${value}%`;
            bar.dataset.value = value;
            stage.appendChild(bar);
            bars.push(bar);
        }
    }

    // Swap two bars in the DOM
    function swapBars(bar1, bar2) {
        const tempHeight = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = tempHeight;

        const tempValue = bar1.dataset.value;
        bar1.dataset.value = bar2.dataset.value;
        bar2.dataset.value = tempValue;
    }

    // Delay function to create a pause for visual effects
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Insertion Sort Visualization - Fixed Version
    async function insertionSort() {
        const len = bars.length;
        for (let i = 1; i < len; i++) {
            let keyValue = parseInt(bars[i].dataset.value);
            let keyHeight = bars[i].style.height;
            let j = i - 1;

            bars[i].style.backgroundColor = "#FF5733"; // Mark key bar
            await delay(100);

            while (j >= 0 && parseInt(bars[j].dataset.value) > keyValue) {
                bars[j + 1].style.height = bars[j].style.height;
                bars[j + 1].dataset.value = bars[j].dataset.value;
                bars[j].style.backgroundColor = "#FF5733"; // Mark comparison
                await delay(100);
                bars[j].style.backgroundColor = "#1c92d2"; // Reset color
                j--;
            }
            bars[j + 1].style.height = keyHeight;
            bars[j + 1].dataset.value = keyValue;
            bars[j + 1].style.backgroundColor = "#76c7c0"; // Mark sorted

            await delay(100);
        }
        bars.forEach(bar => bar.style.backgroundColor = "#76c7c0"); // Mark all as sorted
    }

    // Merge Sort Visualization - Fixed Version
    async function mergeSort() {
        await mergeSortHelper(0, bars.length - 1);
        bars.forEach(bar => bar.style.backgroundColor = "#76c7c0"); // Mark all sorted
    }

    async function mergeSortHelper(left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            await mergeSortHelper(left, mid);
            await mergeSortHelper(mid + 1, right);
            await merge(left, mid, right);
        }
    }

    async function merge(left, mid, right) {
        const leftBars = bars.slice(left, mid + 1);
        const rightBars = bars.slice(mid + 1, right + 1);

        let i = 0, j = 0, k = left;

        while (i < leftBars.length && j < rightBars.length) {
            if (parseInt(leftBars[i].dataset.value) <= parseInt(rightBars[j].dataset.value)) {
                bars[k].style.height = leftBars[i].style.height;
                bars[k].dataset.value = leftBars[i].dataset.value;
                i++;
            } else {
                bars[k].style.height = rightBars[j].style.height;
                bars[k].dataset.value = rightBars[j].dataset.value;
                j++;
            }
            bars[k].style.backgroundColor = "#FF5733"; // Mark comparison
            await delay(100); // Delay for animation
            bars[k].style.backgroundColor = "#1c92d2"; // Reset color
            k++;
        }

        while (i < leftBars.length) {
            bars[k].style.height = leftBars[i].style.height;
            bars[k].dataset.value = leftBars[i].dataset.value;
            i++;
            k++;
        }

        while (j < rightBars.length) {
            bars[k].style.height = rightBars[j].style.height;
            bars[k].dataset.value = rightBars[j].dataset.value;
            j++;
            k++;
        }
    }

    // Other Sorting Algorithms (Bubble, Selection, Quick Sort) as in previous version.

    // Event Listeners
    generateBtn.addEventListener("click", generateArray);

    solveBtn.addEventListener("click", async () => {
        const algorithm = selectionAlgorithm.value;
        switch (algorithm) {
            case "bubbleSort":
                await bubbleSort();
                break;
            case "selectionSort":
                await selectionSort();
                break;
            case "quickSort":
                await quickSort();
                break;
            case "insertionSort":
                await insertionSort();
                break;
            case "mergeSort":
                await mergeSort();
                break;
            default:
                break;
        }
    });

    // Generate initial array
    generateArray();
});
