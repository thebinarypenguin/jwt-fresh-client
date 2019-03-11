import React from 'react';

import './History.css';

class History extends React.Component {

  generateItems() {

    const items = this.props.data.map((d, i) => {

      return (
        <tr key={i}>
          <td>{d.type}</td>
          <td>{d.data}</td>
          <td>{d.time.toLocaleTimeString()}</td>
        </tr>
      );
    });

    return items;
  }

  render() {

    return (
      <table id="history"className="table table-bordered">
        <tbody>
          { this.generateItems(this.props) }
        </tbody>
      </table>
    );
  }
}

export default History;
