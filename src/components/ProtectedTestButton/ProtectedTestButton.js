import React from 'react';
import ApiService from '../../api-service';

import './ProtectedTestButton.css';

class ProtectedTestButton extends React.Component {

  state = {
    loading: false,
  }

  action = () => {

    this.setState({ loading: true });

    const token = window.localStorage.getItem('token');

    ApiService
      .testProtected(token)
      .then((body) => {
        this.setState({ loading: false });
        console.log('Protected Test: ', body);
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log('Protected Test: ', err);
      });
  }

  render() {

    if (this.state.loading) {
      return (
        <button id="ProtectedTestButton" type="button" className="btn btn-primary" disabled>
          Loading...
        </button>
      );
    } else {
      return (
        <button  id="ProtectedTestButton" type="button" className="btn btn-primary" onClick={this.action}>
          Test Protected Endpoint
        </button>
      );
    }



  }
}

export default ProtectedTestButton;
