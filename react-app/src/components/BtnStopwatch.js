import React, {Component} from 'react';

class BtnStopwatch extends Component {

  render() {
    return(
        <div className="App">
          <div>
            {(this.props.status ===0)?
            <button className="stopwatch-btn"
            onClick={this.props.start}>START</button> : ""
            }
            
            {(this.props.status ===1)?
              <div>
                <button className="stopwatch-btn"
                onClick={this.props.pause}>PAUSE</button>
                <button className="stopwatch-btn" onClick={function(e) {
                  e.preventDefault()
                  this.props.save()
                  this.props.onSession()
                 }.bind(this)}>SAVE</button>
                <button className="stopwatch-btn" onClick={this.props.reset}>RESET</button>
              </div>: ""
            }

            {(this.props.status ===2)?
              <div>
                <button className="stopwatch-btn"
                onClick={this.props.resume}>RESUME</button>
                <button className="stopwatch-btn" onClick={function() {
                  this.props.save()
                  this.props.onSession()
                 }.bind(this)}>SAVE</button>  
                <button className="stopwatch-btn" onClick={this.props.reset}>RESET</button>
              </div>: ""
            }
           </div>
        </div>

      )
    }
  }

  export default BtnStopwatch;