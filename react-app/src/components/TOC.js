import React, {Component} from 'react';

class TOC extends Component {

  render() {
    let lists = [];
    let sessionBtn = this.props.sessionBtn
    for(let session of sessionBtn) {
        lists.push(
        <li key={session.id} id = {session.id}>
          <button className="button2" onClick={function(event) {
            this.props.deleteSession(event)
          }.bind(this)}>❌</button>
          <button className="button1"
            onClick={function(event){
              event.preventDefault()
              this.props.onChangeMode('on')
              this.props.showResult(event)
            }.bind(this)}>{session.name}</button>
        </li>)
      } 
   return(
    <div className="App">
        <nav className="sessionList">
            <ul className="sessionBtns">
              {lists}                
            </ul>
        </nav>
    </div>
    )
  }
}
  export default TOC;

  