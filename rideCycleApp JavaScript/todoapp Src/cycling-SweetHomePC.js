/* globals localStorage */

// FEATURE 13. Provide default values
const CYCLING_LS = "Rider", // default cycling localStorage
    CYCLING_TM =  "Timer" //default time localStorage

class Person { // eslint-disable-line no-unused-vars
    constructor (newId, newName, newWeight, newDistance) {
      this.id = newId
      this.name = newName
      this.weight = newWeight
      this.distance = newDistance
      this.recorded = false // FEATURE 13. Provide default values
    }
  }

class DoCycles {
    constructor (){
        this.allUserData = []
        this.editedItem = null
        this.editedTaskIndex = null
        this.beforeEditTitleCache = ''
    }
 // FEATURE 15. Get all parts
    getAllData () {
        return this.allUserData
    }


// FEATURE 7. Load all parts from LocalStorage
    loadUser(){
        const currentRider = localStorage.getItem(CYCLING_LS)
        if(!currentRider){
           return//no currentRider 
        }else {
            return JSON.parse (currentRider || '[]')   //transfer string to object 
        }
    }

//FEATURE 6. Save all parts to LocalStorage
    saveUser(){
        localStorage.setItem(CYCLING_LS, JSON.stringify(this.allUserData))    //rider  - allUserData [{}]
    }

// FEATURE 2. Add a part / data
    addRide(newName, newWeight, newDistance){
        newName = newName.trim()
        newWeight = newWeight.trim()
        newDistance = newDistance.trim()
        if(!newName && !newWeight && !newDistance){
            return
        }
        const newId = this.allUserData.length + 1
        const aNewPerson = new Person(newId, newName, newWeight, newDistance) // [{1, name, Weight, distance,...]
        this.allUserData.push(aNewPerson) 
    }


    // FEATURE 12. A calculation across many parts
    getCalories(duration) {  // Duration(in minutes) * MEL * 3.5 * weight(kg) /200 
        const weight = this.newWeight
        return (duration * 8 * 3.5 * weight) / 200    // avg cycling MEL is 8
    }
}

class StopWatch extends DoCycles {
    constructor(){
        super()
        this.stTime = 0
        this.endTime = 0
        this.status = "stopped"
        this.timsStart = undefined
        this.interval = null
        this.timefinished = false
        this.timeStamp = []
    }

    setWatch() {  // count time
        //define vars to hold display values. 
        let seconds = this.seconds
        let minutes = this.minutes
        seconds++
        //logic to determine when to increment next values
        if(seconds / 60 === 1){
            this.seconds = 0
            minutes++ 
            if(minutes / 60 === 1){
                this.minutes = 0
            }
        }
        if(seconds < 10){
            return this.seconds = '0' + this.seconds
        }
        if(minutes < 10){
            this.minutes = '0' + this.minutes
        }
        this.timefinished = true
    }
    
    startWatch() {
        if(this.status === "stopped"){
            this.interval = window.setInterval(setWatch, 1000)
                return status = "started"
        } 
        else {
            window.clearInterval(this.interval) //stop setinterval
            return status = "stopped"
        }
    }

    addTimer() {    // push to array
        const newLap = new StopWatch()
        this.timeStamp.push(newLap)
    }
    // FEATURE 4. Filter parts
    activeLap(){  //not stop, pause time
        return this.timeStamp.filter(time => !time.timefinished)
    }
        
    // FEATURE 4. Filter parts
    recordTime(){
        return this.timeStamp.filter(time => time.timefinished)      
    }

    remaining () {
        return this.activeLap().length       //show length in array (!timefinished)
    }

    getAllDone () {
        return this.remaining() === 0         // check if there is lap
    }

    setAllDone () {
        this.allMyTasks.forEach(time => time.timefinished = true)    //return record lap time 
    }

    resetWatch(){
        window.clearInterval(this.interval)  
        this.seconds = 0
        this.minutes = 0
        this.timefinished = false
    }

    saveTimer(){
        localStorage.setItem(CYCLING_TM, JSON.stringify(this.timeStamp))
    }

    loadTimer(){
        const timers = localStorage.getItem(CYCLING_TM)
        return JSON.parse(timers) 
    }
}






