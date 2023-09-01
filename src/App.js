import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/" component={Home} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    )
  }
}

export default App
