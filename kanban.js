const ul = document.getElementById("foo");
const usersUl = document.getElementById("users-list");
const tachesUl = document.getElementById("taches-list");
let newTasks = [];

// les listes nécessaire au début du chargement de la page
Sortable.create(foo, {
  group: "foo",
  animation: 100,
  fallbackOnBody: true,
  ghostClass: "ghost",
  swapThreshold: 1,
});
Sortable.create(foo, {
  group: "foo",
  animation: 100,
  fallbackOnBody: true,
  ghostClass: "ghost",
  swapThreshold: 1,
});
Sortable.create(foo, {
  group: "foo",
  animation: 100,
  fallbackOnBody: true,
  ghostClass: "ghost",
  swapThreshold: 1,
});
Sortable.create(usersUl, {
  group: "foo",
  animation: 100,
  fallbackOnBody: true,
  swapThreshold: 1,
});
Sortable.create(tachesUl, {
  group: "foo",
  animation: 100,
  fallbackOnBody: true,
  swapThreshold: 1,
  ghostClass: "ghost",
});

async function postTasks(post) {
  try {
    const response = await axios.post("http://localhost:3000/tasks", post);
    console.log(response)
  } catch (err) {
    console.log(err)
  }
}

async function getusers () {
  try {
    const response = await axios.get("http://localhost:3000/users");
    return await response.data;
  } catch (err) {
    console.log(err);
  }
}

async function getTasks () {
  try {
    const response = await axios.get("http://localhost:3000/tasks");
    return await response.data;
  } catch (err) {
    console.log(err);
  }
}

async function getColumns () {
  try {
    const response = await axios.get("http://localhost:3000/columns");
    return await response.data;
  } catch (err) {
    console.log(err);
  }
}

/// simulation des éléments de retour de la base données
let users = await getusers();
console.log(users)
let taches = await getTasks();
console.log(taches);
let columns = await getColumns();
console.log(columns);

// les options permettant de créee des listes
let containers = null;
let sortableOption = {
  group: "foo",
  animation: 100,
  fallbackOnBody: true,
  ghostClass: "ghost",
  swapThreshold: 1,
};

//myUsersClasses = ["row", "list-group-item"];
//myTachesClasses = ["row", "list-group-item", "container-item"];
//myColumnsClasses = ["col", "column-containers", "list-group", "container-item"];
//myColumnsChildsClasses = ["list-group-item"];

///Afficher les colonnes provenant futurement les éléments de la base de données
for (const column of columns) {
  ul.innerHTML += `<div  class="col column-containers  list-group container-item">${column.name}
    <div id=${column.name} class="list-group-item"> 
      
    </div>
    <div/>`;
  // let newDiv = document.createElement("div")
  // newDiv.setAttribute("id",column.name+"a")
  // newDiv.classList.add(...myColumnsClasses)
  // let newContent = document.createTextNode(column.name)
  // newDiv.appendChild(newContent)
  // attachTo.appendChild(newDiv);

  // let newDiv2 = document.createElement("div")
  // newDiv2.setAttribute("id",column.name)
  // newDiv2.classList.add(...myColumnsChildsClasses)
  // let newContent2 = document.createTextNode("")
  // newDiv2.appendChild(newContent2)
  // newDiv.appendChild(newDiv2)

  Sortable.create(foo, {
    group: "foo",
    animation: 100,
    fallbackOnBody: true,
    ghostClass: "ghost",
    swapThreshold: 1,
  });
}

///Afficher les utilisateurs provenant futurement les éléments de la base de données
for (const user of users) {
  //  usersUl.innerHTML += `<div class="row list-group-item">${user}</div>`
  // createDiv(myUsersClasses,user,usersUl)
  let newDiv = document.createElement("div");
  newDiv.classList.add("row", "list-group-item");
  let newContent = document.createTextNode(user);
  newDiv.appendChild(newContent);
  usersUl.appendChild(newDiv);
}

