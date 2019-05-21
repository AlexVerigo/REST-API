import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as tableActions from '../../redux/actions/tableActions';

import styles from './style.scss';

class HomePage extends React.Component {
  componentDidMount() {
    if (!this.props.loginData.isLoggedIn) {
      return this.props.history.push('/login');
    }
  }

  renderRows = () => {
    return this.props.tableData.rows.map(row => {
      return (
        <tr key={row.id}>
          <td>
            <div>{row.id}</div>
          </td>
          <td>
            <input
              disabled={row.isDisabled}
              value={row.name}
              onChange={e => this.props.onChangeRowInReducer(e, row.id, 'name')}
            />
          </td>
          <td>
            <input
              disabled={row.isDisabled}
              value={row.surname}
              onChange={e => this.props.onChangeRowInReducer(e, row.id, 'surname')}
            />
          </td>
          <td>
            <input
              disabled={row.isDisabled}
              value={row.age}
              onChange={e => this.props.onChangeRowInReducer(e, row.id, 'age')}
            />
          </td>
          <td>{this.renderButtons(row.id)}</td>
        </tr>
      );
    });
  };

  renderButtons = id => {
    return (
      <div>
        <input type="button" value="delete" onClick={this.props.onDeleteRow.bind(this, id)} />
        <input type="button" value="save" onClick={this.props.onToggleRow.bind(this, id, true)} />
        <input type="button" value="edit" onClick={this.props.onToggleRow.bind(this, id, false)} />
      </div>
    );
  };

  render() {
    console.log(this);
    let { tableData } = this.props;
    return (
      <div className="App">
        <input type="button" value="add row" onClick={this.props.onAddRow} />
        <input type="button" value="delete all rows" onClick={this.props.onDeleteALLRows} />
        <input type="button" value="save" onClick={this.props.onToggleAll.bind(this, true)} />
        <input type="button" value="update" onClick={this.props.onToggleAll.bind(this, false)} />

        <table
          id="Table"
          className="App-Table"
          border="1"
          cellSpacing="0"
          cellPadding="15"
          width="600"
        >
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Surname</td>
              <td>Age</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  state => ({
    tableData: state.tableReducer,
    loginData: state.loginReducer,
  }),
  dispatch => ({
    onChangeRowInReducer: bindActionCreators(tableActions.changeRow, dispatch),
    onAddRow: bindActionCreators(tableActions.addRow, dispatch),
    onDeleteALLRows: bindActionCreators(tableActions.deleteAllRows, dispatch),
    onDeleteRow: bindActionCreators(tableActions.deleteRow, dispatch),
    onToggleAll: bindActionCreators(tableActions.toggleAll, dispatch),
    onToggleRow: bindActionCreators(tableActions.toggleRow, dispatch),
  }),
)(HomePage);
