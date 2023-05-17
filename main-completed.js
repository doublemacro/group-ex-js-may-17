const refreshBtn = document.querySelector("#refreshBtn");
const saveMemoryBtn = document.querySelector("#saveMemory");
const loadMemoryBtn = document.querySelector("#loadMemory");
const container = document.querySelector(".container");

const API_LINK = "https://jsonplaceholder.typicode.com/todos";
const DATA_KEY_LOCALSTORAGE = "todos";


async function loadInitialData() {
    let localData = localStorage.getItem(DATA_KEY_LOCALSTORAGE);
    if (localData === null) {
        let data = await getData();
        renderData(data);
    } else {
        let parsedFromLocalstorage = JSON.parse(localData);
        renderData(parsedFromLocalstorage);
    }
}
loadInitialData();


async function getData() {
    const response = await fetch(API_LINK);
    const jsonData = await response.json();
    return jsonData;
}

function saveData(data) {
    localStorage.setItem(DATA_KEY_LOCALSTORAGE, JSON.stringify(data));
}

function renderData(data) {
    // clear container first
    container.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        let divTag = document.createElement("div");
        divTag.className = "list-item";
        let h3Tag = document.createElement("h3");
        h3Tag.innerHTML = element.title;


        let checkboxTag = document.createElement("input");
        checkboxTag.className = "completed";
        checkboxTag.type = "checkbox";
        checkboxTag.checked = element.completed;
        checkboxTag.addEventListener("change", () => {
            data[i].completed = checkboxTag.checked;
            saveData(data);
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => {
            data.splice(i, 1);
            renderData(data);
            saveData(data);
        })


        divTag.append(h3Tag);
        divTag.append(checkboxTag);
        divTag.append(deleteBtn);
        container.append(divTag);
    }
}


refreshBtn.addEventListener("click", async () => {
    let data = await getData();
    renderData(data);
})

saveMemoryBtn.addEventListener("click", async () => {
    let data = await getData();
    saveData(data);
});

loadMemoryBtn.addEventListener("click", () => {
    let data = JSON.parse(localStorage.getItem(DATA_KEY_LOCALSTORAGE));
    renderData(data);
});
