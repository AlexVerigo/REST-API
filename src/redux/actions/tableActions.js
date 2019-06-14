import store from '../store';

export const getData = () => async dispatch => {
  return fetch('http://localhost:3001/rows', {
    method: 'GET',
  })
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: 'GET_ROWS_SUCCESS',
        payload: res,
      });
    })
    .catch(res => {
      console.error(res);
    });
};

export const addRow = () => async dispatch => {
  return fetch('http://localhost:3001/addrow', {
    method: 'POST',
  })
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: 'ADD_TRACK',
        payload: res,
      });
    })
    .catch(res => {
      console.error(res);
    });
};

export const deleteAllRows = () => async dispatch => {
  return fetch('http://localhost:3001/deleterows', {
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: 'DELETE_ALL_ROWS',
        payload: res,
      });
    })
    .catch(res => {
      console.error(res);
    });
};

export const deleteRow = id => async dispatch => {
  const data = { id };
  return fetch('http://localhost:3001/deleterow/id', {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: 'DELETE_ROW',
        payload: res,
      });
    })
    .catch(res => {
      console.error(res);
    });
};
export const toggleAll = () => async dispatch => {
  // console.clear();
  const data = store.getState().tableReducer.rows;
  console.log('data: ', data);
  return fetch('http://localhost:3001/saverow', {
    method: 'PUT',
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: 'GET_ROWS_SUCCESS',
        payload: res,
      });
    })
    .catch(res => {
      console.error(res);
    });
};

export const toggleRow = (id, isDisabled) => ({
  type: 'TOGGLE_ROW',
  payload: {
    id,
    isDisabled,
  },
});

export const changeRow = (event, fieldId, fieldName) => ({
  type: 'CHANGE_ROW',
  payload: {
    value: event.target.value,
    fieldId,
    fieldName,
  },
});
