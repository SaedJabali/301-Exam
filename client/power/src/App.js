import React, { Component } from 'react'
import Main from './Components/Main'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Favorite from './Components/Favorite';

export class App extends Component {
  render() {
    return (
      <Router>
        <nav href='/'>
          <a href='/'>Home</a>
          <br/>
          <a href='/favorite'>Favorite</a>
        </nav>
        <nav href='/favorite'>
        </nav>
        <Switch>
          <div>
            <Route exact path='/'>
              <p>
                <Main />
              </p>
            </Route>
            <Route exact path='/favorite'>
              <Favorite />
            </Route>
          </div>
        </Switch>

      </Router>
    )
  }
}

export default App
