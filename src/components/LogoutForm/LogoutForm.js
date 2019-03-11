import React from 'react';

import './LogoutForm.css';

class LogoutForm extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.onLogout();
  }

  render() {

    return (
      <form id="logout-form" onSubmit={this.handleSubmit}>

        <div className="form-group">
          <button id="logout" type="submit" className="btn btn-primary">Log Out</button>
        </div>

      </form>
    );
  }
}

export default LogoutForm;
