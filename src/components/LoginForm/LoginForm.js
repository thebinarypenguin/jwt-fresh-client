import React from 'react';
import config from '../../config';

import './LoginForm.css';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {

    ev.preventDefault();

    const { username, password } = ev.target;

    fetch(`${config.API_ROOT}/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })
    .then((res) => {

      if (!res.ok) {
        return Promise.reject(res);
      }

      return res.json();
    })
    .then((json) => {

      username.value = '';
      password.value = '';

      this.setState({ error: false });

      this.props.onLogin(json.token);
    })
    .catch((err) => {

      username.value = '';
      password.value = '';

      this.setState({ error: true });
    });
  }

  render() {

    let error;

    if (this.state.error) {
      error = <div className="alert alert-danger">An error occurred</div>
    }

    return (
      <form id="login-form" autoComplete="off" onSubmit={this.handleSubmit}>

        {error}

        <div className="form-group">
          <input id="username" type="text" className="form-control" placeholder="username" />
        </div>

        <div className="form-group">
          <input id="password" type="password" className="form-control" placeholder="password" />
        </div>

        <div className="form-group">
          <button id="login" type="submit" className="btn btn-primary">Log In</button>
        </div>

      </form>
    );
  }
}

export default LoginForm;
