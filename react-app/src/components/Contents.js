import React, {Component} from 'react';

class Contents extends Component {

  render() {
    let sessionLists = [];
    let sessionResultBtn = this.props.sessionResult
    let i = 0
    while (i < sessionResultBtn.length) {
      sessionLists.push(
        <article key={sessionResultBtn[i]} id={sessionResultBtn[i]} className="sessionDetails">
          <div className="details-block1">
            <h3>Avg Speed:{sessionResultBtn[i].avgSpeed}</h3>
            <h3>Distance:{sessionResultBtn[i].distance}</h3>
          </div>

          <div className="details-block2">
            <h3>Calories:{sessionResultBtn[i].calories}</h3>
            <h3>Total Workout Time:00:0{sessionResultBtn[i].min}:0{sessionResultBtn[i].sec}</h3>
          </div>
        </article>
      )
      i = i + 1
    } 
  return(
    <div className="App">
      {sessionLists}
    </div>
  )
}
}
  export default Contents;