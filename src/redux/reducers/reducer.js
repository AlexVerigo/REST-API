let initialState = {
  rows: [],
};

const getNewRow = () => {
  return {
    id: Math.random() * (1000 - 10) + 10,
    isDisabled: false,
    name: '',
    surname: '',
    age: '',
    action: '',
  };
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

const handleToggleAll = (rows, isDisabled) => {
  const toggleRows = rows.map(row => {
    return { ...row, isDisabled };
  });

  return toggleRows;
};

const handleDeleteRow = (rows, id) => {
  const updatedRows = rows.filter(row => id !== row.id);
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
  console.log('TRIGGERING STORE DISPATCH', action);
  switch (action.type) {
    case 'CHANGE_ROW':
      return {
        ...state,
        rows: handleChangeRow(state.rows, action.payload),
      };
    case 'ADD_TRACK':
      return {
        ...state,
        rows: state.rows.concat(getNewRow()),
      };
    case 'DELETE_ALL_ROWS':
      return {
        ...state,
        rows: [],
      };
    case 'TOGGLE_ALL_ROWS':
      return {
        ...state,
        rows: handleToggleAll(state.rows, action.payload),
      };
    case 'DELETE_ROW':
      return {
        ...state,
        rows: handleDeleteRow(state.rows, action.payload),
      };
    case 'TOGGLE_ROW':
      return {
        ...state,
        rows: handleToggleRow(state.rows, action.payload),
      };
    default:
      return state;
  }
};
