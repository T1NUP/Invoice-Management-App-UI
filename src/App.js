import React, { Component } from 'react';
import abc from './Assets/abc.svg';
import hrc from './Assets/logo.svg';
import './App.css';
import InnerCompoment from './Components/InnerComponent.js'

class App extends Component {

<<<<<<< HEAD
  //This is the static part of the website
  
=======
>>>>>>> 3b8ae91a9eb9b70badcdddc3ca45e7ae08e26776
  state = { 
    id: 1,
    name: "punit"
   }
  
   
  
  render() { 
    return (
      <div className="main">
        <div className="header">
          <img src={abc}/>
          <img className="hrclogo" src={hrc}/>
          <div ></div>
        </div>
        <div className="text-invoice">
          Invoice List
        </div>
        <InnerCompoment />
      </div>
      );
  }
}
 

export default App;
