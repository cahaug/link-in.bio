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
import EntryEditor from './components/EntryEditor'
import ListDisplay from './components/ListDisplay'
import ListDisplayHooks from './components/ListDisplayHooks'



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
        <Route exact path="/register" render={props => <Register {...props} history={this.props.history}/>} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/failedlogin" component={FailedLogin} />
        {/* <Route exact path="/listdisplay" component={ListDisplay}/> */}
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/createlist" component={CreateList} />
        <Route path={`/addEntry/:listId`} render={props => <AddEntry {...props}/>} />
        <Route path={`/editEntry/:entryId`} render={props => <EntryEditor {...props} />} />
        <Route path="/:id" render={props => <ListDisplay {...props}/>} />
        {/* <Route path="/:id" render={({match}) => <ListDisplayHooks match={match}/>} /> */}
        {/* <PrivateRoute exact path="/editentry" component={EditEntry} /> */}
        </Switch>
      </div>
    )
  }
}

export default App;
