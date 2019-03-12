import React from 'react';
import jwtDecode from 'jwt-decode';
import ApiService from '../../api-service';
import LoginForm from '../LoginForm/LoginForm';
import LogoutForm from '../LogoutForm/LogoutForm';

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

    this.maintainAuthTimeout = null;

    this.maintainAuth  = this.maintainAuth.bind(this);
    this.destroyAuth   = this.destroyAuth.bind(this);
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

        { !this.state.loggedIn && <LoginForm onLogin={this.maintainAuth} />    }

        { this.state.loggedIn  && <LogoutForm onLogout={this.destroyAuth} /> }

      </div>
    );
  }
}

export default App;
