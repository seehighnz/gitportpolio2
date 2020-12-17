/* globals localStorage */

// FEATURE 13. Provide default values
const CYCLING_LS = "CyclesPerson"

// FEATURE 2. Add a part
class Person { // eslint-disable-line no-unused-vars
    // FEATURE 11. A calculation within a part
    // NOT IMPLEMENTED :-(
    constructor (newId, newAge, newWeight) {
      this.id = newId
      this.age = newAge
      this.weight = newWeight
      this.completed = false // FEATURE 13. Provide default values
    }
  }

class ToCycles {
    constructor (){
        this.allMyData = []
    }

// FEATURE 7. Load all parts from LocalStorage
    load(){
        const cyclesPerson = localStorage.getItem(CYCLING_LS)
        return JSON.parse (cyclesPerson || '[]')
    }

//FEATURE 6. Save all parts to LocalStorage
    save(){
        localStorage.setItem(CYCLING_LS, JSON.stringify(this.allMyTasks))
    }

    addData(newAge, newWeight){
        newAge = newAge.trim()
        newWeight = newWeight.trim()
        if(!newAge, newWeight){
            return
        }
    }

 
}