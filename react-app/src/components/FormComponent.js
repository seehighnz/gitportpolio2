import React, {Component} from 'react';

class FormComponent extends Component {
    render() {
      return(
        <div className="inputData">
          <form action="/start-process" method="post" onSubmit={function(e){
              e.preventDefault()
              this.props.onSubmit(
                e.currentTarget[0].valueAsNumber,
                e.currentTarget[1].valueAsNumber
              ) 
            }.bind(this)}>
            <div className = "container">
              <input type="number" id="weight" placeholder="Weight(Kg)" /><br /><br />
              <input type="number" id="Distance" placeholder="Distance(Km)"/>
            </div>
            <input className= "InputBtn" type="submit"></input> 
          </form>
        </div>
      )
    }
  }


export default FormComponent
