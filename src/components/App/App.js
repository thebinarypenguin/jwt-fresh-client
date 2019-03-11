import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import LogoutForm from '../LogoutForm/LogoutForm';
import History from '../History/History';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      token    : null,
      history : [],
    };

    this.handleLogin  = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(token) {

    const action = {
      type: 'login',
      data: token,
      time: new Date(Date.now()),
    };

    this.setState({
      token: token,
      history: [...this.state.history, action],
    });
  }

  handleLogout() {

    const action = {
      type: 'logout',
      data: null,
      time: new Date(Date.now()),
    };

    this.setState({
      token: null,
      history: [...this.state.history, action],
    });
  }

  render() {

    let form;

    if (this.state.token) {
      form = <LogoutForm onLogout={this.handleLogout} />;
    } else {
      form = <LoginForm onLogin={this.handleLogin} />;
    }

    return (
      <div id="app" className="container-fluid">
        <h1>JWT Fresh</h1>

        {form}

        <History data={this.state.history} />
      </div>
    );
  }
}

export default App;
