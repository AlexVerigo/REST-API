import React from 'react';
import { debounce } from 'lodash-es';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tableActions from '../../redux/actions/tableActions';
class HomePage extends React.Component {

  renderRows =  () => {
    return this.props.tableData.rows.map(row => {
      return (
        <tr key={row.id}>
          <td>
            <div>{row.id}</div>
          </td>
          <td>
            <input
              className="form-control"
              style={{ width: '180px' }}
              disabled={row.isDisabled}
              value={row.Name}
              onChange={e => this.props.onChangeRowInReducer(e, row.id, 'Name')}
            />
          </td>
          <td>
            <input
              className="form-control"
              style={{ width: '180px' }}
              disabled={row.isDisabled}
              value={row.Surname}
              onChange={e => this.props.onChangeRowInReducer(e, row.id, 'Surname')}
            />
          </td>
          <td>
            <input
              className="form-control"
              style={{ width: '100px' }}
              disabled={row.isDisabled}
              value={row.Age}
              onChange={e => this.props.onChangeRowInReducer(e, row.id, 'Age')}
            />
          </td>
          <td>{this.renderButtons(row.id)}</td>
        </tr>
      );
    });
  };

  saveNotes = debounce(personalNotes => {
    this.props.onSearch(personalNotes);
  }, 700);

  onSeacrhdata = event => {
    const searchString = event.target.value;
    console.log(this.props)
    this.saveNotes(searchString)
  };

  renderButtons = id => {
    return (
      <div>
        <button
          className="btn btn-danger btn-xs button"
          onClick={this.props.onDeleteRow.bind(this, id)}
        >
          delete
        </button>
      </div>
    );
  };

  componentDidMount() {
    console.log(this.props);
    this.props.getData();
  }

  render() {
    return (
      <div className="App">
        <input
          type="button"
          value="add row"
          className="btn btn-success"
          onClick={this.props.onAddRow}
        />
        <input
          type="button"
          value="delete all rows"
          className="btn btn-danger"
          onClick={this.props.onDeleteALLRows}
        />
        <input
          type="button"
          value="save"
          className="btn btn-info"
          onClick={this.props.onToggleAll.bind(this, true)}
        />
        <input
          onChange={e => this.onSeacrhdata(e)}
        />

        <table id="Table" className="App-Table table table-bordered">
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
    getData: bindActionCreators(tableActions.getData, dispatch),
    onSearch: bindActionCreators(tableActions.searchData, dispatch),
  }),
)(HomePage);
