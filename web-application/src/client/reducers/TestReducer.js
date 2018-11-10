const defaultState = 0;

const testReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'TEST_ACTION':
      return 1;
    default:
      return state;
  }
};

export default testReducer;