///Afficher les taches provenant futurement les éléments de la base de données
function createTache(tache) {
  let newDiv = document.createElement("div");
  newDiv.classList.add("row", "list-group-item", "container-item");
  let childButton = document.createElement("button");
  childButton.value = tache.id;
  childButton.id = "modal";
  childButton.className = "btn btn-primary";
  childButton.setAttribute("type", "button");
  childButton.setAttribute("data-bs-toggle", "modal");
  childButton.setAttribute("data-bs-target", "#exampleModal");
  let newContent = document.createElement("div");
  newContent.textContent = tache.name;
  newDiv.appendChild(newContent);
  newDiv.appendChild(childButton);
  tachesUl.appendChild(newDiv);
}

for (const tache of taches) {
  createTache(tache);
}

const Modal = document.getElementById('exampleModal')
Modal.addEventListener('show.bs.modal', event => {


  if (document.querySelector("#buttonSave")) {
    document.querySelector("#buttonSave").remove();
  }
  
  const button = event.relatedTarget;

  const recipient = button.value;
  let item;

  if (taches.find(item => item.id == recipient) !== undefined ) {
    item = taches.find(item => item.id == recipient)
  } else {
    item = newTasks.find(item => item.id == recipient)
  }
  
  const modalTitle = exampleModal.querySelector('.modal-title')

  modalTitle.textContent = item.name;

  const footerModal = Modal.querySelector('.modal-footer');

  const buttonSave = document.createElement("button");
  buttonSave.setAttribute("type", "button");
  buttonSave.id = "buttonSave";
  buttonSave.value = item.id;
  buttonSave.className = "btn btn-success";
  buttonSave.setAttribute("data-bs-dismiss", "modal");
  buttonSave.textContent = "Save";
  
  buttonSave.addEventListener("click", (event) => {
    event.preventDefault();
    saveChanges(event.target.value);
  });

  footerModal.appendChild(buttonSave);
})

async function saveChanges(value) {
  console.log("hello")
  const update = {
      
  };

  //await Service.updateTask(value, update);
}

//ajouter une tache
const addTache = document.getElementById("ajouter-tache");

function randomNum(min, max) {
  let j = Math.floor(Math.random() * (max - min + 1) + min);
}
addTache.addEventListener("click", function () {

  //const inputTache = document.getElementById("input-tache");
  const dataTask = {
    id: randomNum(0, 999),
    name: document.getElementById("input-tache").value,
    description: "djskdéfjskfjsdkéfsddsdsdsdsdsd",
    date_from: "17:00",
    date_to: "18:00",
    status: "open"
  }

  newTasks.push(dataTask);
  
  postTasks(dataTask);
  createTache(dataTask);
});

// ajouter un utilisateur
const ajouterUser = document.getElementById("ajouter-user");
const inputUsers = document.getElementById("input-users");
ajouterUser.addEventListener("click", function () {
  // usersUl.innerHTML += `<div class="row list-group-item">${inputUsers.value}</div>`
  createDiv(myUsersClasses, inputUsers.value, usersUl);
});

// ajouter une colonne
const inputColumn = document.getElementById("input-column");
const ajouterColumn = document.getElementById("ajouter-column");
ajouterColumn.addEventListener("click", function () {
  ul.innerHTML += `<div  class="col column-containers  list-group container-item">${inputColumn.value}
  <div  class="list-group-item"> 
  
  </div>
  <div/>`;
});

// creation de sortable dans les columns
containers = document.querySelectorAll(".container-item");
for (var i = 0; i < containers.length; i++) {
  new Sortable(containers[i], sortableOption);
}

// function permettant d'ajouter une div avec des classes,un contenu et de l'attacher quelque part
function createDiv(classes, text, attachTo) {
  const newDiv = document.createElement("div");
  newDiv.classList.add(...classes);
  let newContent = document.createTextNode(text);
  newDiv.appendChild(newContent);
  attachTo.appendChild(newDiv);
}
