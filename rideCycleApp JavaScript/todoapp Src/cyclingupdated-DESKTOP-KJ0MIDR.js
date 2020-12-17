/* globals localStorage */

// FEATURE 13. Provide default values
const CYCLING_LS = "Rider", // default cycling localStorage
    CYCLING_TM =  "Timer" //default time localStorage

class Person { // eslint-disable-line no-unused-vars
    constructor (newTitle, newWeight, newDistance) {
      this.title = newTitle
      this.weight = newWeight
      this.distance = newDistance
      this.recorded = false // FEATURE 13. Provide default values
    }
  }

class DoCycles {
    constructor (){
        this.allUserData = []
        this.timeStampData = []
        this.editedItem = null
        this.editedTaskIndex = null
        this.beforeEditTitleCache = ''
    }
 // FEATURE 15. Get all parts
    getAllUserData () {
        return this.allUserData
    }

    getTimestampData(){
        return this.timestampData
    }


// FEATURE 7. Load all parts from LocalStorage
    loadUser(){
        const currentRider = localStorage.getItem(CYCLING_LS)
        if(!currentRider){
           return
        }else {
            return JSON.parse (currentRider || '[]')   //transfer string to object
        }
    }

    loadTimer(){
        const currentTimer = localStorage.getItem(CYCLING_TM)
        if(!currentTimer){
            return
        }else {
            return Json.parse (currentTimer || '[]')
        }
    }

//FEATURE 6. Save all parts to LocalStorage
    saveAllData(){
        localStorage.setItem(CYCLING_LS, JSON.stringify(this.allUserData))
        localStorage.setItem(CYCLING_TM, JSON.stringify(this.timestampData))    
    }

// FEATURE 2. Add a part / data
    addRide(newWeight, newDistance){
        newWeight = newWeight.trim()
        newDistance = newDistance.trim()
        newDuration = newDuration.trim()
        if(!newWeight && !newDistance){
            return
        }
        const newId = this.timeStampData.length + 1
        const aNewPerson = new Person(newTitle, newWeight, newDistance) // [Person{Weight, distance, Stopwatch{Id, ....}]
        const aNewStopwatch = new Stopwatch(newId)                           // [Stopwatch{title, duration, stTime,......}]
        this.allUserData.push(aNewPerson)
        this.timestampData.push(aNewStopwatch)
    }

    // FEATURE 12. A calculation across many parts
    getCalories(minutes, seconds, kg) {  // Duration(in minutes) * MEL * 3.5 * weight(kg) /200 
        return ((minutes.min + seconds.sec/60) * 8 * 3.5 * kg.weight) / 200    // avg cycling MEL is 8
    }

    getSpeed(distance, minutes, seconds){
        const kmh = distance.distance / durati
    }

    // FEATURE 4. Filter parts - filter not timefinished
    setActiveLap(){  
        return this.timeStampData.filter(time => !time.timefinished)  
    }
    
    remaining () {                              //lap btn 
        return this.setActiveLap().length       //show length in array (!timefinished)
    }
   

    getAllDone () {
        return this.remaining() === 0         // check if there is lap
    }

    setAllDone () {
        this.timeStampData.forEach(time => time.timefinished = true)    // lap time 
    }

    // FEATURE 4. Filter parts
    recordTotal(){                             //to record finished time
        return this.timeStampData.filter(time => time.timefinished)      
    }

// FEATURE 5. Delete a selected part
    removeCompleted () {
        this.timeStampData = this.getActiveLap()
      }
}



class StopWatch {
    constructor(newTitle, newId){
        this.id = newId
        this.title = newTitle
        this.stTime = 0
        this.endTime = 0
        this.timerStart = null
        this.min = null
        this.sec = null
        this.milisec = null 
        this.status = "stopped"
        this.timefinished = false
    }

    setWatch() {  // set count timer
        const nowTime = new Date(Date.now() - this.stTime)
        this.min = addZero(nowTime.getMinutes())
        this.sec = addZero(nowTime.getSeconds())
        this.milisec = addZero(Math.floor(nowTime.getMilliseconds() / 10)) //to get milisec 
    }
    
    startWatch() {                                      
        if(!this.stTime) {
            this.stTime = Date.now()    //start || restart btn
        } else {
            this.stTime += (Date.now() - this.endTime)  //when user restart
        }
        this.timerStart = setInterval(setWatch, 1)
        this.timefinished = true                       //not finished
        this.status = "started"
    }

    pauseWatch() {                              //pause btn
        if(this.timerStart){
            clearInterval(this.timerStart)      //stop setinterval
            this.endTime = Date.now()           //for restart 
            this.status = "stopped"
        }
    }

    resetWatch() {                              //stop btn 
        if(this.status === "stopped"){
            this.stTime = 0
            this.sec = 0
            this.min = 0
            this.milisec = 0
            this.timerStart = null
            this.timefinished = false
            recordTotal()
        }
    }

    addZero(number) {
        return (number < 10 ? '0'+number : ''+number)
    }
}






