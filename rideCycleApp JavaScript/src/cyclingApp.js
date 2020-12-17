/* globals localStorage */

// FEATURE 13. Provide default values
const CYCLING_LS = 'Rider' // default cycling localStorage

class Session {
  constructor (newTitle, newWeight, newDistance) {
    this.title = newTitle
    this.weight = newWeight
    this.distance = newDistance
  }
}

class SessionLog extends Session {
    constructor (newId) {
      super()
      this.id = newId
      this.stTime = 0 
      this.endTime = 0
      this.timerStart = null
      this.min = null
      this.sec = null
      this.milisec = null
      this.timerStopped = false              // false = timer hasn't been stopped
    }
    
  
    setWatch () { // set count timer
      const nowTime = new Date(Date.now() - this.stTime) // current time - start time
      this.min = this.addZero(nowTime.getMinutes())
      this.sec = this.addZero(nowTime.getSeconds())
      this.milisec = this.addZero(Math.floor(nowTime.getMilliseconds() / 10)) // to get milisec
    }
  // FEATURE 12. A calculation across many parts
    startWatch () {
      if (!this.stTime) {
        this.stTime = Date.now() // start or restart btn
      } else {
        this.stTime += (Date.now() - this.endTime) // when user restart  restart time
      }
      this.timerStart = setInterval(this.setWatch, 1)
      this.timerStopped = false         //been started
    }
    
    // FEATURE 8. Update/edit a part
    pauseWatch () { // pause btn
      if (this.timerStart) {
        clearInterval(this.timerStart) // stop setinterval
        this.endTime = Date.now()     // for restart
        this.timerStopped = true       //been paused or stopped
      }
    }
    // FEATURE 8. Update/edit a part
    resetWatch () { // stop btn
      if (this.timerStopped) {
        this.stTime = 0
        this.sec = 0
        this.min = 0
        this.milisec = 0
        this.timerStart = null
      }
    }
  
    addZero (time) {
      return (time < 10 ? '0' + time : '' + time)
    }
}
// FEATURE 1. Create a whole that acts as a Facade for parts
class SessionList {
    constructor () {
      this.allUserData = []
      this.editedItem = null
      this.editedTitleIndex = null
      this.beforeEditTitleCache = ''
    }
  
    // FEATURE 15. Get all parts
    getAllUserData () {
      return this.allUserData
    }
  
    // FEATURE 7. Load all parts from LocalStorage
    load () {
      return JSON.parse(localStorage.getItem(CYCLING_LS) || '[]') // transfer string to object
    }
  
    // FEATURE 6. Save all parts to LocalStorage
    save () {
      localStorage.setItem(CYCLING_LS, JSON.stringify(this.allUserData))
    }
  
    // FEATURE 2. Add a part / data
    addRide (newTitle, newWeight, newDistance) {
      newTitle = newTitle.trim() 
      if (!newTitle && !newWeight && !newDistance) {
        return
      }
      const newId = this.allUserData.length + 1
      const aNewSession = new SessionLog(newTitle, newWeight, newDistance, newId)
      this.allUserData.push(aNewSession)
    }
  
    // FEATURE 11. A calculation within a parts
    getCalories(title) { // Duration(in minutes) * MEL(avg cycling MEL is 8) * 3.5 * weight(kg) /200
      const min =  this.findSession(title).min
      const sec = this.findSession(title).sec
      const kg = this.findSession(title).weight
      return Math.floor(((min + (sec / 60)) * 8 * 3.5 * kg) / 200) 
    }  

    getSpeed(title) {// speed(kph) = distance(km) / time(hr)
      const distance = this.findSession(title).distance
      const min = this.findSession(title).min
      const sec = this.findSession(title).sec
      return Math.floor(distance / ((min + (sec / 60)) / 60))
    }
  
    // FEATURE 12. A calculation across many parts
    activeLapMin () {
      return this.getActiveLap().forEach(time => time.min)
    }
  
    activeLapSec () {
      return this.getActiveLap().forEach(time => time.sec)
    }
  
    activeLapMilisec () {
      return this.getActiveLap().forEach(time => time.milisec)
    }
  
    remaining () {
      return this.getActiveLap().length
    }
  
    getAllStopTimer () {
      return this.remaining() === 0
    }
  
    // FEATURE 4. Filter parts
    getFinishedTimer () {
      return this.allUserData.filter(time => time.timerStopped)
    }
    /* 
    recordFinishedTime(){
      const finishedMin = this.getFinishedTimer()[0].min
      const finishedSec = this.getFinishedTimer()[0].sec
      const finishedMiliSec = this.getFinishedTimer()[0].milisec
      return finishedMin + ':' + finishedSec + ':' + finishedMiliSec
    }
     */
    getActiveLap() {
      return this.allUserData.filter(time => !time.timerStopped)
    }

    // FEATURE 5. Delete a selected part
    removeSession (targetTitle) {
      const index = this.allUserData.findIndex(session => session.title === targetTitle)
      this.allUserData.splice(index, 1) //
    }
  
    // FEATURE 8. Update/edit a part
    startEditing (session) {
      this.beforeEditCache = session.title
      this.editedSession = session
    }

    doneEditing (session) {
      // FEATURE 10. Validate inputs
      if (!session) {
        return
      }
      this.editedTitle = null
      session.title = session.title.trim()
      if (!session.title) {
        this.removeSession(session)
      }
    }
  
    // FEATURE 9. Discard /revert edits to a part
    cancelEditing (session) {
      this.editedTitle = null
      session.title = this.beforeEditCache
    }
  
    // FEATURE 3. Sort parts
    sortSession () {
      this.allUserData.sort(function (a, b) {
        if (a.title < b.title) {
          return -1
        }
        if (a.title > b.title) {
          return 1
        }
        // a must be equal to b
        return 0
      })
    }
  
    // FEATURE 14. Find a part given a search criterion
    findSession (targetTitle) { // find selected title
      return this.allUserData.find((session) => session.title === targetTitle)
    }
  }








