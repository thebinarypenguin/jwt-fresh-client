import React from 'react';
import ReactDOM from 'react-dom';
import LogoutForm from './LogoutForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LogoutForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
