import React from 'react';
import jwtDecode from 'jwt-decode';
import ApiService from '../../api-service';
import CountdownService from '../../countdown-service';
import LoginForm from '../LoginForm/LoginForm';
import LogoutForm from '../LogoutForm/LogoutForm';
import PublicTestButton from '../PublicTestButton/PublicTestButton';
import ProtectedTestButton from '../ProtectedTestButton/ProtectedTestButton';


import './App.css';

const safeJwtDecode = function (jwt) {

  try {
    return jwtDecode(jwt);
  } catch (err) {
    return undefined;
  }
};

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };

    this.killer = null;
    this.maintainAuthTimeout = null;

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.maintainAuth  = this.maintainAuth.bind(this);
    this.destroyAuth   = this.destroyAuth.bind(this);
  }

  componentDidMount() {

    this.killer = CountdownService.createCountdown(this.destroyAuth, 10 * 1000);

    document.addEventListener('mousemove', this.killer.reset);
  }

  componentWillUnmount() {

    document.removeEventListener('mousemove', this.killer.reset);
  }

  handleLogin(token) {
    this.killer.start();
    this.maintainAuth(token);
  }

  handleLogout() {
    this.killer.stop()
    this.destroyAuth();
  }

  maintainAuth(token) {

    console.log(`Got Token: ${token}`);

    this.setState({ loggedIn: true });

    // Persist token
    window.localStorage.setItem('token', token);

    const payload = safeJwtDecode(token);

    if (payload.exp) {

      const expirationTime = (payload.exp * 1000) - Date.now();
      const refreshTime    = expirationTime - (10 * 1000);

      // Schedule a refresh request
      this.maintainAuthTimeout = setTimeout(() => {

        ApiService
          .refresh(token)
          .then((body) => {
            this.maintainAuth(body.token);
          })
          .catch((err) => {
           this.destroyAuth();
          });

      }, refreshTime);
    }
  }

  destroyAuth() {

    // Stop all further refreshes
    clearTimeout(this.maintainAuthTimeout);

    window.localStorage.removeItem('token');

    this.setState({ loggedIn: false });

    console.log('Destroy Token');
  }

  render() {

    return (
      <div id="app" className="container-fluid">
        <h1>JWT Fresh</h1>

        <ol id="instructions">
          <li>Open Developer Tools</li>
          <li>Enter the same string in both username and password to login.</li>
        </ol>

        { !this.state.loggedIn && <LoginForm onLogin={this.handleLogin} />    }

        { this.state.loggedIn  && <LogoutForm onLogout={this.handleLogout} /> }

        <PublicTestButton />
        <ProtectedTestButton />

      </div>
    );
  }
}

export default App;
