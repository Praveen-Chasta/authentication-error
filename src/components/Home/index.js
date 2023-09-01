import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <div className="b-container">
        <div className="container">
          <Link to="/login">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
              className="logo"
              alt="website logo"
            />
          </Link>
          <Link to="/login">
            <button type="button" className="btn" onClick={onClickLogout}>
              Logout
            </button>
          </Link>
        </div>
        <div className="bottom-container">
          <h1 className="head">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            className="img"
            alt="digital card"
          />
        </div>
      </div>
    </>
  )
}
export default Home
