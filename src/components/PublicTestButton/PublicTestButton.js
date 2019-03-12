import React from 'react';
import ApiService from '../../api-service';

import './PublicTestButton.css';

class PublicTestButton extends React.Component {

  state = {
    loading: false,
  }

  action = () => {

    this.setState({ loading: true });

    ApiService
      .testPublic()
      .then((body) => {
        this.setState({ loading: false });
        console.log('Public Test: ', body);
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log('Public Test: ', err);
      });
  }

  render() {

    if (this.state.loading) {
      return (
        <button  id="PublicTestButton" type="button" className="btn btn-primary" disabled>
          Loading...
        </button>
      );
    } else {
      return (
        <button  id="PublicTestButton" type="button" className="btn btn-primary" onClick={this.action}>
          Test Public Endpoint
        </button>
      );
    }



  }
}

export default PublicTestButton;
