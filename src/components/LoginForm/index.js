import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitError: false,
  }

  onChangeId = event => {
    this.setState({username: event.target.value})
  }

  onChangePIN = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expire: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    console.log(response)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderInputContainer = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="idLabel" className="label">
          User ID
        </label>
        <input
          id="idLabel"
          type="text"
          placeholder="Enter User Id"
          className="userInput"
          value={username}
          onChange={this.onChangeId}
        />
      </>
    )
  }

  renderPasswordContainer = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="passwordLabel" className="label">
          PIN
        </label>
        <input
          id="passwordLabel"
          type="password"
          placeholder="Enter Pin"
          className="userInput"
          value={password}
          onChange={this.onChangePIN}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="login-container">
          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              className="login-img"
              alt="website login"
            />
          </div>
          <form className="form-element" onSubmit={this.onSubmitForm}>
            <h1 className="heading">Welcome Back!</h1>
            <div className="input">{this.renderInputContainer()}</div>
            <div className="input">{this.renderPasswordContainer()}</div>

            <button type="submit" className="button">
              Login
            </button>
            {showSubmitError && <p>*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
