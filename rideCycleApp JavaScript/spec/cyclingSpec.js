/* globals describe it xdescribe xit beforeEach expect SessionList localStorage CYCLING_LS */
describe('SessionList', function () {
  var theSessionList

  function getSession (allData) {
    const allSession = []
    for (const aSession of allData) {
      allSession.push(aSession.title)
    }
    return allSession                    //allSession {title:}
  }

  beforeEach(function () {
    theSessionList = new SessionList()
  })

  describe('adding sessions', function () {
    // FEATURE 1. Create a whole that acts as a Facade for parts
    // FEATURE 2. Add a part
    describe('when a single session with a title of "a new session", with a weight(kg) of number, and with a distance(km) of number is added', function(){
      var theSession                                                              
      beforeEach(function () {
        theSessionList.addRide('a new session', 55, 2)
        theSession = theSessionList.allUserData[0]
      })

      describe('the added single session', function () {
        it('should have a title of "a new session"', function () {
          expect(theSession.title).toBe('a new session')
        })

        it('should have a weight of "a new session"', function () {
          expect(theSession.weight).toBe(55)
        })

        it('should have a distance of "a new session"', function () {
          expect(theSession.distance).toBe(2)
        })

        it('should have an id of 1', function () {
          expect(theSession.id).toBe(1)
        })

        it('should have a stTime of "a new session"', function () {
          expect(theSession.stTime).toBe(0)
        })

        it('should have a endTime of "a new session"', function () {
          expect(theSession.endTime).toBe(0)
        })

        it('should have a timerStart of "a new session"', function () {
          expect(theSession.timerStart).toBe(null)
        })

        it('should have a minute of "a new session"', function () {
          expect(theSession.min).toBe(null)
        })

        it('should have a second of "a new session"', function () {
          expect(theSession.sec).toBe(null)
        })

        it('should have a milisecond of "a new session"', function () {
          expect(theSession.milisec).toBe(null)
        })

        it('Time have not been stopped', function () {
          expect(theSession.timerStopped).toBeFalsy()
        })
      })

      describe('the SessionList app', function () {
        it('should have one session', function () {
          expect(theSessionList.allUserData.length).toBe(1)
        })

        it('should have a active session remaining', function () {
          expect(theSessionList.remaining()).toBe(1)
        })

        it('should not have finished timer', function () {
          expect(theSessionList.getAllStopTimer()).toBeFalsy()
        })
      })
    })

    describe('when three session are added', function () {
      it('should have 3 session', function () {
        theSessionList.addRide('1st', 75, 10)
        theSessionList.addRide('2nd', 65, 2)
        theSessionList.addRide('3rd', 55, 1)
        expect(theSessionList.allUserData.length).toBe(3)
      })
    })
  })

  // FEATURE 6. Save all parts to LocalStorage
  describe('save', function () {
    it('should save an session(title) in localStorage when it has a single item', function () {
      localStorage.clear()
      theSessionList = new SessionList()
      theSessionList.addRide('a new session', 0, 0)
      theSessionList.save()
      var itemJSON = localStorage.getItem(CYCLING_LS)
      expect(itemJSON).toBeTruthy()
    })

    it('should have the correct JSON for the correct session in localStorage', function () {
      localStorage.clear()
      theSessionList = new SessionList()
      theSessionList.addRide('a new Session', 55, 10)
      theSessionList.save()
      var itemJSON = localStorage.getItem(CYCLING_LS)
      expect(itemJSON).toBe('[{"title":"a new Session","weight":55,"distance":10,"id":1,"stTime":0,"endTime":0,"timerStart":null,"min":null,"sec":null,"milisec":null,"timerStopped":false}]')
    })
  })

  // FEATURE 7. Load all parts from LocalStorage
  describe('load', function () {
    it('should load an session from localStorage when it has a single session', function () {
      // save something
      localStorage.clear()
      theSessionList = new SessionList()
      theSessionList.addRide('a new session', 0, 0)
      theSessionList.save()
      // the start the model again
      theSessionList = new SessionList()
      // and load
      theSessionList.load()
      var itemJSON = localStorage.getItem(CYCLING_LS)
      expect(itemJSON).toBeTruthy()
    })

    it('should have the correct JSON for the loaded item', function () {
      // save something
      localStorage.clear()
      theSessionList = new SessionList()
      theSessionList.addRide('a new Session', 55, 10)
      theSessionList.save()
      // the start the model again
      theSessionList = new SessionList()
      // and load
      theSessionList.load()
      var itemJSON = localStorage.getItem(CYCLING_LS)
      expect(itemJSON).toBe('[{"title":"a new Session","weight":55,"distance":10,"id":1,"stTime":0,"endTime":0,"timerStart":null,"min":null,"sec":null,"milisec":null,"timerStopped":false}]')
    })
  })

  // FEATURE 3. Sort parts
  describe('sorting title', function () {
    it('should put session into alphabetic title order', function () {
      var theSessionList = new SessionList()
      theSessionList.addRide('c')
      theSessionList.addRide('a')
      theSessionList.addRide('b')
      theSessionList.sortSession()
      const actualOrderedSessionTitles = getSession(theSessionList.allUserData)
      const expectedSortedSessionTitles = ['a', 'b', 'c']
      expect(expectedSortedSessionTitles).toEqual(actualOrderedSessionTitles)
    })
  })

  // FEATURE 4. Filter parts
  describe('filtering Sessions', function () {
    var theSessionList = new SessionList()
    theSessionList.addRide('a')
    theSessionList.addRide('b')
    theSessionList.addRide('c')
    theSessionList.allUserData[1].timerStopped = true           //been stopped

    it('should be able to return only active/remaining time lap', function () {
      const expectedActiveCount = 2
      const expectedActiveLapTitles = ['a', 'c']
      const actualActiveList = theSessionList.getActiveLap()
      const actualActiveCount = actualActiveList.length
      const actualActiveLapTitles = getSession(actualActiveList)
      expect(actualActiveCount).toBe(expectedActiveCount)
      expect(actualActiveLapTitles).toEqual(expectedActiveLapTitles)
    })

    it('should be able to return only stopped timer', function () {
      const expectedStoppedCount = 1
      const expectedStoppedTaskTitles = ['b']
      const actualStoppedList = theSessionList.getFinishedTimer()
      const actualStoppedCount = actualStoppedList.length
      const actualStoppedTaskTitles = getSession(actualStoppedList)
      expect(actualStoppedCount).toBe(expectedStoppedCount)
      expect(actualStoppedTaskTitles).toEqual(expectedStoppedTaskTitles)
    })

    it('should correctly calculate the number of remaining Sessions', function () {
      const expectedRemainingCount = 2
      const actualRemainingCount = theSessionList.remaining()
      expect(actualRemainingCount).toBe(expectedRemainingCount)
    })
  })

  // FEATURE 5. Delete a selected part
  describe('deleting a Session', function () {
    var theSessionList = new SessionList()
    theSessionList.addRide('a')
    theSessionList.addRide('b')
    theSessionList.addRide('c')
    theSessionList.removeSession('b')
    it('should remove that Session', function () {
      const expectedSessionTitles = ['a', 'c']
      const actualSessionTitles = getSession(theSessionList.allUserData)
      expect(actualSessionTitles).toEqual(expectedSessionTitles)
    })

    it('should reduce the Session count', function () {
      const expectedRemainingCount = 2
      const actualRemainingCount = theSessionList.allUserData.length
      expect(actualRemainingCount).toBe(expectedRemainingCount)
    })
  })

  
  // FEATURE 8. Update/edit a part
  describe('editing a Session', function () {
    var theSessionList = new SessionList()
    theSessionList.addRide('a')
    theSessionList.addRide('b')
    theSessionList.addRide('c')
    theSessionList.startEditing(theSessionList.allUserData[1])
    theSessionList.allUserData[1].title = 'bb'
    theSessionList.doneEditing(theSessionList.allUserData[1])
    it('should change the title of that Session', function () {
      expect(theSessionList.allUserData[1].title).toBe('bb')
    })
  })

  // FEATURE 9. Discard /revert edits to a part
  describe('discarding edits to a Session', function () {
    it('should not change the title of that Session', function () {
      var theSessionList = new SessionList()
      theSessionList.addRide('a')
      theSessionList.addRide('b')
      theSessionList.addRide('c')
      theSessionList.startEditing(theSessionList.allUserData[1])
      theSessionList.allUserData[1].title = 'bb'
      theSessionList.cancelEditing(theSessionList.allUserData[1])
      expect(theSessionList.allUserData[1].title).toBe('b')
    })
  })

  // FEATURE 10. Validate inputs
  describe('validating inputs to a Session', function () {
    it('should not allow empty titles', function () {
      var theSessionList = new SessionList()
      theSessionList.addRide('a')
      theSessionList.addRide('')
      theSessionList.addRide('  ')
      theSessionList.addRide('b')
      const expectedSessionTitles = ['a', 'b']
      const actualSessionTitles = getSession(theSessionList.allUserData)
      expect(actualSessionTitles).toEqual(expectedSessionTitles)
    })
  })

  // FEATURE 11. A calculation within a part
  describe('a calories calculation within a part', function () {
    var theSessionList = new SessionList()
    theSessionList.addRide('a', 55, 1.5)
    theSessionList.allUserData[0].timerStopped = true  
    theSessionList.allUserData[0].min = 10
    theSessionList.allUserData[0].sec = 25
    it('should do the calories calculation correctly', function () {
      const expectedSessionCalories = 80
      const actualSessionCalories = theSessionList.getCalories('a')
      expect(expectedSessionCalories).toEqual(actualSessionCalories)
    })

    it('should do the speed calculation correctly', function () {
      const expectedSessionSpeed = 8
      const actualSessionSpeed = theSessionList.getSpeed('a')
      expect(expectedSessionSpeed).toEqual(actualSessionSpeed)
    })
  })


  // FEATURE 12. A calculation across many parts
  describe('working out if all Sessions are done', function () {
    it('should return true for an empty list', function () {
      var theSessionList = new SessionList()
      expect(theSessionList.getAllStopTimer()).toBeTrue()
    })

    it('should return false for a list with active Sessions in it', function () {
      var theSessionList = new SessionList()
      theSessionList.addRide('a')
      theSessionList.addRide('b')
      expect(theSessionList.getAllStopTimer()).toBeFalse()
    })

    it('should return true for a list with only Stopped Sessions in it', function () {
      var theSessionList = new SessionList()
      theSessionList.addRide('a')
      theSessionList.addRide('b')
      theSessionList.allUserData[0].timerStopped = true
      theSessionList.allUserData[1].timerStopped = true
      expect(theSessionList.getAllStopTimer()).toBeTrue()
    })
  })

  describe('counting active Sessions', function () {
    it('should return the correct number of remaining Sessions as Sessions are added or Stopped', function () {
      var theSessionList = new SessionList()
      expect(theSessionList.remaining()).toBe(0)
      theSessionList.addRide('a')
      expect(theSessionList.remaining()).toBe(1)
      theSessionList.addRide('b')
      expect(theSessionList.remaining()).toBe(2)
      theSessionList.addRide('c')
      expect(theSessionList.remaining()).toBe(3)
      theSessionList.allUserData[1].timerStopped = true
      expect(theSessionList.remaining()).toBe(2)
    })
  })

  // FEATURE 13. Provide default values
  describe('the default value for new Sessions', function () {
    it('should allocate a sequentially incrementing id to all new Sessions', function () {
      var theSessionList = new SessionList()
      for (let expectedId = 1; expectedId < 5; expectedId += 1) {
        theSessionList.addRide('another Session')
        var actualId = theSessionList.allUserData[theSessionList.allUserData.length - 1].id
        expect(actualId).toBe(expectedId)
      }
    })

    it('should make all new Sessions not Stopped', function () {
      var theSessionList = new SessionList()
      theSessionList.addRide('a')
      const actualStopped = theSessionList.allUserData[0].timerStopped
      expect(actualStopped).toBeFalse()
    })
  })

  // FEATURE 14. Find a part given a search criterion
  describe('finding a Session', function () {
    it('should find nothing with an empty Session list', function () {
      var theSessionList = new SessionList()
      const actualFoundSession = theSessionList.findSession('a')
      expect(actualFoundSession).toBeUndefined()
    })

    it('should find the only Session with a title when that title is unique', function () {
      var theSessionList = new SessionList()
      theSessionList.addRide('a')
      theSessionList.addRide('b')
      theSessionList.addRide('c')
      const actualFoundSession = theSessionList.findSession('b')
      expect(actualFoundSession).toBeDefined()
      const expectedFoundTitle = 'b'
      const actualFoundTitle = actualFoundSession.title
      expect(actualFoundTitle).toBe(expectedFoundTitle)
    })

    it('should find the first Session with that title when there is more than one Session with the same title', function () {
      var theSessionList = new SessionList()
      theSessionList.addRide('a')
      theSessionList.addRide('b')
      theSessionList.addRide('b')
      theSessionList.addRide('c')
      const actualFoundSession = theSessionList.findSession('b')
      expect(actualFoundSession).toBeDefined()
      const expectedFoundTitle = 'b'
      const actualFoundTitle = actualFoundSession.title
      expect(actualFoundTitle).toBe(expectedFoundTitle)
      const expectedFoundId = 2
      const actualFoundId = actualFoundSession.id
      expect(actualFoundId).toBe(expectedFoundId)
    })
  })
})
