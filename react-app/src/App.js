import React, {Component} from 'react';
import FormComponent from './components/FormComponent';
import DisplayComp from './components/DisplayComp';
import BtnStopwatch from './components/BtnStopwatch';
import TOC from './components/TOC';
import Contents from './components/Contents';
import './App.css';

const CYCLING_LS = 'Rider'

class App extends Component {
  constructor(props) {
    super(props)
    this.ids = 0
    this.result = null
    this.state = {
      time:{ms:0, s:0, m:0, h:0},
      interval: undefined,
      status:0,  //pause 2, start 1, not started=0
      rider:[],
      inputData:{weight:0, distance:0},
      mode: 'off',
    }
    this.loadRider = this.loadRider.bind(this)
    this.calculateRider = this.calculateRider.bind(this)
    this.riderData = this.riderData.bind(this)
    this.start = this.start.bind(this)
    this.run = this.run.bind(this)
    this.pause = this.pause.bind(this)
    this.reset = this.reset.bind(this)
    this.resume = this.resume.bind(this)
    this.save = this.save.bind(this)
    this.saveRiders = this.saveRiders.bind(this)
    this.onSession = this.onSession.bind(this)
    this.showResult = this.showResult.bind(this)
    this.deleteSession = this.deleteSession.bind(this)
    this.loadRider()
  }

  
  loadRider() {
    const loadRider = JSON.parse(localStorage.getItem(CYCLING_LS) || '[]')
    if(loadRider !== null) {
       for(let rider of loadRider) {
         const riderResultObj = {
            id:rider.id,
            avgSpeed:rider.avgSpeed,
            calories:rider.calories,
            min:rider.min,
            sec:rider.sec,
            distance:rider.distance,
            name:rider.name
          }
          this.state.rider.push(riderResultObj)
      }
    }
  }
  riderData(weight_, distance_){    // clicked input submit 
      this.setState({inputData:{weight:weight_, distance:distance_}})
      alert(`your weight is ${weight_}, and target distance for today is ${distance_}`)
  }

  start(){
    this.run()
    this.setState({status:1})
    this.setState({interval:setInterval(this.run, 10)})
  }

  run() {
    this.updatedMs = this.state.time.ms
    this.updatedS = this.state.time.s
    this.updatedM = this.state.time.m
    this.updatedH = this.state.time.h
    if (this.updatedM === 60) {
      this.updatedH++
      this.updatedM = 0
    }
    if (this.updatedS === 60) {
      this.updatedM++
      this.updatedS = 0
    }
    if (this.updatedMs === 100) {
      this.updatedS++
      this.updatedMs = 0
    }
    this.updatedMs++
    this.setState({time:{ms:this.updatedMs, s:this.updatedS, m:this.updatedM, h:this.updatedH}})
  }

  pause(){
    clearInterval(this.state.interval)
    this.setState({status:2})
  }

  reset(){
    clearInterval(this.state.interval)
    this.setState({status:0})
    return this.setState({time:{ms:0, s:0, m:0, h:0}})
  }

  resume(){
    this.start()
  }

  save(){                                   //when save clicked
    const _min = this.state.time.m
    const _sec = this.state.time.s
    this.calculateRider(_min, _sec )
  }

  calculateRider(_min, _sec){               //when save clicked
    let riders = this.state.rider
    const kg = this.state.inputData.weight
    const distance = this.state.inputData.distance
    const _calories = Math.floor(((_min + (_sec / 60)) * 8 * 3.5 * kg) / 200)
    const _avgSpeed = Math.floor(distance / ((_min + (_sec / 60)) / 60))
    const newId = riders.length + 1
    const riderObj = {
      id:newId,
      avgSpeed:_avgSpeed,
      calories:_calories,
      min:_min,
      sec:_sec,
      distance:distance,
      name:null
    }
    riders.push(riderObj)
  }

  onSession(){
    let riders = this.state.rider
    this.ids = this.ids + 1
    let sessionName = 'SESSION' + this.ids
    let newRiders = riders.filter(rider => (rider.name === null) ? rider.name = sessionName : rider)
    this.setState({rider:newRiders})
    this.saveRiders()
  }

  saveRiders(){
    localStorage.setItem(CYCLING_LS, JSON.stringify(this.state.rider))
  }

  showResult(event){
    let btn = event.target
    let li = btn.parentNode
    let riders = this.state.rider
    let _result = riders.filter(rider => rider.id === Number(li.id))
    this.result = _result
  }

  deleteSession(event){
    let indexBtn = event.target.attributes.length
    let riders = this.state.rider
    riders.splice(indexBtn, 1)
    this.setState({rider:riders})
    this.saveRiders()
  }

  render() {
    let _content = null
    if(this.state.mode === 'on'){
      _content = <Contents sessionResult = {this.result} />
    }

  return(
    <div className="App">
      <header>
        <h1>Cycling</h1>
        <h2>Start Tracking Ride</h2>
      </header>

      <FormComponent loadRider = {this.loadRider} onSubmit = {this.riderData} />

      <DisplayComp time = {this.state.time} />

      <BtnStopwatch status = {this.state.status} start = {this.start} resume = {this.resume} pause = {this.pause} reset = {this.reset} save = {this.save}
      onSession ={this.onSession}
      />

      <TOC sessionBtn = {this.state.rider} showResult={this.showResult} deleteSession={this.deleteSession} onChangeMode = {function(_mode){
        this.setState({mode:_mode})
        }.bind(this)} />

      {_content}
    </div>
    );
  }
}



export default App;