import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import LandingPage from './components/LandingPage'
import Register from './components/Register'
import Login from './components/Login'
import FailedLogin from './components/FailedLogin'
import Dashboard from './components/Dashboard'
import CreateList from './components/CreateList'
import AddEntry from './components/AddEntry'
// import EditEntry from './components/EditEntry'
import ListDisplay from './components/ListDisplay'



class App extends React.Component {

  // logout = (evt) => {
  //   evt.preventDefault()
  //   localStorage.removeItem('token')
  //   this.props.history.push('/login')
  // }

  render(){
    return (
      <div className="App">
        <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/failedlogin" component={FailedLogin} />
        <Route exact path="/listdisplay" component={ListDisplay}/>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/createlist" component={CreateList} />
        <PrivateRoute exact path="/addentry" component={AddEntry} />
        <Route path="/:id" render={props => <ListDisplay {...props}/>} />
        {/* <PrivateRoute exact path="/editentry" component={EditEntry} /> */}
        </Switch>
      </div>
    )
  }
}

export default App;
