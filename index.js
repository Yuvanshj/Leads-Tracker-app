import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {  getDatabase ,
          ref, 
          push,
        onValue,
        remove} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js"

const firebaseConfig = {
  databaseURL :  "https://lead-tracker-by-yuvi-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceinDB = ref(database , "Lead")

const inputEl = document.getElementById("input-el");
const saveBtn = document.getElementById("save_btn");
const deleteBtn = document.getElementById("delete_btn");
const List = document.getElementById("list");

//
saveBtn.addEventListener("click" , function(){
  push( referenceinDB , inputEl.value) 
  inputEl.value = ""  
})


onValue(referenceinDB , function(snapshot){
  if (snapshot.exists()) {
      const snapshotValues = snapshot.val()
      const chores = Object.values(snapshotValues)
      render(chores)
  } 
})


deleteBtn.addEventListener("dblclick" , ()=>{
    remove(referenceinDB)
    List.innerHTML = null
})


function render(leads) {
  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
      listItems += `
          <li>
              <a target='_blank' href='#'>
                  ${leads[i]}

              </a>
          </li>
      `
  }
  List.innerHTML = listItems  
}

  