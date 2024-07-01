let theList = document.getElementById("theList");
document.getElementById("add").addEventListener("click", () => {
    let todo = document.getElementById("todo");

    let todoObj = {
        name: todo.value,
        wasExecuted: "no"
    };
    addItem(todoObj);

    let todoArr = localStorage.getItem("todoList");
    if (todoArr == null) {
        let arr = [JSON.stringify(todoObj)];
        localStorage.setItem("todoList", JSON.stringify(arr));
    } else {
        let arr = [...JSON.parse(todoArr), JSON.stringify(todoObj)];
        localStorage.setItem("todoList", JSON.stringify(arr));
    }
});

let todoArr = JSON.parse(localStorage.getItem("todoList"));
if (todoArr != null) {
    let objArr = todoArr.map(item => JSON.parse(item));
    objArr.forEach((element, index) => {
        addItem(element);
    });
}

document.getElementById("del").addEventListener("click", cleanList);

function cleanList() {
    let todoArr = JSON.parse(localStorage.getItem("todoList"));
    if (todoArr == null) { return; }
    let objArr = todoArr.map(item => JSON.parse(item));
    let filteredArr = objArr.filter((item) => item.wasExecuted == "no");
    console.log(filteredArr);
    filteredObjArr = filteredArr.map((item) => JSON.stringify(item));
    localStorage.setItem("todoList", JSON.stringify(filteredObjArr));
    let litem = document.querySelectorAll(".list-item");

    litem.forEach(item => theList.removeChild(item));
    filteredArr.forEach(item => addItem(item));
}

function addItem(element) {
    console.log("element is:" + element.name);
    let wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.classList.add("list-item");
    let li = document.createElement("li");
    li.textContent = `todo: ${element.name}`;
    li.className = "lst";
    if (element.wasExecuted == "yes") {
        li.style.textDecoration = "line-through";
    }
    let chk = document.createElement("input");
    chk.type = "checkbox";
    chk.className = "box";
    if (element.wasExecuted == "yes") {
        chk.checked = true;
    }
    chk.addEventListener("change", () => {
        if (chk.checked) {
            element.wasExecuted = "yes";
            li.style.textDecoration = "line-through";
            let todoArr = JSON.parse(localStorage.getItem("todoList"));
            if (todoArr != null) {
                let objArr = todoArr.map(item => JSON.parse(item));
                objArr.forEach((item) => {
                    if (item.name == element.name) {
                        item.wasExecuted = "yes";
                    }
                });
                let stringifyArr = objArr.map((item) => JSON.stringify(item));
                localStorage.setItem("todoList", JSON.stringify(stringifyArr));
            }
        }
    });
    let btn = document.createElement("button");
    btn.textContent = "del todo item";
    btn.addEventListener("click", () => {
        let todoArr = JSON.parse(localStorage.getItem("todoList"));
        if (todoArr != null) {
            let woArr = [];
            let objArr = todoArr.map(item => JSON.parse(item));
            objArr.forEach((item) => {
                if (item.name != element.name) {
                    woArr.push(item);
                }
            });
            let woStringified = woArr.map(item => JSON.stringify(item));
            localStorage.setItem("todoList", JSON.stringify(woStringified));
        }
        chk.checked = true;
        li.style.textDecoration = "line-through";
        element.wasExecuted = "yes";

    })

    wrapper.appendChild(li);
    wrapper.appendChild(chk);
    wrapper.appendChild(btn);
    theList.appendChild(wrapper);
}

document.querySelectorAll(".box").forEach((box, index) => {
    box.addEventListener("change", () => {
        console.log("inside change of box index:" + index);
        let todoArr = JSON.parse(localStorage.getItem("todoList"));
        if (todoArr != null) {
            let objArr = todoArr.map(item => JSON.parse(item));
            objArr.forEach((element, ix) => {
                if (ix == index) {
                    console.log("ix==index.is:" + ix);
                    element.wasExecuted = box.checked ? "yes" : "no";
                    document.querySelectorAll(".lst").forEach((li, i) => {
                        if (i == ix && box.checked) {
                            li.style.textDecoration = "line-through";
                        }
                    });
                }
            });
            reloadLocalStorageItem(objArr);
        }
    })
});

function reloadLocalStorageItem(objArr) {
    localStorage.removeItem("todoList");
    let jsonArr = objArr.map(item => JSON.stringify(item));
    localStorage.setItem("todoList", JSON.stringify(jsonArr));
}