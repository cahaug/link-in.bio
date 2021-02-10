import React, { lazy, Suspense } from 'react';
// import './App.css';
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import LandingPage from './components/LandingPage'
// import Register from './components/Register'
import Login from './components/Login'
import FailedLogin from './components/FailedLogin'
// import Dashboard from './components/Dashboard'
// import CreateList from './components/CreateList'
import AddEntry from './components/AddEntry'
import EntryEditor from './components/EntryEditor'
// import ListDisplay from './components/ListDisplay'
// import RegisterHooks from './components/RegisterHooks'
import ResetPassword from './components/ResetPassword'
import ResetPWCode from './components/ResetPWCode'
// import InstagramPicker from './components/InstagramPicker'
import Dashboard2 from './components/Dashboard2'
import SettingsPanel from './components/SettingsPanel';
// import ExperimentalListDisplay from './components/ExperimentalListDisplay';
import Maksaa from './components/Maksaa'
import { Toaster } from 'react-hot-toast';
import FinishRegistration from './components/FinishRegistration';

// import ListDisplayHooks from './components/ListDisplayHooks'
//code split listdiplayhooks into own chunk
const ListDisplayHooks = lazy(() => import('./components/ListDisplayHooks'))

const renderLoader = () => <p>Loading...</p>

// import PaymentSuccess from './components/PaymentSuccess'
// import PaymentPage from './components/PaymentPage'


class App extends React.Component {

  // logout = (evt) => {
  //   evt.preventDefault()
  //   localStorage.removeItem('token')
  //   this.props.history.push('/login')
  // }

  render(){
    return (
      <div className="App">
        <Toaster position="top-center" />
        <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/robots.txt" onEnter={() =>{window.location.reload()}} />
        {/* <Route exact path="/register" render={props => <Register {...props} history={this.props.history}/>} /> */}
        {/* <Route exact path="/registerHooks" component={RegisterHooks} /> */}
        <Route exact path='/maksaa' component={Maksaa} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/failedlogin" component={FailedLogin} />
        <Route exact path="/resetPassword" component={ResetPassword} />
        <Route exact path="/resetPWCode" component={ResetPWCode} />
        {/* <Route exact path="/experimentalSh1t" component={ExperimentalListDisplay} /> */}
        <Route exact path="/finishMyRegistration" component={FinishRegistration} />
        {/* <Route exact path="/instaPicker" component={InstagramPicker} /> */}
        {/* <Route exact path="/paymentPage" component={PaymentPage} /> */}
        {/* <Route exact path="/listdisplay" component={ListDisplay}/> */}
        {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
        <PrivateRoute exact path="/dashboard2" component={Dashboard2} />
        <PrivateRoute exact path="/settingsPanel" component={SettingsPanel} />
        {/* <PrivateRoute exact path="/createlist" component={CreateList} /> */}
        {/* <Route path={`/success`} render={props => <PaymentSuccess {...props} />} /> */}
        <PrivateRoute exact path='/addEntry' component={AddEntry} />
        <PrivateRoute path={`/editEntry/:entryId`} component={props => <EntryEditor {...props} />} />
        {/* <PrivateRoute path={`/editEntry/:entryId`} render={({match}) => <EntryEditor match={match} />} /> */}
        {/* <Route path="/:id" render={props => <ListDisplay {...props}/>} /> */}
        <Suspense fallback={renderLoader()}><Route path="/:id" render={({match}) => <ListDisplayHooks match={match}/>} /></Suspense>
        {/* <PrivateRoute exact path="/editentry" component={EditEntry} /> */}
        </Switch>
      </div>
    )
  }
}

export default App;
