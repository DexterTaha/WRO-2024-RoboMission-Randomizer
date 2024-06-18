// Define the object areas for each map category
const objectAreas = {
    senior: Array.from(document.getElementsByClassName("map_senior_blocks")),
    senior_startArea: Array.from(document.getElementsByClassName("map_senior_startareas")),
    junior: document.getElementById("map_junior_park"),
    elementary1: Array.from(document.getElementsByClassName("map_elementary_vegetables")),
    elementary2: document.getElementById("map_elementary_green_and_dirts")
};

// Get all map elements
const maps = Array.from(document.getElementsByClassName("map"));

// Function to randomize elements on the maps
function random() {
    
    // Senior map
    clearChildren(objectAreas.senior_startArea);
    clearChildren(objectAreas.senior);

    const startArea = Math.floor(Math.random() * 2); // 0 or 1
    const checkImg = createImageElement("./media/check.png");
    objectAreas.senior_startArea[startArea].append(checkImg);

    randomColorArray(["blue", "green"], 4).forEach((color, index) => {
        const img = createImageElement(`./media/${color}.jpg`);
        if (index <= 1 && startArea == 1) {
            objectAreas.senior[index].append(img);
        } else {
            objectAreas.senior[index + 2].append(img);
        }
    });

    // Junior map
    clearChildren(objectAreas.junior);
    randomColorArray(["blue", "green", "red"], 2).forEach(color => {
        const img = createImageElement(`./media/${color}.jpg`);
        objectAreas.junior.append(img);
    });

    // Elementary map
    clearChildren(objectAreas.elementary1);
    randomColorArray(["yellow", "red"], 2).forEach((color, index) => {
        const img = createImageElement(`./media/${color}.jpg`);
        objectAreas.elementary1[index].append(img);
    });

    clearChildren(objectAreas.elementary2);
    randomColorArray(["green", "black"], 3).forEach((color, index) => {
        const img = createImageElement(`./media/${color}.jpg`);
        objectAreas.elementary2.append(img);
        if (index == 2) {
            const div = document.createElement("div");
            objectAreas.elementary2.append(div);
        }
    });
}

// Function to clear children of a DOM element or array of elements
function clearChildren(elements) {
    if (Array.isArray(elements)) {
        elements.forEach(element => {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        });
    } else {
        while (elements.firstChild) {
            elements.removeChild(elements.firstChild);
        }
    }
}

// Function to create an image element
function createImageElement(src) {
    const img = document.createElement("img");
    img.src = src;
    return img;
}

// Function to capture a screenshot of the selected map
function screenshot() {
    const selectedMap = maps.find(map => map.classList.contains("select"));
    htmlToImage.toJpeg(selectedMap, { quality: 0.95 })
        .then(dataUrl => {
            const link = document.createElement('a');
            link.download = 'Map.jpeg';
            link.href = dataUrl;
            link.click();
        });
}

// Function to change the displayed map category
function changeCategory(value) {
    maps.forEach((map, index) => {
        map.classList.toggle("select", index === parseInt(value));
    });
}

// Function to generate a random array of colors
function randomColorArray(colors, n) {
    return colors.flatMap(color => Array(n).fill(color)).sort(() => Math.random() - 0.5);
}

// Initial randomization on page load
random();
