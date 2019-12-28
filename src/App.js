import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'
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
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/failedlogin" component={FailedLogin} />
        <Route exact path="/listdisplay" component={ListDisplay}/>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/createlist" component={CreateList} />
        <PrivateRoute exact path="/addentry" component={AddEntry} />
        {/* <PrivateRoute exact path="/editentry" component={EditEntry} /> */}
      </div>
    )
  }
}

export default App;
