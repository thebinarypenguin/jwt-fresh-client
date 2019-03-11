import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import LogoutForm from '../LogoutForm/LogoutForm';
import refresher from '../../refresher';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };

    this.handleLogin  = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.refresher = refresher.createRefresher(window.localStorage, 'token');
  }

  handleLogin(token) {
    this.setState({ loggedIn: true });
    window.localStorage.setItem('token', token);
    this.refresher.start();
  }

  handleLogout() {
    this.setState({ loggedIn: false });
    window.localStorage.removeItem('token');
    this.refresher.stop();
  }

  render() {

    return (
      <div id="app" className="container-fluid">
        <h1>JWT Fresh</h1>

        { !this.state.loggedIn && <LoginForm onLogin={this.handleLogin} />    }

        { this.state.loggedIn  && <LogoutForm onLogout={this.handleLogout} /> }

      </div>
    );
  }
}

export default App;
