import React, {Component} from 'react';
import {Router, Route, browserHistory, Redirect} from "react-router";
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Registration';
import forgotpassword from './components/forgotpassword';


class App extends Component{
  render(){
    return(
      <Router history={browserHistory}>   
            <Redirect from="/" to="/Login" />
            <Route> 
        <Route exact path="/" component={Login}/>
        <Route exact path="/Login" component={Login} />
        <Route exact path={"/Home/:id/:name"} component={Home} />
        <Route exact path="/Register" component={Register}/>
        <Route exact path="/forgotpassword" component={forgotpassword}/>
        </Route>
      </Router>
    );
  }
}

export default App;

