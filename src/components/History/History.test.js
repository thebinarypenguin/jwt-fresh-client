import React from 'react';
import ReactDOM from 'react-dom';
import History from './History';

it('renders without crashing', () => {

  const data = [
    { type: 'login', data: 'foobar', time: new Date(Date.now()) },
    { type: 'logout', data: null, time: new Date(Date.now()) },
  ];

  const div = document.createElement('div');

  ReactDOM.render(<History data={data}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
