//DB setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-aa190-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


//App code 
const shoppingListEl = document.getElementById("shopping-list")
const inputEle = document.getElementById("input-field")
const cartbtnEle = document.getElementById("add-button")

cartbtnEle.addEventListener("click", function(){
   let inputValue = inputEle.value
   
   push(shoppingListInDB, inputValue)
   clearInputFieldEl()
}
)

onValue(shoppingListInDB, function(snapshot) {
    
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
    
    
})


function clearShoppingListEl(){
        shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputEle.value= ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    shoppingListEl.append(newEl)

    //delete item on 

    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
                remove(exactLocationOfItemInDB)
    })
}
