let initialState = {
  rows: [],
};

const handleChangeRow = (rows, payload) => {
  const updatedRows = rows.map(row => {
    if (row.id === payload.fieldId) {
      return { ...row, [payload.fieldName]: payload.value };
    }

    return { ...row };
  });

  return updatedRows;
};

const handleToggleRow = (rows, payload) => {
  const toggleRows = rows.map(row => {
    if (row.id === payload.id) {
      return { ...row, isDisabled: payload.isDisabled };
    }

    return row;
  });

  return toggleRows;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ROWS_SUCCESS':
      return {
        ...state,
        rows: action.payload,
      };

    case 'ADD_TRACK':
      return {
        ...state,
        rows: action.payload,
      };
    case 'DELETE_ALL_ROWS':
      return {
        ...state,
        rows: action.payload,
      };
    case 'DELETE_ROW':
      return {
        ...state,
        rows: action.payload,
      };
    case 'TOGGLE_ALL_ROWS':
      return {
        ...state,
        rows: action.payload,
      };
    case 'GET_ROWS_SEARCH':
      return {
        ...state,
        rows: action.payload,
      };
    case 'CHANGE_ROW':
      return {
        ...state,
        rows: handleChangeRow(state.rows, action.payload),
      };
    case 'GET_ROWS_SEARCH':
      return {
        ...state,
        rows: action.payload,
      };
    default:
      return state;
  }
};
