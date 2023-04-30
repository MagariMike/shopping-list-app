import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://shopping-list-app-45848-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDb = ref(database, "shoppingList");
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;

    push(shoppingListInDb, inputValue);

    clearInputfieldEl()

   
    
})

onValue(shoppingListInDb, function(snapshot){
    let itemsArray = Object.values(snapshot.val());

    clearShoppingListEll()

    for (let i =0; i < itemsArray.length; i++) {
        appendItemToShoppingListEl(itemsArray[i])
    }
    
})

const clearShoppingListEll = () => {
    shoppingListEl.innerHTML = ""
}

const clearInputfieldEl = () => {
    inputFieldEl.value = ""
}

const appendItemToShoppingListEl = (itemValue) => {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}

