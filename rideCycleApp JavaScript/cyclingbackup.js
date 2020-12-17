/* globals localStorage */

// FEATURE 13. Provide default values
const CYCLING_LS = "Rider"

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
        this.interval = null
        
    }
 // FEATURE 15. Get all parts
    getAllData () {
        return this.allUserData
      }

// FEATURE 7. Load all parts from LocalStorage
    load(){
        const currentRider = localStorage.getItem(CYCLING_LS)
        if(currentRider = null){
           //no currentRider 
        }else {
            greetingRider(currentRider)
            return JSON.parse (currentRider || '[]')
        }
    }

    grettingRider(text){
        
    }

//FEATURE 6. Save all parts to LocalStorage
    save(){
        localStorage.setItem(CYCLING_LS, JSON.stringify(this.allUserData))
    }

// FEATURE 2. Add a part / data
    addRide(newWeight, newDistance){
        newWeight = newWeight.trim()
        newDistance = newDistance.trim()
        if(!newWeight && !newDistance){
            return
        }
        const newId = this.allUserData.length + 1
        const aNewPerson = new Person(newWeight, newDistance) // [{weight:newWeight, distance:newDistance},...]
        this.allUserData.push(aNewPerson) 
    }

    // FEATURE 12. A calculation across many parts
    getCalories(duration) {  // Duration(in minutes) * MEL * 3.5 * weight(kg) /200 
        const weight = this.newWeight
        return (duration * 8 * 3.5 * weight) / 200    // avg cycling MEL is 8
    }
   

    historyLog(log) { //historylog 를 필터로 현재 진행과, 완료된 기록을 분류 
        const newLog =         
    }

}

class StopWatch extends DoCycles {
    constructor(){
        super()
        this.seconds = 0
        this.minutes = 0
        this.hours = 0
        this.displaySeconds = 0
        this.displayMinutes = 0
        this.displayHours = 0
        this.status = "stopped"
    }

    startWatch() {  // count time
        //define vars to hold display values. 
        this.seconds++
        //logic to determine when to increment next values
        if(this.seconds / 60 === 1){
            this.seconds = 0
            this.minutes++ 
            if(this.minutes / 60 === 1){
                this.minutes = 0
                this.hours++
            }
        }
        
        if(this.seconds < 10){
            this.displaySeconds = '0' + this.seconds.toString()
        }
        else {
            this.displaySeconds = this.seconds
        }

        if(this.minutes < 10){
            this.displayMinutes = '0' + this.minutes.toString()
        }
        else {
            this.displayMinutes = this.minutes
        }
        if(this.hours < 10){
            this.displayHours = '0' + this.hours.toString()
        }
        else {
            this.displayhours = this.hours
        }
    }
    
    startWatch () {
        if(this.status === "stopped"){
            this.interval = window.setInterval(startWatch, 1000)
                return status = "started"
        } 
        else {
            window.clearInterval(this.interval) //stop setinterval
            return status = "stopped"
        }
    }

    recordLap(){
        if()
    }

    resetWatch(){
        window.clearInterval(this.interval)
        this.seconds = 0
        this.minutes = 0
        this.hours = 0
    }
}