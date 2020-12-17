import React, {Component} from 'react';

class DisplayComp extends Component {

  render() {
    return(
        <div className="App">
          <div className="stopwatch">
            <span>{(this.props.time.h >= 10)? this.props.time.h : "0" + this.props.time.h}</span>&nbsp;:&nbsp;
            <span>{(this.props.time.m >= 10)? this.props.time.m : "0" + this.props.time.m}</span>&nbsp;:&nbsp;
            <span>{(this.props.time.s >= 10)? this.props.time.s : "0" + this.props.time.s}</span>&nbsp;:&nbsp;
            <span>{(this.props.time.ms >= 10)? this.props.time.ms : "0" + this.props.time.ms}</span>&nbsp;
          </div>
        </div>
      )
    }
  }
  export default DisplayComp;