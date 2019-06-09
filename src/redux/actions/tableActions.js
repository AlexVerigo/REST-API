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

export const deleteAllRows = () => ({
  type: 'DELETE_ALL_ROWS',
});

export const deleteRow = id => ({
  type: 'DELETE_ROW',
  payload: id,
});

export const toggleAll = isDisabled => ({
  type: 'TOGGLE_ALL_ROWS',
  payload: isDisabled,
});

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
