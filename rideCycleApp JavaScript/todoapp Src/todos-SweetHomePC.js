/* globals localStorage */

// FEATURE 13. Provide default values
const STORAGE_KEY = 'todoListMike'

// FEATURE 2. Add a part
class Task { // eslint-disable-line no-unused-vars
  // FEATURE 11. A calculation within a part
  // NOT IMPLEMENTED :-(
  constructor (newId, newTitle) {
    this.id = newId
    this.title = newTitle
    this.completed = false // FEATURE 13. Provide default values, 완성 안됨
  }
}

// FEATURE 1. Create a whole that acts as a Facade for parts
class TodoList { // eslint-disable-line no-unused-vars
  constructor () {
    this.allMyTasks = []
    // the following 3 attibutes are used to support editing a task   TodoList {allMyTask : array[], editedItem: null, editedTaskIndex: null , beforeEditTitleCache: 'string' } 
    this.editedItem = null
    this.editedTaskIndex = null
    this.beforeEditTitleCache = ''
  }

  // FEATURE 15. Get all parts
  getAllTasks () {
    return this.allMyTasks
  }

  // FEATURE 12. A calculation across many parts ! a weak example !
  // FEATURE 4. Filter parts
  getActiveTasks () {
    return this.allMyTasks.filter(task => !task.completed)   //  active return 
  }

  // FEATURE 12. A calculation across many parts ! a weak example !
  // FEATURE 4. Filter parts
  getCompletedTasks () {
    return this.allMyTasks.filter(function (task) {  // 완료된거 뽑기
      return task.completed
    })
  }

  // FEATURE 7. Load all parts from LocalStorage
  load () {
    // FEATURE 13. Provide default values
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  }

  //  FEATURE 6. Save all parts to LocalStorage
  save () {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allMyTasks))
  }

  // FEATURE 2. Add a part / task
  addTask (newTitle) {
    newTitle = newTitle.trim()
    if (!newTitle) {
      return
    }
    // FEATURE 13. Provide default values (0+1 put into ID), this는 TodoList
    const newId = this.allMyTasks.length + 1
    const aNewTask = new Task(newId, newTitle) // task class 인스턴스. aNewTask {id:newId, title:newTitle}
    this.allMyTasks.push(aNewTask)                   
  }

  // FEATURE 12. A calculation across many parts
  remaining () {
    return this.getActiveTasks().length       //activeTask가 몇개 있는지 보여줌   1
  }

  // FEATURE 12. A calculation across many parts
  getAllDone () {
    return this.remaining() === 0         //액티브 있으면  false를 return, 없으면 true 리턴하겠지    1
  }

  setAllDone () {
    this.allMyTasks.forEach(function (task) {           //끝난거를 return 
      task.completed = true
    })
  }

  // FEATURE 5. Delete a selected part
  removeTask (targetTaskTitle) {
    const index = this.allMyTasks.findIndex(task => task.title === targetTaskTitle)
    this.allMyTasks.splice(index, 1)  // [] 에서 target이되는 문장이 같으면 없애라. 
  }

  // FEATURE 8. Update/edit a part
  // copies the task and title 
  startEditing (task) {
    this.beforeEditCache = task.title   // 클라스에서 받은 input의 title에접근해 string ''으로 반환
    this.editedTask = task  // editedTask는 파라미터 doubleclick 했을 때 받는 함수라 볼 수 있음 task는 text. 
  }

  // FEATURE 8. Update/edit a part
  doneEditing (task) {
    // FEATURE 10. Validate inputs
    if (!task) { //task가 없으면 걍 void
      return
    }
    this.editedTask = null
    task.title = task.title.trim()
    if (!task.title) {
      this.removeTask(task)
    }
  }

  // FEATURE 9. Discard /revert edits to a part
  cancelEditing (task) {
    this.editedTask = null
    task.title = this.beforeEditCache  // 그냥 그대로 두어라 . 
  }

  // FEATURE 5. Delete a selected part
  removeCompleted () {
    this.allMyTasks = this.getActiveTasks ()
  }

  // FEATURE 3. Sort parts
  sortTasks () {
    this.allMyTasks.sort(function (a, b) {
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
  // NOTE: finds only FIRST match!
  findTask (targetTitle) {
    return this.allMyTasks.find((task) => task.title === targetTitle)
  }
}


